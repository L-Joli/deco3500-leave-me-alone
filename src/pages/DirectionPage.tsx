import { DirectionButton } from "../components/DirectionButton";
import type { PartnerId, SelectionDirection } from "../types/domain";

interface DirectionPageProps {
  partnerId: PartnerId;
  direction: SelectionDirection;
}

export function DirectionPage({ partnerId, direction }: DirectionPageProps) {
  return <DirectionButton partnerId={partnerId} direction={direction} />;
}
