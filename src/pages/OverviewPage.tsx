import { BellyDisplay } from "../components/BellyDisplay";
import { ConnectionBadge } from "../components/ConnectionBadge";
import { DirectionButton } from "../components/DirectionButton";
import { FaceDisplay } from "../components/FaceDisplay";
import { HeadButton } from "../components/HeadButton";
import { StateInspector } from "../components/StateInspector";
import { useFeelio } from "../hooks/useFeelio";
import type { PartnerId } from "../types/domain";

export function OverviewPage({ partnerId }: { partnerId: PartnerId }) {
  const { state, connectionStatus } = useFeelio();
  if (!state) return null;

  return (
    <main className="overview-page">
      <header className="overview-header">
        <a className="brand-lockup" href="/" aria-label="Feelio setup dashboard">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>Feelio</span>
        </a>
        <div className="overview-header__title">
          <span className="eyebrow">Complete robot</span>
          <h1>Partner {partnerId.toUpperCase()}</h1>
        </div>
        <ConnectionBadge status={connectionStatus} />
      </header>

      <div className="overview-layout">
        <section className="overview-panel overview-panel--face">
          <div className="panel-heading">
            <span>01</span>
            <h2>My face</h2>
            <a href={`/${partnerId}/face`}>Open screen ↗</a>
          </div>
          <div className="overview-face-frame">
            <FaceDisplay partnerId={partnerId} variant="preview" />
          </div>
        </section>

        <section className="overview-controls" aria-label="Robot controls">
          <DirectionButton
            partnerId={partnerId}
            direction="previous"
            compact
          />
          <HeadButton partnerId={partnerId} compact />
          <DirectionButton partnerId={partnerId} direction="next" compact />
        </section>

        <section className="overview-panel overview-panel--belly">
          <div className="panel-heading">
            <span>02</span>
            <h2>Partner belly</h2>
            <a href={`/${partnerId}/belly`}>Open screen ↗</a>
          </div>
          <div className="overview-belly-frame">
            <BellyDisplay partnerId={partnerId} variant="preview" />
          </div>
        </section>
      </div>

      <StateInspector state={state} partnerId={partnerId} />
    </main>
  );
}
