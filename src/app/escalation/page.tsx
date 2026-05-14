"use client";

import { AppShell } from "@/components/AppShell";
import { EscalationPanel } from "@/components/EscalationPanel";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";
import { escalations as seedEscalations } from "@/utils/mockData";

export default function EscalationPage() {
  const { escalations } = useApp();
  const active = escalations[0] ?? seedEscalations[0];

  return (
    <AppShell>
      <PageHeader eyebrow="Escalation" title="Progressive response workflow" description="Contacts receive structured information, location context, timers, and recovery updates instead of panic-driven noise." />
      <EscalationPanel escalation={{ ...active, resolved: false }} />
      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {["Friend notified at 0:00", "Parent notified at 2:00", "Campus security at 4:00"].map((step) => (
          <div className="safe-card rounded-lg p-4" key={step}>
            <p className="font-semibold">{step}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Timer policy can be configured by university operations.</p>
          </div>
        ))}
      </section>
    </AppShell>
  );
}
