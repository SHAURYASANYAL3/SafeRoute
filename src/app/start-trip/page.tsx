"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bike, Bus, Car, Footprints, MapPinned } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { ContactCard } from "@/components/ContactCard";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";
import { estimateEtaMinutes, safeCorridors } from "@/services/mapboxService";
import type { CommuteMode } from "@/types";
import { activeTrip } from "@/utils/mockData";

const modes: { label: CommuteMode; icon: typeof Footprints }[] = [
  { label: "Walk", icon: Footprints },
  { label: "Bike", icon: Bike },
  { label: "Rideshare", icon: Car },
  { label: "Transit", icon: Bus },
];

export default function StartTripPage() {
  const router = useRouter();
  const { user, setActiveTrip } = useApp();
  const [mode, setMode] = useState<CommuteMode>("Walk");
  const [destination, setDestination] = useState("North Campus Residence Hall");
  const eta = estimateEtaMinutes(1.4, mode);

  function startTrip() {
    setActiveTrip({ ...activeTrip, destination, commuteMode: mode, eta, startedAt: new Date().toISOString() });
    router.push("/active-trip");
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Trip creation" title="Start a monitored commute" description="Choose destination, contact chain, and travel mode. SafeRoute turns those inputs into an operational monitoring plan." />
      <div className="grid gap-5 lg:grid-cols-[1fr_0.78fr]">
        <section className="safe-card rounded-lg p-5">
          <label className="block">
            <span className="text-sm font-semibold">Destination</span>
            <input className="mt-2 min-h-14 w-full rounded-lg border border-blue-100 bg-white px-4 text-lg dark:border-white/10 dark:bg-slate-900" value={destination} onChange={(event) => setDestination(event.target.value)} />
          </label>
          <div className="mt-5">
            <p className="text-sm font-semibold">Commute mode</p>
            <div className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4">
              {modes.map((item) => {
                const Icon = item.icon;
                return (
                  <button className={`min-h-24 rounded-lg border p-3 text-left transition ${mode === item.label ? "border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-100" : "border-blue-100 bg-white dark:border-white/10 dark:bg-slate-900"}`} key={item.label} onClick={() => setMode(item.label)}>
                    <Icon className="h-6 w-6" />
                    <span className="mt-3 block font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-5 rounded-lg bg-blue-50 p-4 dark:bg-blue-950">
            <p className="font-semibold">Generated ETA: {eta} minutes</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Suggested corridor: {safeCorridors[0]} · check-in baseline adapts after trip start.</p>
          </div>
          <Button className="mt-5 w-full" icon={MapPinned} onClick={startTrip}>Start safety monitoring</Button>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Trusted contact chain</h2>
          {user.trustedContacts.map((contact) => <ContactCard contact={contact} key={contact.id} />)}
        </section>
      </div>
    </AppShell>
  );
}
