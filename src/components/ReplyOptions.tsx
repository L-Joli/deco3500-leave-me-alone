import { useState } from "react";

import { getAllowedReplies, getReply } from "../config/replies";
import { useFeelio } from "../hooks/useFeelio";
import type { EmotionalUpdate, PartnerId } from "../types/domain";

interface ReplyOptionsProps {
  partnerId: PartnerId;
  update: EmotionalUpdate;
}

export function ReplyOptions({ partnerId, update }: ReplyOptionsProps) {
  const { state, selectReply, confirmReply } = useFeelio();
  const [isChoosing, setIsChoosing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  if (!state) return null;

  const partner = state.partners[partnerId];
  const selected =
    partner.selectedReply?.updateId === update.id
      ? partner.selectedReply
      : null;
  const confirmed =
    partner.latestConfirmedReply?.updateId === update.id
      ? partner.latestConfirmedReply
      : null;

  if (confirmed) {
    return (
      <div className="response-summary">
        <span>You</span>
        <p>“{getReply(confirmed.replyId).label}”</p>
      </div>
    );
  }

  if (selected && !isChoosing) {
    const reply = getReply(selected.replyId);
    return (
      <div className="reply-confirmation">
        <span className="belly-kicker">Your response</span>
        <p>“{reply.label}”</p>
        <div className="reply-confirmation__actions">
          <button
            type="button"
            className="button button--quiet"
            onClick={() => setIsChoosing(true)}
          >
            Change
          </button>
          <button
            type="button"
            className="button button--primary"
            onClick={async () => {
              const result = await confirmReply(partnerId, update.id);
              setFeedback(result.ok ? "Sent with care ✓" : result.error);
            }}
          >
            Confirm
          </button>
        </div>
        <span className="reply-feedback" aria-live="polite">
          {feedback}
        </span>
      </div>
    );
  }

  if (!isChoosing) {
    return (
      <button
        type="button"
        className="button button--primary reply-open"
        onClick={() => setIsChoosing(true)}
      >
        Reply
      </button>
    );
  }

  return (
    <div className="reply-options">
      <span className="belly-kicker">Choose a response</span>
      <div className="reply-options__list">
        {getAllowedReplies(update.needId).map((reply) => (
          <button
            type="button"
            className="reply-option"
            key={reply.id}
            onClick={async () => {
              const result = await selectReply(partnerId, reply.id, update.id);
              if (result.ok) {
                setIsChoosing(false);
                setFeedback(null);
              } else {
                setFeedback(result.error);
              }
            }}
          >
            {reply.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="button button--text"
        onClick={() => setIsChoosing(false)}
      >
        Cancel
      </button>
      <span className="reply-feedback" aria-live="polite">
        {feedback}
      </span>
    </div>
  );
}
