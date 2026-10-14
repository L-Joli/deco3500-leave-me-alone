import { useEffect, useRef, useState } from "react";

import { EmotionFace } from "./EmotionFace";
import { ReplyOptions } from "./ReplyOptions";
import { StatusCard } from "./StatusCard";
import { getEmotion } from "../config/emotions";
import { getNeed } from "../config/needs";
import { getReply } from "../config/replies";
import { useFeelio } from "../hooks/useFeelio";
import type { PartnerId } from "../types/domain";

interface BellyDisplayProps {
  partnerId: PartnerId;
  variant?: "physical" | "preview";
}

const otherPartner: Record<PartnerId, PartnerId> = { a: "b", b: "a" };
const SENT_CONFIRMATION_MS = 3_000;

export function BellyDisplay({
  partnerId,
  variant = "physical",
}: BellyDisplayProps) {
  const { state, viewBelly } = useFeelio();
  const partner = state?.partners[partnerId];
  const other = state?.partners[otherPartner[partnerId]];
  const hasNewUpdate = partner?.hasNewIncomingUpdate ?? false;
  const incomingId = other?.latestSentUpdate?.id ?? null;
  const [isReplyPage, setIsReplyPage] = useState(false);
  const ownReply =
    incomingId && partner?.latestConfirmedReply?.updateId === incomingId
      ? partner.latestConfirmedReply
      : null;
  const ownReplyTimestamp = ownReply?.timestamp ?? null;
  const [showSentConfirmation, setShowSentConfirmation] = useState(false);
  const bellyCard = useRef<HTMLDivElement | null>(null);
  const emotionPageScrollTop = useRef(0);

  useEffect(() => {
    if (!hasNewUpdate || document.visibilityState !== "visible") return;
    const timer = window.setTimeout(() => void viewBelly(partnerId), 1_350);
    return () => window.clearTimeout(timer);
  }, [hasNewUpdate, partnerId, viewBelly]);

  useEffect(() => {
    if (ownReplyTimestamp !== null) setIsReplyPage(false);
    const remainingMs =
      ownReplyTimestamp !== null
        ? ownReplyTimestamp + SENT_CONFIRMATION_MS - Date.now()
        : 0;
    setShowSentConfirmation(remainingMs > 0);
    if (remainingMs <= 0) return;
    const timer = window.setTimeout(
      () => setShowSentConfirmation(false),
      remainingMs,
    );
    return () => window.clearTimeout(timer);
  }, [incomingId, ownReplyTimestamp]);

  useEffect(() => setIsReplyPage(false), [incomingId]);

  if (!state || !partner || !other) return null;

  const incoming = other.latestSentUpdate;
  const responseToOwnUpdate =
    partner.latestSentUpdate &&
    other.latestConfirmedReply?.updateId === partner.latestSentUpdate.id
      ? other.latestConfirmedReply
      : null;
  const hasResponseNotification = Boolean(
    ownReply ||
      (responseToOwnUpdate &&
        (!incoming || responseToOwnUpdate.timestamp >= incoming.timestamp)),
  );

  const clearNewIndicator = () => {
    if (partner.hasNewIncomingUpdate) void viewBelly(partnerId);
  };

  const handleReplyConfirmed = () => {
    setIsReplyPage(false);
    window.requestAnimationFrame(() => {
      if (bellyCard.current) bellyCard.current.scrollTop = 0;
    });
  };

  const openReplyPage = () => {
    emotionPageScrollTop.current = bellyCard.current?.scrollTop ?? 0;
    setIsReplyPage(true);
    window.requestAnimationFrame(() => {
      if (bellyCard.current) bellyCard.current.scrollTop = 0;
    });
  };

  const closeReplyPage = () => {
    setIsReplyPage(false);
    window.requestAnimationFrame(() => {
      if (bellyCard.current) {
        bellyCard.current.scrollTop = emotionPageScrollTop.current;
      }
    });
  };

  return (
    <section
      className={`belly-display belly-display--${variant} ${hasResponseNotification ? "belly-display--response" : ""}`}
      onPointerDown={clearNewIndicator}
      onContextMenu={(event) => event.preventDefault()}
    >
      <div className="belly-card-shell">
        <div
          ref={bellyCard}
          className={`belly-card ${partner.hasNewIncomingUpdate ? "belly-card--new" : ""}`}
        >
          {isReplyPage && incoming ? (
            <ReplyOptions
              key={incoming.id}
              partnerId={partnerId}
              update={incoming}
              onBack={closeReplyPage}
              onConfirmed={handleReplyConfirmed}
            />
          ) : (
            <>
              {!incoming ? (
                <div className="belly-empty">
                  <span
                    className="belly-empty__mark"
                    role="img"
                    aria-label="No partner update"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 21s-7.2-4.4-9.7-8.7C.2 8.7 2 4.5 6.1 4.1c2.4-.2 4.3 1.1 5.9 3 1.6-1.9 3.5-3.2 5.9-3 4.1.4 5.9 4.6 3.8 8.2C19.2 16.6 12 21 12 21Z" />
                    </svg>
                  </span>
                </div>
              ) : null}

              {incoming ? (
                <div className="belly-update">
                  <div className="belly-update__emotion">
                    {getEmotion(incoming.emotionId).label}
                  </div>
                  <EmotionFace
                    emotionId={incoming.emotionId}
                    surface="light"
                    size="small"
                  />
                  <blockquote>“{getNeed(incoming.needId).label}”</blockquote>
                  {ownReply ? (
                    <div className="belly-own-reply">
                      <div className="belly-reply-bubble">
                        <span>Your reply</span>
                        <p>“{getReply(ownReply.replyId).label}”</p>
                      </div>
                      <span className="reply-sent" role="status">
                        {showSentConfirmation ? "Sent ✓" : null}
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="button button--primary reply-open"
                      onClick={openReplyPage}
                    >
                      Reply
                    </button>
                  )}
                </div>
              ) : null}

              {state.matchingStatus ? (
                <StatusCard status={state.matchingStatus} />
              ) : null}

              {responseToOwnUpdate && partner.latestSentUpdate ? (
                <section
                  className="response-history"
                  aria-label="Your shared update and partner reply"
                >
                  <hr className="response-divider" />
                  <ol className="response-summary" aria-label="Chat history">
                    <li className="belly-reply-bubble response-summary__item response-summary__item--own">
                      <span>You shared</span>
                      <p>“{getNeed(partner.latestSentUpdate.needId).label}”</p>
                    </li>
                    <li className="belly-reply-bubble response-summary__item response-summary__item--partner">
                      <span>Partner’s reply</span>
                      <p>“{getReply(responseToOwnUpdate.replyId).label}”</p>
                    </li>
                  </ol>
                </section>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
