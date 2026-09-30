import type { NeedId } from "../types/domain";

export interface NeedDefinition {
  id: NeedId;
  label: string;
}

export const NEEDS: readonly NeedDefinition[] = [
  { id: "talk-now", label: "I'd like to talk" },
  { id: "space", label: "A little space, please" },
  { id: "talk-later", label: "Can we talk later?" },
  { id: "just-sharing", label: "Just sharing ❤️" },
];

export function getNeed(id: NeedId): NeedDefinition {
  return NEEDS.find((need) => need.id === id) ?? NEEDS[0];
}
