import type { MatchingStatus, NeedId, ReplyId } from "../types/domain";

export interface ReplyDefinition {
  id: ReplyId;
  label: string;
}

const REPLIES: Record<ReplyId, ReplyDefinition> = {
  "here-when-ready": {
    id: "here-when-ready",
    label: "I'm here when you're ready",
  },
  "talk-later-together": {
    id: "talk-later-together",
    label: "We can talk later ❤️",
  },
  "no-rush": { id: "no-rush", label: "No rush" },
  "thinking-of-you": { id: "thinking-of-you", label: "Thinking of you" },
  "virtual-hug": { id: "virtual-hug", label: "Virtual hug" },
};

export const REPLIES_BY_NEED: Record<NeedId, readonly ReplyDefinition[]> = {
  "talk-now": [
    REPLIES["here-when-ready"],
    REPLIES["no-rush"],
    REPLIES["thinking-of-you"],
    REPLIES["virtual-hug"],
  ],
  "talk-later": [
    REPLIES["talk-later-together"],
    REPLIES["no-rush"],
    REPLIES["thinking-of-you"],
    REPLIES["virtual-hug"],
  ],
  space: [
    REPLIES["no-rush"],
    REPLIES["thinking-of-you"],
    REPLIES["virtual-hug"],
  ],
  "just-sharing": [REPLIES["thinking-of-you"], REPLIES["virtual-hug"]],
};

export function getAllowedReplies(needId: NeedId): readonly ReplyDefinition[] {
  return REPLIES_BY_NEED[needId];
}

export function getReply(replyId: ReplyId): ReplyDefinition {
  return REPLIES[replyId];
}

export function getMatchingStatus(
  needId: NeedId,
  replyId: ReplyId,
): MatchingStatus | null {
  if (needId === "talk-now" && replyId === "here-when-ready") {
    return "ready-together";
  }
  if (needId === "talk-later" && replyId === "talk-later-together") {
    return "talk-later";
  }
  return null;
}
