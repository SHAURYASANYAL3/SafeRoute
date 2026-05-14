"use client";

import { Activity, Battery, Clock, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { MetricCard } from "@/components/MetricCard";
import { PageHeader } from "@/components/PageHeader";
import { StateBadge } from "@/components/StateBadge";
import { useApp } from "@/context/AppContext";
import { escalations, recentTrips } from "@/utils/mockData";

export default function DashboardPage() {
  const { activeTrip, notifications } = useApp();

  return (
    <AppShell>
      <PageHeader eyebrow="Operations dashboard" title="Student commute safety at a glance" description="Monitor current trip state, recent escalations, and system health without noisy dashboards." action={<Button href="/start-trip">Start monitored trip</Button>} />
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard icon={Clock} label="Active ETA" value={`${activeTrip?.eta ?? 0} min`} helper="Adaptive route estimate" />
        <MetricCard icon={Activity} label="Risk score" value={`${activeTrip?.riskScore ?? 0}/100`} helper="State engine output" />
        <MetricCard icon={Battery} label="Battery" value={`${activeTrip?.batteryLevel ?? 0}%`} helper="Escalation aware" />
        <MetricCard icon={ShieldCheck} label="Escalations" value={`${escalations.length}`} helper="Resolved this month" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <section className="safe-card rounded-lg p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent trips</h2>
            <Button href="/active-trip" variant="secondary">View active</Button>
          </div>
          <div className="space-y-3">
            {recentTrips.map((trip) => (
              <article className="flex flex-col justify-between gap-3 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center dark:bg-slate-800" key={trip.tripId}>
                <div>
                  <p className="font-semibold">{trip.destination}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{trip.commuteMode} · risk score {trip.riskScore} · {trip.eta} min ETA</p>
                </div>
                <StateBadge state={trip.currentState} />
              </article>
            ))}
          </div>
        </section>

        <section className="safe-card rounded-lg p-5">
          <h2 className="text-xl font-semibold">Notification queue</h2>
          <div className="mt-4 space-y-3">
            {notifications.map((note) => (
              <article className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950" key={note.id}>
                <p className="font-semibold">{note.title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{note.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
