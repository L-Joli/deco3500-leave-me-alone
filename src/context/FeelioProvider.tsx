import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { socket } from "../socket";
import type {
  ActionAck,
  PartnerId,
  ReplyId,
  SharedState,
} from "../types/domain";

export type ConnectionStatus = "connecting" | "connected" | "disconnected";

export interface FeelioContextValue {
  state: SharedState | null;
  connectionStatus: ConnectionStatus;
  lastActionMessage: string | null;
  previous: (partnerId: PartnerId) => Promise<ActionAck>;
  next: (partnerId: PartnerId) => Promise<ActionAck>;
  confirm: (partnerId: PartnerId) => Promise<ActionAck>;
  viewBelly: (partnerId: PartnerId) => Promise<ActionAck>;
  selectReply: (
    partnerId: PartnerId,
    replyId: ReplyId,
    updateId: string,
  ) => Promise<ActionAck>;
  confirmReply: (partnerId: PartnerId, updateId: string) => Promise<ActionAck>;
  resetDemo: () => Promise<ActionAck>;
}

export const FeelioContext = createContext<FeelioContextValue | null>(null);

function actionPromise(
  emit: (acknowledge: (result: ActionAck) => void) => void,
): Promise<ActionAck> {
  return new Promise((resolve) => {
    let settled = false;
    const timeout = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve({ ok: false, error: "The connection timed out" });
      }
    }, 5_000);

    emit((result) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve(result);
    });
  });
}

export function FeelioProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SharedState | null>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const requestState = () => {
      setConnectionStatus("connected");
      socket.emit("state:get", (result) => {
        if (result.ok) setState(result.state);
      });
    };
    const handleDisconnect = () => setConnectionStatus("disconnected");
    const handleConnectError = () => setConnectionStatus("disconnected");
    const handleState = (nextState: SharedState) => setState(nextState);

    socket.on("connect", requestState);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.on("state:update", handleState);
    setConnectionStatus(socket.connected ? "connected" : "connecting");
    socket.connect();

    if (socket.connected) requestState();

    return () => {
      socket.off("connect", requestState);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.off("state:update", handleState);
      socket.disconnect();
    };
  }, []);

  const runAction = useCallback(
    async (
      emit: (acknowledge: (result: ActionAck) => void) => void,
    ): Promise<ActionAck> => {
      if (!socket.connected) {
        const result: ActionAck = { ok: false, error: "Feelio is offline" };
        setLastActionMessage(result.error);
        return result;
      }
      const result = await actionPromise(emit);
      setLastActionMessage(result.ok ? null : result.error);
      return result;
    },
    [],
  );

  const value = useMemo<FeelioContextValue>(
    () => ({
      state,
      connectionStatus,
      lastActionMessage,
      previous: (partnerId) =>
        runAction((acknowledge) =>
          socket.emit("control:previous", { partnerId }, acknowledge),
        ),
      next: (partnerId) =>
        runAction((acknowledge) =>
          socket.emit("control:next", { partnerId }, acknowledge),
        ),
      confirm: (partnerId) =>
        runAction((acknowledge) =>
          socket.emit("control:confirm", { partnerId }, acknowledge),
        ),
      viewBelly: (partnerId) =>
        runAction((acknowledge) =>
          socket.emit("belly:view", { partnerId }, acknowledge),
        ),
      selectReply: (partnerId, replyId, updateId) =>
        runAction((acknowledge) =>
          socket.emit(
            "reply:select",
            { partnerId, replyId, updateId },
            acknowledge,
          ),
        ),
      confirmReply: (partnerId, updateId) =>
        runAction((acknowledge) =>
          socket.emit(
            "reply:confirm",
            { partnerId, updateId },
            acknowledge,
          ),
        ),
      resetDemo: () =>
        runAction((acknowledge) => socket.emit("demo:reset", acknowledge)),
    }),
    [connectionStatus, lastActionMessage, runAction, state],
  );

  return (
    <FeelioContext.Provider value={value}>{children}</FeelioContext.Provider>
  );
}
