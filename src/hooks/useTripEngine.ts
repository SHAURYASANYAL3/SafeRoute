"use client";

import { useMemo, useState } from "react";
import type { Trip } from "@/types";
import { evaluateRisk, getAdaptiveInterval, getNextEscalationLevel } from "@/utils/riskEngine";

export function useTripEngine(trip: Trip | null) {
  const [missedCheckIns, setMissedCheckIns] = useState(0);
  const [silentDistress, setSilentDistress] = useState(false);
  const hour = new Date().getHours();

  const risk = useMemo(() => {
    if (!trip) return null;
    return evaluateRisk({
      hour,
      missedCheckIns,
      inactivityMinutes: trip.progress < 48 ? 4 : 9,
      tripDurationMinutes: trip.eta,
      batteryLevel: trip.batteryLevel,
      silentDistress,
      networkStatus: trip.networkStatus,
    });
  }, [hour, missedCheckIns, silentDistress, trip]);

  const interval = useMemo(
    () => getAdaptiveInterval({ hour, missedCheckIns, tripDurationMinutes: trip?.eta ?? 15 }),
    [hour, missedCheckIns, trip?.eta],
  );

  return {
    interval,
    risk,
    missedCheckIns,
    silentDistress,
    escalationLevel: getNextEscalationLevel(missedCheckIns, silentDistress),
    acknowledgeCheckIn: () => setMissedCheckIns(0),
    missCheckIn: () => setMissedCheckIns((count) => count + 1),
    triggerSilentDistress: () => setSilentDistress(true),
    clearDistress: () => setSilentDistress(false),
  };
}
