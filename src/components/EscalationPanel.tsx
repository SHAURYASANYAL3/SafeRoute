import { PhoneCall, Radio, Video } from "lucide-react";
import type { Escalation } from "@/types";
import { Button } from "@/components/Button";

export function EscalationPanel({ escalation, onResolve }: { escalation: Escalation; onResolve?: () => void }) {
  return (
    <section className="safe-card rounded-lg p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Escalation workflow</p>
          <h2 className="mt-1 text-2xl font-semibold">{escalation.level}</h2>
        </div>
        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700 ring-1 ring-red-100 dark:bg-red-950 dark:text-red-100">
          {escalation.resolved ? "Resolved" : "Active"}
        </span>
      </div>
      <p className="mt-4 text-slate-600 dark:text-slate-300">{escalation.summary}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {escalation.recipients.map((recipient) => (
          <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800" key={recipient}>
            <p className="font-semibold">{recipient}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">Location link queued</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <Button icon={PhoneCall} variant="secondary">Call</Button>
        <Button icon={Radio} variant="secondary">Audio hold</Button>
        <Button icon={Video} variant="secondary">Video hold</Button>
      </div>
      {onResolve ? (
        <div className="mt-4">
          <Button onClick={onResolve}>Resolve and notify contacts</Button>
        </div>
      ) : null}
    </section>
  );
}
