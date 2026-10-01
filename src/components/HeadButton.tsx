import { useState } from "react";

import { useFeelio } from "../hooks/useFeelio";
import type { PartnerId } from "../types/domain";

interface HeadButtonProps {
  partnerId: PartnerId;
  compact?: boolean;
}

export function HeadButton({ partnerId, compact = false }: HeadButtonProps) {
  const { confirm } = useFeelio();
  const [feedback, setFeedback] = useState<string | null>(null);

  const handlePress = async () => {
    const result = await confirm(partnerId);
    setFeedback(result.ok ? "Confirmed ✓" : result.error);
    window.setTimeout(() => setFeedback(null), 1_250);
  };

  return (
    <button
      type="button"
      className={`head-button ${compact ? "control--compact" : "control--physical"}`}
      onClick={handlePress}
      aria-label="Confirm selection"
    >
      <span className="head-button__disc" aria-hidden="true">
        <span />
      </span>
      <span className="control-feedback" aria-live="polite">
        {feedback ?? "\u00A0"}
      </span>
    </button>
  );
}
