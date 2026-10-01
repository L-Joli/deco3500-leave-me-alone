import { getEmotion } from "../config/emotions";
import type { EmotionId } from "../types/domain";

interface EmotionFaceProps {
  emotionId: EmotionId;
  surface?: "dark" | "light";
  size?: "small" | "medium" | "large";
}

function FaceFeatures({ emotionId }: { emotionId: EmotionId }) {
  switch (emotionId) {
    case "happy":
      return (
        <>
          <path d="M25 45 Q34 35 43 45" />
          <path d="M57 45 Q66 35 75 45" />
          <path d="M29 61 L71 61 Q68 82 50 84 Q32 82 29 61Z" />
        </>
      );
    case "calm":
      return (
        <>
          <path d="M24 43 Q34 49 44 43" />
          <path d="M56 43 Q66 49 76 43" />
          <path d="M36 65 Q50 73 64 65" />
        </>
      );
    case "tired":
      return (
        <>
          <path d="M24 43 Q34 52 44 43" />
          <path d="M56 43 Q66 52 76 43" />
          <path d="M24 46 L20 50" className="face-detail" />
          <path d="M76 46 L80 50" className="face-detail" />
          <ellipse cx="50" cy="67" rx="7" ry="4" />
          <path d="M80 24 H88 L80 32 H88" className="face-detail" />
          <path d="M86 14 H92 L86 20 H92" className="face-detail" />
          <path d="M91 6 H96 L91 11 H96" className="face-detail" />
        </>
      );
    case "stressed":
      return (
        <>
          <circle cx="34" cy="45" r="6" />
          <circle cx="66" cy="45" r="6" />
          <path d="M25 32 L42 29" className="face-detail" />
          <path d="M58 29 L75 32" className="face-detail" />
          <path d="M30 68 Q36 61 43 68 T56 68 T70 68" />
        </>
      );
    case "sad":
      return (
        <>
          <path d="M25 40 Q34 34 43 41" className="face-detail" />
          <path d="M57 41 Q66 34 75 40" className="face-detail" />
          <ellipse cx="34" cy="47" rx="4.5" ry="6" />
          <ellipse cx="66" cy="47" rx="4.5" ry="6" />
          <path d="M31 72 Q50 53 69 72" />
        </>
      );
    case "frustrated":
      return (
        <>
          <path d="M24 35 L43 42" className="face-detail" />
          <path d="M57 42 L76 35" className="face-detail" />
          <path d="M27 48 L40 48" />
          <path d="M60 48 L73 48" />
          <path d="M31 68 Q38 63 44 68 T57 68 T69 68" />
        </>
      );
    case "angry":
      return (
        <>
          <path d="M23 34 L44 43" className="face-detail" />
          <path d="M56 43 L77 34" className="face-detail" />
          <ellipse cx="35" cy="48" rx="4" ry="5" />
          <ellipse cx="65" cy="48" rx="4" ry="5" />
          <path d="M31 73 Q50 55 69 73" />
        </>
      );
    case "anxious":
      return (
        <>
          <ellipse cx="34" cy="45" rx="6" ry="8" />
          <ellipse cx="66" cy="45" rx="6" ry="8" />
          <path d="M28 31 Q34 27 41 31" className="face-detail" />
          <path d="M59 31 Q66 27 72 31" className="face-detail" />
          <path d="M33 68 Q39 61 45 68 T57 68 T67 68" />
          <path d="M80 42 Q86 49 80 55 Q74 49 80 42Z" className="face-accent" />
        </>
      );
    case "neutral":
    default:
      return (
        <>
          <rect x="28" y="39" width="12" height="15" rx="6" />
          <rect x="60" y="39" width="12" height="15" rx="6" />
          <path d="M36 66 Q50 73 64 66" />
        </>
      );
  }
}

export function EmotionFace({
  emotionId,
  surface = "dark",
  size = "large",
}: EmotionFaceProps) {
  const emotion = getEmotion(emotionId);
  return (
    <svg
      className={`emotion-face emotion-face--${surface} emotion-face--${size}`}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${emotion.label} expression`}
    >
      <title>{emotion.label}</title>
      <g className="face-strokes">
        <FaceFeatures emotionId={emotionId} />
      </g>
    </svg>
  );
}
