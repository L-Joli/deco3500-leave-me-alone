import { randomUUID } from "node:crypto";

import { EMOTIONS } from "../src/config/emotions";
import { NEEDS } from "../src/config/needs";
import { getAllowedReplies, getMatchingStatus } from "../src/config/replies";
import type {
  PartnerId,
  PartnerState,
  ReplyId,
  SelectableEmotionId,
  SharedState,
} from "../src/types/domain";

export type ActionResult =
  | { ok: true; state: SharedState }
  | { ok: false; error: string };

const otherPartner: Record<PartnerId, PartnerId> = { a: "b", b: "a" };

function createPartnerState(): PartnerState {
  return {
    confirmedEmotion: null,
    draftEmotionIndex: 0,
    draftNeedIndex: 0,
    selectionMode: "emotion",
    isBrowsingEmotion: false,
    latestSentUpdate: null,
    selectedReply: null,
    latestConfirmedReply: null,
    hasNewIncomingUpdate: false,
  };
}

export function createInitialState(): SharedState {
  return {
    partners: {
      a: createPartnerState(),
      b: createPartnerState(),
    },
    matchingStatus: null,
    revision: 0,
  };
}

let state = createInitialState();

function snapshot(): SharedState {
  return structuredClone(state);
}

function success(): ActionResult {
  state.revision += 1;
  return { ok: true, state: snapshot() };
}

function failure(error: string): ActionResult {
  return { ok: false, error };
}

function wrapIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

export function getState(): SharedState {
  return snapshot();
}

export function cancelEmotionBrowsing(
  partnerId: PartnerId,
): SharedState | null {
  const partner = state.partners[partnerId];
  if (partner.selectionMode !== "emotion" || !partner.isBrowsingEmotion) {
    return null;
  }

  partner.isBrowsingEmotion = false;
  state.revision += 1;
  return snapshot();
}

export function resetState(): SharedState {
  const nextRevision = state.revision + 1;
  state = createInitialState();
  state.revision = nextRevision;
  return snapshot();
}

export function moveSelection(
  partnerId: PartnerId,
  direction: "previous" | "next",
): ActionResult {
  const partner = state.partners[partnerId];
  const delta = direction === "next" ? 1 : -1;

  if (partner.selectionMode === "need") {
    partner.draftNeedIndex = wrapIndex(
      partner.draftNeedIndex + delta,
      NEEDS.length,
    );
    return success();
  }

  if (!partner.isBrowsingEmotion) {
    const confirmedIndex = partner.confirmedEmotion
      ? EMOTIONS.findIndex((emotion) => emotion.id === partner.confirmedEmotion)
      : -1;
    partner.draftEmotionIndex =
      confirmedIndex >= 0
        ? wrapIndex(confirmedIndex + delta, EMOTIONS.length)
        : direction === "next"
          ? 0
          : EMOTIONS.length - 1;
    partner.isBrowsingEmotion = true;
    return success();
  }

  partner.draftEmotionIndex = wrapIndex(
    partner.draftEmotionIndex + delta,
    EMOTIONS.length,
  );
  return success();
}

export function confirmSelection(partnerId: PartnerId): ActionResult {
  const partner = state.partners[partnerId];

  if (partner.selectionMode === "emotion") {
    if (!partner.isBrowsingEmotion) {
      return failure("Choose an emotion first");
    }

    partner.confirmedEmotion = EMOTIONS[
      partner.draftEmotionIndex
    ].id as SelectableEmotionId;
    partner.selectionMode = "need";
    partner.draftNeedIndex = 0;
    partner.isBrowsingEmotion = false;
    return success();
  }

  if (!partner.confirmedEmotion) {
    return failure("Choose an emotion first");
  }

  const need = NEEDS[partner.draftNeedIndex];
  const update = {
    id: randomUUID(),
    emotionId: partner.confirmedEmotion,
    needId: need.id,
    timestamp: Date.now(),
  };
  const receiver = state.partners[otherPartner[partnerId]];

  partner.latestSentUpdate = update;
  partner.selectionMode = "emotion";
  partner.isBrowsingEmotion = false;
  receiver.selectedReply = null;
  receiver.latestConfirmedReply = null;
  receiver.hasNewIncomingUpdate = true;
  state.matchingStatus = null;

  return success();
}

export function viewBelly(partnerId: PartnerId): ActionResult {
  const partner = state.partners[partnerId];
  if (!partner.hasNewIncomingUpdate) {
    return { ok: true, state: snapshot() };
  }
  partner.hasNewIncomingUpdate = false;
  return success();
}

export function selectReply(
  partnerId: PartnerId,
  replyId: ReplyId,
  updateId: string,
): ActionResult {
  const incoming = state.partners[otherPartner[partnerId]].latestSentUpdate;
  if (!incoming || incoming.id !== updateId) {
    return failure("That partner update is no longer current");
  }

  const allowed = getAllowedReplies(incoming.needId).some(
    (reply) => reply.id === replyId,
  );
  if (!allowed) {
    return failure("That response is not available for this update");
  }

  state.partners[partnerId].selectedReply = { updateId, replyId };
  return success();
}

export function confirmReply(
  partnerId: PartnerId,
  updateId: string,
): ActionResult {
  const partner = state.partners[partnerId];
  const incoming = state.partners[otherPartner[partnerId]].latestSentUpdate;
  const selection = partner.selectedReply;

  if (!incoming || incoming.id !== updateId) {
    return failure("That partner update is no longer current");
  }
  if (!selection || selection.updateId !== updateId) {
    return failure("Choose a response first");
  }

  const allowed = getAllowedReplies(incoming.needId).some(
    (reply) => reply.id === selection.replyId,
  );
  if (!allowed) {
    return failure("That response is not available for this update");
  }

  partner.latestConfirmedReply = {
    ...selection,
    timestamp: Date.now(),
  };
  state.matchingStatus = getMatchingStatus(incoming.needId, selection.replyId);
  return success();
}
