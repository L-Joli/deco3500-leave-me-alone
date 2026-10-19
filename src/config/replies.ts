import type { MatchingStatus, NeedId, ReplyId } from "../types/domain";

export interface ReplyDefinition {
  id: ReplyId;
  label: string;
}

const REPLIES: Record<ReplyId, ReplyDefinition> = {
  "of-course": { id: "of-course", label: "Of course ❤️" },
  "give-me-a-moment": { id: "give-me-a-moment", label: "Give me a moment ❤️" },
  "take-your-time": { id: "take-your-time", label: "Take your time" },
  "sounds-good": { id: "sounds-good", label: "Sounds good ❤️" },
  "here-when-ready": {
    id: "here-when-ready",
    label: "I'm here when you're ready",
  },
  "talk-later-together": {
    id: "talk-later-together",
    label: "Talk later ❤️",
  },
  "no-rush": { id: "no-rush", label: "No rush ❤️" },
  "thinking-of-you": { id: "thinking-of-you", label: "Thinking of you ❤️" },
  "virtual-hug": { id: "virtual-hug", label: "Virtual hug 🫂" },
  "pretty-good": { id: "pretty-good", label: "Pretty good ❤️" },
  "long-day": { id: "long-day", label: "It's been a long day 🥺" },
  "tell-you-later": { id: "tell-you-later", label: "Tell you later 🫶" },
  "im-okay": { id: "im-okay", label: "I'm okay ❤️" },
  "not-great": { id: "not-great", label: "Not feeling great 🥺" },
};

const chatReplies = [
  REPLIES["of-course"],
  REPLIES["give-me-a-moment"],
];

export const REPLIES_BY_NEED: Record<NeedId, readonly ReplyDefinition[]> = {
  "talk-now": chatReplies,
  "talk-now-positive": chatReplies,
  "talk-later": [
    REPLIES["sounds-good"],
    REPLIES["talk-later-together"],
  ],
  space: [
    REPLIES["no-rush"],
    REPLIES["take-your-time"],
    REPLIES["here-when-ready"],
  ],
  "just-sharing": [REPLIES["thinking-of-you"], REPLIES["virtual-hug"]],
  "day-check-in": [
    REPLIES["pretty-good"],
    REPLIES["long-day"],
    REPLIES["tell-you-later"],
  ],
  "just-checking-in": [REPLIES["im-okay"], REPLIES["not-great"]],
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
  if (
    (needId === "talk-now" || needId === "talk-now-positive") &&
    replyId === "of-course"
  ) {
    return "ready-together";
  }
  if (
    needId === "talk-later" &&
    (replyId === "sounds-good" || replyId === "talk-later-together")
  ) {
    return "talk-later";
  }
  return null;
}
