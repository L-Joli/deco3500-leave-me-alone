import type { ConnectionStatus } from "../context/FeelioProvider";

const labels: Record<ConnectionStatus, string> = {
  connected: "Live",
  connecting: "Connecting",
  disconnected: "Reconnecting",
};

export function ConnectionBadge({ status }: { status: ConnectionStatus }) {
  return (
    <span className={`connection-badge connection-badge--${status}`}>
      <span aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
