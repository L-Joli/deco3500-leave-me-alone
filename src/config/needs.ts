import type { NeedId, SelectableEmotionId } from "../types/domain";

export interface NeedDefinition {
  id: NeedId;
  label: string;
}

export const STATUS_BROWSE_TIMEOUT_MS = 7_000;

export const NEEDS: readonly NeedDefinition[] = [
  { id: "talk-now", label: "I'd like to talk" },
  { id: "space", label: "A little space, please" },
  { id: "talk-later", label: "Can we talk later?" },
  { id: "just-sharing", label: "Just sharing ❤️" },
];

const positiveNeeds = [NEEDS[0], NEEDS[3]] as const;
const broaderNeeds = NEEDS;

export const NEEDS_BY_EMOTION: Record<
  SelectableEmotionId,
  readonly NeedDefinition[]
> = {
  happy: positiveNeeds,
  excited: positiveNeeds,
  calm: positiveNeeds,
  tired: broaderNeeds,
  sad: broaderNeeds,
  stressed: broaderNeeds,
  overwhelmed: broaderNeeds,
  angry: broaderNeeds,
};

export function getAvailableNeeds(
  emotionId: SelectableEmotionId,
): readonly NeedDefinition[] {
  return NEEDS_BY_EMOTION[emotionId];
}

export function getNeed(id: NeedId): NeedDefinition {
  return NEEDS.find((need) => need.id === id) ?? NEEDS[0];
}
