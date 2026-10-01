import type { Server, Socket } from "socket.io";

import type {
  ActionAck,
  ClientToServerEvents,
  PartnerId,
  ServerToClientEvents,
} from "../src/types/domain";
import { EMOTION_BROWSE_TIMEOUT_MS } from "../src/config/emotions";
import {
  cancelEmotionBrowsing,
  confirmReply,
  confirmSelection,
  getState,
  moveSelection,
  resetState,
  selectReply,
  viewBelly,
  type ActionResult,
} from "./state";

type FeelioServer = Server<ClientToServerEvents, ServerToClientEvents>;
type FeelioSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

const emotionBrowseTimers = new Map<PartnerId, ReturnType<typeof setTimeout>>();

function clearEmotionBrowseTimer(partnerId: PartnerId): void {
  const timer = emotionBrowseTimers.get(partnerId);
  if (timer) clearTimeout(timer);
  emotionBrowseTimers.delete(partnerId);
}

function scheduleEmotionBrowseTimeout(
  io: FeelioServer,
  partnerId: PartnerId,
): void {
  clearEmotionBrowseTimer(partnerId);
  const timer = setTimeout(() => {
    emotionBrowseTimers.delete(partnerId);
    const nextState = cancelEmotionBrowsing(partnerId);
    if (nextState) io.emit("state:update", nextState);
  }, EMOTION_BROWSE_TIMEOUT_MS);
  emotionBrowseTimers.set(partnerId, timer);
}

function isPartnerId(value: unknown): value is PartnerId {
  return value === "a" || value === "b";
}

function finishAction(
  io: FeelioServer,
  result: ActionResult,
  acknowledge: (result: ActionAck) => void,
) {
  if (!result.ok) {
    acknowledge({ ok: false, error: result.error });
    return;
  }
  acknowledge({ ok: true });
  io.emit("state:update", result.state);
}

export function registerSocketEvents(
  io: FeelioServer,
  socket: FeelioSocket,
): void {
  socket.on("state:get", (acknowledge) => {
    acknowledge({ ok: true, state: getState() });
  });

  socket.on("control:previous", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    const result = moveSelection(payload.partnerId, "previous");
    finishAction(io, result, acknowledge);
    if (
      result.ok &&
      result.state.partners[payload.partnerId].selectionMode === "emotion" &&
      result.state.partners[payload.partnerId].isBrowsingEmotion
    ) {
      scheduleEmotionBrowseTimeout(io, payload.partnerId);
    } else {
      clearEmotionBrowseTimer(payload.partnerId);
    }
  });

  socket.on("control:next", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    const result = moveSelection(payload.partnerId, "next");
    finishAction(io, result, acknowledge);
    if (
      result.ok &&
      result.state.partners[payload.partnerId].selectionMode === "emotion" &&
      result.state.partners[payload.partnerId].isBrowsingEmotion
    ) {
      scheduleEmotionBrowseTimeout(io, payload.partnerId);
    } else {
      clearEmotionBrowseTimer(payload.partnerId);
    }
  });

  socket.on("control:confirm", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    clearEmotionBrowseTimer(payload.partnerId);
    finishAction(io, confirmSelection(payload.partnerId), acknowledge);
  });

  socket.on("belly:view", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    finishAction(io, viewBelly(payload.partnerId), acknowledge);
  });

  socket.on("reply:select", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    finishAction(
      io,
      selectReply(payload.partnerId, payload.replyId, payload.updateId),
      acknowledge,
    );
  });

  socket.on("reply:confirm", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    finishAction(
      io,
      confirmReply(payload.partnerId, payload.updateId),
      acknowledge,
    );
  });

  socket.on("demo:reset", (acknowledge) => {
    clearEmotionBrowseTimer("a");
    clearEmotionBrowseTimer("b");
    const nextState = resetState();
    acknowledge({ ok: true });
    io.emit("state:update", nextState);
  });
}
