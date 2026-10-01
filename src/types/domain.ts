export type PartnerId = "a" | "b";
export type SelectionMode = "emotion" | "need";
export type SelectionDirection = "previous" | "next";

export type SelectableEmotionId =
  | "happy"
  | "excited"
  | "calm"
  | "tired"
  | "overwhelmed"
  | "stressed"
  | "sad"
  | "angry";

export type EmotionId = "neutral" | SelectableEmotionId;

export type NeedId =
  | "talk-now"
  | "space"
  | "talk-later"
  | "just-sharing";

export type ReplyId =
  | "here-when-ready"
  | "talk-later-together"
  | "no-rush"
  | "thinking-of-you"
  | "virtual-hug";

export type MatchingStatus = "ready-together" | "talk-later";

export interface EmotionalUpdate {
  id: string;
  emotionId: SelectableEmotionId;
  needId: NeedId;
  timestamp: number;
}

export interface ReplySelection {
  updateId: string;
  replyId: ReplyId;
}

export interface ConfirmedReply extends ReplySelection {
  timestamp: number;
}

export interface PartnerState {
  confirmedEmotion: SelectableEmotionId | null;
  draftEmotionIndex: number;
  draftNeedIndex: number;
  selectionMode: SelectionMode;
  isBrowsingEmotion: boolean;
  latestSentUpdate: EmotionalUpdate | null;
  selectedReply: ReplySelection | null;
  latestConfirmedReply: ConfirmedReply | null;
  hasNewIncomingUpdate: boolean;
}

export interface SharedState {
  partners: Record<PartnerId, PartnerState>;
  matchingStatus: MatchingStatus | null;
  revision: number;
}

export interface PartnerPayload {
  partnerId: PartnerId;
}

export interface ReplyPayload extends PartnerPayload {
  updateId: string;
  replyId: ReplyId;
}

export interface ConfirmReplyPayload extends PartnerPayload {
  updateId: string;
}

export type ActionAck =
  | { ok: true }
  | { ok: false; error: string };

export type StateAck =
  | { ok: true; state: SharedState }
  | { ok: false; error: string };

export interface ServerToClientEvents {
  "state:update": (state: SharedState) => void;
}

export interface ClientToServerEvents {
  "state:get": (acknowledge: (result: StateAck) => void) => void;
  "control:previous": (
    payload: PartnerPayload,
    acknowledge: (result: ActionAck) => void,
  ) => void;
  "control:next": (
    payload: PartnerPayload,
    acknowledge: (result: ActionAck) => void,
  ) => void;
  "control:confirm": (
    payload: PartnerPayload,
    acknowledge: (result: ActionAck) => void,
  ) => void;
  "belly:view": (
    payload: PartnerPayload,
    acknowledge: (result: ActionAck) => void,
  ) => void;
  "reply:select": (
    payload: ReplyPayload,
    acknowledge: (result: ActionAck) => void,
  ) => void;
  "reply:confirm": (
    payload: ConfirmReplyPayload,
    acknowledge: (result: ActionAck) => void,
  ) => void;
  "demo:reset": (acknowledge: (result: ActionAck) => void) => void;
}
