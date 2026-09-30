import { useContext } from "react";

import {
  FeelioContext,
  type FeelioContextValue,
} from "../context/FeelioProvider";

export function useFeelio(): FeelioContextValue {
  const context = useContext(FeelioContext);
  if (!context) {
    throw new Error("useFeelio must be used inside FeelioProvider");
  }
  return context;
}
