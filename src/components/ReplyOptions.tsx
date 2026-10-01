import { useState } from "react";

import { getAllowedReplies, getReply } from "../config/replies";
import { useFeelio } from "../hooks/useFeelio";
import type { EmotionalUpdate, PartnerId } from "../types/domain";

interface ReplyOptionsProps {
  partnerId: PartnerId;
  update: EmotionalUpdate;
  onBack: () => void;
  onConfirmed: () => void;
}

export function ReplyOptions({
  partnerId,
  update,
  onBack,
  onConfirmed,
}: ReplyOptionsProps) {
  const { state, selectReply, confirmReply } = useFeelio();
  const existingSelection =
    state?.partners[partnerId].selectedReply?.updateId === update.id;
  const [isChoosing, setIsChoosing] = useState(!existingSelection);
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

  if (confirmed) return null;

  return (
    <div className="reply-page">
      <button
        type="button"
        className="button button--text reply-page__back"
        onClick={onBack}
      >
        ← Back
      </button>

      {selected && !isChoosing ? (
        <div className="reply-confirmation">
          <span className="belly-kicker">Your response</span>
          <p>“{getReply(selected.replyId).label}”</p>
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
                if (result.ok) {
                  setFeedback(null);
                  onConfirmed();
                } else {
                  setFeedback(result.error);
                }
              }}
            >
              Confirm
            </button>
          </div>
          <span className="reply-feedback" aria-live="polite">
            {feedback}
          </span>
        </div>
      ) : (
        <div className="reply-options">
          <span className="belly-kicker">Choose a response</span>
          <div className="reply-options__list">
            {getAllowedReplies(update.needId).map((reply) => (
              <button
                type="button"
                className="reply-option"
                key={reply.id}
                onClick={async () => {
                  const result = await selectReply(
                    partnerId,
                    reply.id,
                    update.id,
                  );
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
          <span className="reply-feedback" aria-live="polite">
            {feedback}
          </span>
        </div>
      )}
    </div>
  );
}
