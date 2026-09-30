import type { ConnectionStatus } from "../context/FeelioProvider";

export function LoadingPage({ status }: { status: ConnectionStatus }) {
  return (
    <main className="system-page" aria-live="polite">
      <span className="loading-mark" aria-hidden="true" />
      <p>{status === "disconnected" ? "Reconnecting to Feelio…" : "Waking Feelio…"}</p>
    </main>
  );
}
