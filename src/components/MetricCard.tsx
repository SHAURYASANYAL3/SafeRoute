import type { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: LucideIcon }) {
  return (
    <section className="safe-card rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-300">{label}</p>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-100">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="text-2xl font-semibold tracking-normal">{value}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{helper}</p>
    </section>
  );
}
