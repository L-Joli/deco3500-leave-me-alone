import { useEffect } from "react";

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

export function BellyDisplay({
  partnerId,
  variant = "physical",
}: BellyDisplayProps) {
  const { state, viewBelly } = useFeelio();
  const partner = state?.partners[partnerId];
  const other = state?.partners[otherPartner[partnerId]];
  const hasNewUpdate = partner?.hasNewIncomingUpdate ?? false;

  useEffect(() => {
    if (!hasNewUpdate || document.visibilityState !== "visible") return;
    const timer = window.setTimeout(() => void viewBelly(partnerId), 1_350);
    return () => window.clearTimeout(timer);
  }, [hasNewUpdate, partnerId, viewBelly]);

  if (!state || !partner || !other) return null;

  const incoming = other.latestSentUpdate;
  const responseToOwnUpdate =
    partner.latestSentUpdate &&
    other.latestConfirmedReply?.updateId === partner.latestSentUpdate.id
      ? other.latestConfirmedReply
      : null;

  const clearNewIndicator = () => {
    if (partner.hasNewIncomingUpdate) void viewBelly(partnerId);
  };

  return (
    <section
      className={`belly-display belly-display--${variant}`}
      onPointerDown={clearNewIndicator}
    >
      <div
        className={`belly-card ${partner.hasNewIncomingUpdate ? "belly-card--new" : ""}`}
      >
        {!incoming && !responseToOwnUpdate ? (
          <div className="belly-empty">
            <span className="belly-empty__mark" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="belly-kicker">Partner update</span>
            <h1>All quiet for now</h1>
            <p>When your partner shares how they feel, it will appear here.</p>
          </div>
        ) : null}

        {incoming ? (
          <div className="belly-update">
            <span className="belly-kicker">Partner update</span>
            <EmotionFace
              emotionId={incoming.emotionId}
              surface="light"
              size="small"
            />
            <div className="belly-update__emotion">
              {getEmotion(incoming.emotionId).label}
            </div>
            <blockquote>“{getNeed(incoming.needId).label}”</blockquote>
            <ReplyOptions partnerId={partnerId} update={incoming} />
          </div>
        ) : null}

        {!incoming && responseToOwnUpdate ? (
          <div className="partner-response">
            <span className="belly-kicker">Partner response</span>
            <h1>“{getReply(responseToOwnUpdate.replyId).label}”</h1>
          </div>
        ) : null}

        {state.matchingStatus ? (
          <StatusCard status={state.matchingStatus} />
        ) : null}
      </div>
    </section>
  );
}
