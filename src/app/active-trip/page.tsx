"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Battery, Clock, ShieldAlert, TimerReset } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { CheckInModal } from "@/components/CheckInModal";
import { MetricCard } from "@/components/MetricCard";
import { PageHeader } from "@/components/PageHeader";
import { SafetyMap } from "@/components/SafetyMap";
import { StateBadge } from "@/components/StateBadge";
import { TripTimeline } from "@/components/TripTimeline";
import { useApp } from "@/context/AppContext";
import { useTripEngine } from "@/hooks/useTripEngine";
import { buildCheckInReminder } from "@/services/notificationService";
import { stateCopy } from "@/utils/riskEngine";

export default function ActiveTripPage() {
  const { activeTrip, updateTripState, addNotification } = useApp();
  const engine = useTripEngine(activeTrip);
  const [checkInOpen, setCheckInOpen] = useState(false);

  useEffect(() => {
    if (engine.risk) updateTripState(engine.risk.state, engine.risk.score);
  }, [engine.risk, updateTripState]);

  if (!activeTrip) {
    return (
      <AppShell>
        <PageHeader eyebrow="No active trip" title="Start monitoring when you begin a commute" description="SafeRoute will generate ETA, check-in cadence, and an escalation chain." action={<Button href="/start-trip">Start trip</Button>} />
      </AppShell>
    );
  }

  function handleSafe() {
    engine.acknowledgeCheckIn();
    addNotification(buildCheckInReminder(engine.interval));
    setCheckInOpen(false);
  }

  function handleMiss() {
    engine.missCheckIn();
    setCheckInOpen(false);
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Active monitoring" title={activeTrip.destination} description="Live operational view for route progress, check-ins, risk signals, and emergency actions." action={<StateBadge state={activeTrip.currentState} />} />
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard icon={Clock} label="ETA" value={`${activeTrip.eta} min`} helper={stateCopy[activeTrip.currentState]} />
        <MetricCard icon={TimerReset} label="Next check-in" value={`${engine.interval} min`} helper="Adaptive cadence" />
        <MetricCard icon={ShieldAlert} label="Risk score" value={`${engine.risk?.score ?? activeTrip.riskScore}/100`} helper={engine.risk?.reasons[0] ?? "normal route"} />
        <MetricCard icon={Battery} label="Battery" value={`${activeTrip.batteryLevel}%`} helper="Low battery escalation armed" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <SafetyMap trip={activeTrip} />
        <section className="safe-card rounded-lg p-5">
          <h2 className="text-xl font-semibold">Route timeline</h2>
          <div className="mt-4">
            <TripTimeline points={activeTrip.routeData} />
          </div>
        </section>
      </div>

      <section className="mt-6 grid gap-3 md:grid-cols-3">
        <Button icon={TimerReset} onClick={() => setCheckInOpen(true)}>Open check-in</Button>
        <Button icon={AlertTriangle} variant="secondary" onClick={engine.triggerSilentDistress}>Silent distress hold</Button>
        <Button href="/recovery" variant="secondary">Confirm recovered</Button>
      </section>
      <CheckInModal open={checkInOpen} interval={engine.interval} onSafe={handleSafe} onMiss={handleMiss} onClose={() => setCheckInOpen(false)} />
    </AppShell>
  );
}
