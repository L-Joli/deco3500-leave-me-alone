import type { EmotionId, SelectableEmotionId } from "../types/domain";

export interface EmotionDefinition {
  id: EmotionId;
  label: string;
  selectable: boolean;
}

export const EMOTION_BROWSE_TIMEOUT_MS = 5_000;

export const NEUTRAL_EMOTION: EmotionDefinition = {
  id: "neutral",
  label: "Neutral",
  selectable: false,
};

export const EMOTIONS: readonly EmotionDefinition[] = [
  { id: "happy", label: "Happy", selectable: true },
  { id: "calm", label: "Calm", selectable: true },
  { id: "tired", label: "Tired", selectable: true },
  { id: "stressed", label: "Stressed", selectable: true },
  { id: "sad", label: "Sad", selectable: true },
  { id: "frustrated", label: "Frustrated", selectable: true },
  { id: "angry", label: "Angry", selectable: true },
  { id: "anxious", label: "Anxious", selectable: true },
];

export function getEmotion(id: EmotionId): EmotionDefinition {
  if (id === "neutral") return NEUTRAL_EMOTION;
  return EMOTIONS.find((emotion) => emotion.id === id) ?? NEUTRAL_EMOTION;
}

export function isSelectableEmotion(id: string): id is SelectableEmotionId {
  return EMOTIONS.some((emotion) => emotion.id === id);
}
