import { FaceDisplay } from "../components/FaceDisplay";
import type { PartnerId } from "../types/domain";

export function FacePage({ partnerId }: { partnerId: PartnerId }) {
  return <FaceDisplay partnerId={partnerId} />;
}
