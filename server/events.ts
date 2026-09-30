import type { Server, Socket } from "socket.io";

import type {
  ActionAck,
  ClientToServerEvents,
  PartnerId,
  ServerToClientEvents,
} from "../src/types/domain";
import {
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
    finishAction(io, moveSelection(payload.partnerId, "previous"), acknowledge);
  });

  socket.on("control:next", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
    finishAction(io, moveSelection(payload.partnerId, "next"), acknowledge);
  });

  socket.on("control:confirm", (payload, acknowledge) => {
    if (!isPartnerId(payload?.partnerId)) {
      acknowledge({ ok: false, error: "Unknown partner" });
      return;
    }
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
    const nextState = resetState();
    acknowledge({ ok: true });
    io.emit("state:update", nextState);
  });
}
