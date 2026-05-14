import type { RiskInput, SafetyState } from "@/types";

export function getAdaptiveInterval(input: Pick<RiskInput, "hour" | "missedCheckIns" | "tripDurationMinutes">) {
  const isNight = input.hour >= 21 || input.hour < 6;
  const base = isNight ? 5 : 15;
  const durationAdjustment = input.tripDurationMinutes > 35 ? -3 : 0;
  const missedAdjustment = input.missedCheckIns > 0 ? -2 * input.missedCheckIns : 0;

  return Math.max(2, base + durationAdjustment + missedAdjustment);
}

export function evaluateRisk(input: RiskInput): { score: number; state: SafetyState; reasons: string[] } {
  const reasons: string[] = [];
  let score = 8;

  if (input.hour >= 21 || input.hour < 6) {
    score += 18;
    reasons.push("late-night commute window");
  }

  if (input.tripDurationMinutes > 30) {
    score += 10;
    reasons.push("extended route duration");
  }

  if (input.inactivityMinutes >= 8) {
    score += 18;
    reasons.push("movement inactivity detected");
  }

  if (input.missedCheckIns > 0) {
    score += input.missedCheckIns * 22;
    reasons.push(`${input.missedCheckIns} missed check-in${input.missedCheckIns > 1 ? "s" : ""}`);
  }

  if (input.batteryLevel < 18) {
    score += 12;
    reasons.push("low battery reserve");
  }

  if (input.networkStatus !== "online") {
    score += input.networkStatus === "offline" ? 16 : 8;
    reasons.push(`${input.networkStatus} connectivity`);
  }

  if (input.silentDistress) {
    score = 100;
    reasons.push("silent distress trigger");
  }

  const boundedScore = Math.min(score, 100);
  let state: SafetyState = "SAFE";

  if (boundedScore >= 85 || input.silentDistress) state = "ESCALATED";
  else if (boundedScore >= 62) state = "HIGH_RISK";
  else if (boundedScore >= 34) state = "WARNING";

  return { score: boundedScore, state, reasons };
}

export function getNextEscalationLevel(missedCheckIns: number, silentDistress: boolean) {
  if (silentDistress || missedCheckIns >= 3) return "Campus Security";
  if (missedCheckIns === 2) return "Parent";
  return "Friend";
}

export const stateCopy: Record<SafetyState, string> = {
  SAFE: "Monitoring normally",
  WARNING: "Closer check-ins active",
  HIGH_RISK: "Escalation timer armed",
  ESCALATED: "Contacts notified",
  RECOVERED: "Trip safely recovered",
};
