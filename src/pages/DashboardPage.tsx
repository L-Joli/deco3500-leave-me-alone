import { useState } from "react";

import { ConnectionBadge } from "../components/ConnectionBadge";
import { RouteCard } from "../components/RouteCard";
import { StateInspector } from "../components/StateInspector";
import { getEmotion } from "../config/emotions";
import { getNeed, NEEDS } from "../config/needs";
import { useFeelio } from "../hooks/useFeelio";
import type { PartnerId } from "../types/domain";

const screens = [
  ["Overview", "overview"],
  ["Head button", "head"],
  ["Face display", "face"],
  ["Left hand", "left"],
  ["Right hand", "right"],
  ["Belly display", "belly"],
] as const;

function PartnerSummary({ partnerId }: { partnerId: PartnerId }) {
  const { state } = useFeelio();
  if (!state) return null;
  const partner = state.partners[partnerId];
  const emotion = getEmotion(partner.confirmedEmotion ?? "neutral");
  const latest = partner.latestSentUpdate;

  return (
    <article className="partner-summary">
      <span>Partner {partnerId.toUpperCase()}</span>
      <strong>{emotion.label}</strong>
      <p>
        {partner.selectionMode === "need"
          ? `Choosing: ${NEEDS[partner.draftNeedIndex].label}`
          : latest
            ? `Last sent: ${getNeed(latest.needId).label}`
            : "No update sent yet"}
      </p>
    </article>
  );
}

function RouteGroup({ partnerId }: { partnerId: PartnerId }) {
  return (
    <section className="route-group">
      <div className="route-group__heading">
        <span className="eyebrow">Robot screens</span>
        <h2>Partner {partnerId.toUpperCase()}</h2>
      </div>
      <div className="route-grid">
        {screens.map(([label, screen]) => (
          <RouteCard
            key={screen}
            label={label}
            path={`/${partnerId}/${screen}`}
          />
        ))}
      </div>
    </section>
  );
}

export function DashboardPage() {
  const { state, connectionStatus, resetDemo } = useFeelio();
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);
  if (!state) return null;

  const handleReset = async () => {
    const result = await resetDemo();
    setResetFeedback(result.ok ? "Demo reset ✓" : result.error);
    window.setTimeout(() => setResetFeedback(null), 1_600);
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-hero">
        <div>
          <a className="brand-lockup" href="/">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
            </span>
            <span>Feelio</span>
          </a>
          <span className="eyebrow">Tradeshow control centre</span>
          <h1>Set up every Feelio screen.</h1>
          <p>
            Open a route or scan its QR code from a device on the same Wi-Fi
            network.
          </p>
        </div>
        <ConnectionBadge status={connectionStatus} />
      </header>

      <section className="dashboard-status" aria-label="Current prototype state">
        <PartnerSummary partnerId="a" />
        <PartnerSummary partnerId="b" />
        <article className="match-summary">
          <span>Mutual status</span>
          <strong>
            {state.matchingStatus === "ready-together"
              ? "Ready together ❤️"
              : state.matchingStatus === "talk-later"
                ? "Talk later ❤️"
                : "No match yet"}
          </strong>
        </article>
        <div className="reset-control">
          <button type="button" className="button button--reset" onClick={handleReset}>
            Reset demo
          </button>
          <span aria-live="polite">{resetFeedback}</span>
        </div>
      </section>

      {window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ? (
        <aside className="network-note">
          <strong>Setting up phones?</strong> Open this dashboard using the
          laptop's LAN address so its QR codes work on other devices.
        </aside>
      ) : null}

      <RouteGroup partnerId="a" />
      <RouteGroup partnerId="b" />
      <StateInspector state={state} />
    </main>
  );
}
