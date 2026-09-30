import { BellyDisplay } from "../components/BellyDisplay";
import type { PartnerId } from "../types/domain";

export function BellyPage({ partnerId }: { partnerId: PartnerId }) {
  return <BellyDisplay partnerId={partnerId} />;
}
