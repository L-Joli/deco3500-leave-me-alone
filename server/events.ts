import type { Server, Socket } from "socket.io";

import type {
  ActionAck,
  ClientToServerEvents,
  PartnerId,
  ServerToClientEvents,
} from "../src/types/domain";
import { EMOTION_BROWSE_TIMEOUT_MS } from "../src/config/emotions";
import { STATUS_BROWSE_TIMEOUT_MS } from "../src/config/needs";
import {
  cancelSelectionBrowsing,
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

const selectionBrowseTimers = new Map<
  PartnerId,
  ReturnType<typeof setTimeout>
>();

function clearSelectionBrowseTimer(partnerId: PartnerId): void {
  const timer = selectionBrowseTimers.get(partnerId);
  if (timer) clearTimeout(timer);
  selectionBrowseTimers.delete(partnerId);
}

function scheduleSelectionBrowseTimeout(
  io: FeelioServer,
  partnerId: PartnerId,
  timeoutMs: number,
): void {
  clearSelectionBrowseTimer(partnerId);
  const timer = setTimeout(() => {
    selectionBrowseTimers.delete(partnerId);
    const nextState = cancelSelectionBrowsing(partnerId);
    if (nextState) io.emit("state:update", nextState);
  }, timeoutMs);
  selectionBrowseTimers.set(partnerId, timer);
}

// Retained for later use; selection handlers leave the calls disabled for now.
function syncSelectionBrowseTimer(
  io: FeelioServer,
  partnerId: PartnerId,
  result: ActionResult,
): void {
  if (!result.ok) {
    clearSelectionBrowseTimer(partnerId);
    return;
  }

  const partner = result.state.partners[partnerId];
  if (partner.selectionMode === "need") {
    scheduleSelectionBrowseTimeout(io, partnerId, STATUS_BROWSE_TIMEOUT_MS);
  } else if (partner.isBrowsingEmotion) {
    scheduleSelectionBrowseTimeout(io, partnerId, EMOTION_BROWSE_TIMEOUT_MS);
  } else {
    clearSelectionBrowseTimer(partnerId);
  }
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
    // syncSelectionBrowseTimer(io, payload.partnerId, result);
  });

  socket.on("control:next", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    const result = moveSelection(payload.partnerId, "next");
    finishAction(io, result, acknowledge);
    // syncSelectionBrowseTimer(io, payload.partnerId, result);
  });

  socket.on("control:confirm", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    const result = confirmSelection(payload.partnerId);
    finishAction(io, result, acknowledge);
    // syncSelectionBrowseTimer(io, payload.partnerId, result);
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
    clearSelectionBrowseTimer("a");
    clearSelectionBrowseTimer("b");
    const nextState = resetState();
    acknowledge({ ok: true });
    io.emit("state:update", nextState);
  });
}
