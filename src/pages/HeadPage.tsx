import { HeadButton } from "../components/HeadButton";
import type { PartnerId } from "../types/domain";

export function HeadPage({ partnerId }: { partnerId: PartnerId }) {
  return <HeadButton partnerId={partnerId} />;
}
