import { useState } from "react";

import { useFeelio } from "../hooks/useFeelio";
import type { PartnerId, SelectionDirection } from "../types/domain";

interface DirectionButtonProps {
  partnerId: PartnerId;
  direction: SelectionDirection;
  compact?: boolean;
}

export function DirectionButton({
  partnerId,
  direction,
  compact = false,
}: DirectionButtonProps) {
  const { previous, next } = useFeelio();
  const [feedback, setFeedback] = useState<string | null>(null);
  const isPrevious = direction === "previous";

  const handlePress = async () => {
    const result = await (isPrevious ? previous(partnerId) : next(partnerId));
    setFeedback(result.ok ? "Pressed" : result.error);
    window.setTimeout(() => setFeedback(null), 700);
  };

  return (
    <button
      type="button"
      className={`direction-button ${compact ? "control--compact" : "control--physical"}`}
      onClick={handlePress}
      aria-label={isPrevious ? "Previous option" : "Next option"}
    >
      <span className="direction-button__arrow" aria-hidden="true">
        {isPrevious ? "←" : "→"}
      </span>
      <span className="control-feedback" aria-live="polite">
        {feedback ?? "\u00A0"}
      </span>
    </button>
  );
}
