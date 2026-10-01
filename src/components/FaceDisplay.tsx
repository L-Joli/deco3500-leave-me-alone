import { EmotionFace } from "./EmotionFace";
import { EMOTIONS, NEUTRAL_EMOTION } from "../config/emotions";
import { getAvailableNeeds } from "../config/needs";
import { useFeelio } from "../hooks/useFeelio";
import type { EmotionId, PartnerId } from "../types/domain";

interface FaceDisplayProps {
  partnerId: PartnerId;
  variant?: "physical" | "preview";
}

export function FaceDisplay({
  partnerId,
  variant = "physical",
}: FaceDisplayProps) {
  const { state } = useFeelio();
  if (!state) return null;

  const partner = state.partners[partnerId];
  const isPreview = variant === "preview";

  if (partner.selectionMode === "need") {
    if (!partner.confirmedEmotion) return null;
    const need = getAvailableNeeds(partner.confirmedEmotion)[
      partner.draftNeedIndex
    ];
    return (
      <section className={`face-display face-display--${variant}`}>
        <div className="need-selector" aria-live="polite">
          <span className="face-kicker">What would you like right now?</span>
          <p>{need.label}</p>
          <span className="selection-hint">Use the hands to browse</span>
        </div>
      </section>
    );
  }

  const draft = EMOTIONS[partner.draftEmotionIndex];
  const isConfirmed = !partner.isBrowsingEmotion;
  const emotionId: EmotionId = partner.isBrowsingEmotion
    ? draft.id
    : (partner.confirmedEmotion ?? NEUTRAL_EMOTION.id);

  return (
    <section
      className={`face-display face-display--${variant} ${isConfirmed ? "face-display--confirmed" : ""}`}
    >
      <div className="face-display__content" aria-live="polite">
        <EmotionFace
          emotionId={emotionId}
          surface={isConfirmed ? "light" : "dark"}
          size={isPreview ? "medium" : "large"}
        />
        {partner.isBrowsingEmotion ? (
          <div className="emotion-label" key={emotionId}>
            {draft.label}
          </div>
        ) : null}
      </div>
    </section>
  );
}
