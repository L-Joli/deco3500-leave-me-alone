import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

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
const LONG_PRESS_MS = 550;
const LONG_PRESS_MOVE_TOLERANCE = 12;

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
  const [isRevealingOwnReply, setIsRevealingOwnReply] = useState(false);
  const bellyCard = useRef<HTMLDivElement | null>(null);
  const emotionPageScrollTop = useRef(0);
  const longPressTimer = useRef<number | null>(null);
  const longPressOrigin = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!hasNewUpdate || document.visibilityState !== "visible") return;
    const timer = window.setTimeout(() => void viewBelly(partnerId), 1_350);
    return () => window.clearTimeout(timer);
  }, [hasNewUpdate, partnerId, viewBelly]);

  useEffect(
    () => () => {
      if (longPressTimer.current !== null) {
        window.clearTimeout(longPressTimer.current);
      }
    },
    [],
  );

  useEffect(() => setIsReplyPage(false), [incomingId]);

  if (!state || !partner || !other) return null;

  const incoming = other.latestSentUpdate;
  const responseToOwnUpdate =
    partner.latestSentUpdate &&
    other.latestConfirmedReply?.updateId === partner.latestSentUpdate.id
      ? other.latestConfirmedReply
      : null;
  const ownReplyToReveal =
    incoming && partner.latestConfirmedReply?.updateId === incoming.id
      ? partner.latestConfirmedReply
      : null;
  const hasResponseNotification = Boolean(
    ownReplyToReveal ||
      (responseToOwnUpdate &&
        (!incoming || responseToOwnUpdate.timestamp >= incoming.timestamp)),
  );

  const clearNewIndicator = () => {
    if (partner.hasNewIncomingUpdate) void viewBelly(partnerId);
  };

  const stopLongPress = () => {
    if (longPressTimer.current !== null) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    longPressOrigin.current = null;
    setIsRevealingOwnReply(false);
  };

  const startLongPress = (event: PointerEvent<HTMLElement>) => {
    clearNewIndicator();
    if (
      !ownReplyToReveal ||
      (event.target as HTMLElement).closest("button, a")
    ) {
      return;
    }
    stopLongPress();
    longPressOrigin.current = { x: event.clientX, y: event.clientY };
    longPressTimer.current = window.setTimeout(() => {
      longPressTimer.current = null;
      setIsRevealingOwnReply(true);
    }, LONG_PRESS_MS);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const origin = longPressOrigin.current;
    if (
      origin &&
      Math.hypot(event.clientX - origin.x, event.clientY - origin.y) >
        LONG_PRESS_MOVE_TOLERANCE
    ) {
      stopLongPress();
    }
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
      onPointerDown={startLongPress}
      onPointerMove={handlePointerMove}
      onPointerUp={stopLongPress}
      onPointerCancel={stopLongPress}
      onPointerLeave={stopLongPress}
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
                  {!ownReplyToReveal ? (
                    <button
                      type="button"
                      className="button button--primary reply-open"
                      onClick={openReplyPage}
                    >
                      Reply
                    </button>
                  ) : null}
                </div>
              ) : null}

              {state.matchingStatus ? (
                <StatusCard status={state.matchingStatus} />
              ) : null}

              {responseToOwnUpdate && partner.latestSentUpdate ? (
                <div className="response-summary">
                  <div className="response-summary__item">
                    <span>You shared</span>
                    <p>“{getNeed(partner.latestSentUpdate.needId).label}”</p>
                  </div>
                  <div className="response-summary__item">
                    <span>Partner’s reply</span>
                    <p>“{getReply(responseToOwnUpdate.replyId).label}”</p>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>

        {!isReplyPage && isRevealingOwnReply && ownReplyToReveal ? (
          <div className="belly-reply-reveal" role="status">
            <span>Your reply</span>
            <p>“{getReply(ownReplyToReveal.replyId).label}”</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
