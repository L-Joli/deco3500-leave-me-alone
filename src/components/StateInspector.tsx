import type { PartnerId, SharedState } from "../types/domain";

interface StateInspectorProps {
  state: SharedState;
  partnerId?: PartnerId;
}

export function StateInspector({ state, partnerId }: StateInspectorProps) {
  const displayState = partnerId
    ? {
        partner: partnerId,
        state: state.partners[partnerId],
        matchingStatus: state.matchingStatus,
        revision: state.revision,
      }
    : state;

  return (
    <details className="state-inspector">
      <summary>Prototype state</summary>
      <pre>{JSON.stringify(displayState, null, 2)}</pre>
    </details>
  );
}
