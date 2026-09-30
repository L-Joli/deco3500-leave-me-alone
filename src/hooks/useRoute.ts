import type { PartnerId } from "../types/domain";

export type PartnerScreen =
  | "head"
  | "face"
  | "left"
  | "right"
  | "belly"
  | "overview";

export type RouteMatch =
  | { kind: "dashboard" }
  | { kind: "partner"; partnerId: PartnerId; screen: PartnerScreen }
  | { kind: "not-found"; pathname: string };

const partnerScreens = new Set<PartnerScreen>([
  "head",
  "face",
  "left",
  "right",
  "belly",
  "overview",
]);

export function parseRoute(pathname: string): RouteMatch {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
  if (normalized === "/") return { kind: "dashboard" };

  const match = normalized.match(/^\/(a|b)\/([^/]+)$/);
  if (!match) return { kind: "not-found", pathname: normalized };

  const partnerId = match[1] as PartnerId;
  const screen = match[2] as PartnerScreen;
  if (!partnerScreens.has(screen)) {
    return { kind: "not-found", pathname: normalized };
  }

  return { kind: "partner", partnerId, screen };
}

export function useRoute(): RouteMatch {
  return parseRoute(window.location.pathname);
}
