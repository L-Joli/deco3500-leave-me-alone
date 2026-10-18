import type { NeedId, SelectableEmotionId } from "../types/domain";

export interface NeedDefinition {
  id: NeedId;
  label: string;
}

export const STATUS_BROWSE_TIMEOUT_MS = 7_000;

export const NEEDS: readonly NeedDefinition[] = [
  { id: "talk-now", label: "Can we chat for a bit? 🥺" },
  { id: "space", label: "I need a little me-time 🥹" },
  { id: "talk-later", label: "Let's catch up later 🫶" },
  { id: "just-sharing", label: "Just sharing ❤️" },
  { id: "talk-now-positive", label: "Can we chat for a bit? ❤️" },
];

const positiveNeeds = [NEEDS[4], NEEDS[3], NEEDS[2]] as const;
const broaderNeeds = [NEEDS[0], NEEDS[1], NEEDS[2], NEEDS[3]] as const;

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
  angry: [NEEDS[0], NEEDS[1]],
};

export function getAvailableNeeds(
  emotionId: SelectableEmotionId,
): readonly NeedDefinition[] {
  return NEEDS_BY_EMOTION[emotionId];
}

export function getNeed(id: NeedId): NeedDefinition {
  return NEEDS.find((need) => need.id === id) ?? NEEDS[0];
}
