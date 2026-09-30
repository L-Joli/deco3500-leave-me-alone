import type { MatchingStatus } from "../types/domain";

const statusLabels: Record<MatchingStatus, string> = {
  "ready-together": "Ready together ❤️",
  "talk-later": "Talk later ❤️",
};

export function StatusCard({ status }: { status: MatchingStatus }) {
  return (
    <aside className="status-card" aria-live="polite">
      <span className="status-card__spark" aria-hidden="true">
        ✦
      </span>
      <span>{statusLabels[status]}</span>
    </aside>
  );
}
