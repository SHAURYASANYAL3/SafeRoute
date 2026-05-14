"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, FileClock, Send } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";

export default function RecoveryPage() {
  const router = useRouter();
  const { activeTrip, setActiveTrip, addNotification } = useApp();

  function recover() {
    if (activeTrip) setActiveTrip({ ...activeTrip, currentState: "RECOVERED", progress: 100, completedAt: new Date().toISOString() });
    addNotification({ id: `note-${Date.now()}`, title: "Recovery confirmed", body: "Trusted contacts were notified and active alerts were stopped.", severity: "success", createdAt: new Date().toISOString() });
    router.push("/dashboard");
  }

  return (
    <AppShell>
      <PageHeader eyebrow="Recovery" title="Close the incident calmly" description="Recovery confirms safety, stops alerting, notifies contacts, and archives the trip for audit history." />
      <section className="safe-card rounded-lg p-5">
        <div className="grid gap-4 md:grid-cols-3">
          {[{ icon: CheckCircle2, title: "Safety confirmed" }, { icon: Send, title: "Contacts notified" }, { icon: FileClock, title: "Trip archived" }].map((item) => (
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950" key={item.title}>
              <item.icon className="h-7 w-7 text-blue-700 dark:text-blue-100" />
              <p className="mt-4 font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full" onClick={recover}>Confirm recovery</Button>
      </section>
    </AppShell>
  );
}
