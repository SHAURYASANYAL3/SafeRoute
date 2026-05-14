import type { CommuteMode } from "@/types";

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const modeSpeed: Record<CommuteMode, number> = {
  Walk: 4,
  Bike: 11,
  Rideshare: 21,
  Transit: 14,
};

export function estimateEtaMinutes(distanceKm: number, mode: CommuteMode) {
  return Math.max(4, Math.round((distanceKm / modeSpeed[mode]) * 60));
}

export function buildSafeCorridorScore(hour: number, distanceKm: number) {
  const nightPenalty = hour >= 21 || hour < 6 ? 18 : 0;
  const distancePenalty = distanceKm > 3 ? 8 : 0;
  return Math.max(42, 92 - nightPenalty - distancePenalty);
}

export const safeCorridors = [
  "Blue-light corridor",
  "Transit-visible path",
  "Residence patrol loop",
  "Well-lit academic spine",
];
