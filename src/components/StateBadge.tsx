import type { SafetyState } from "@/types";

const styles: Record<SafetyState, string> = {
  SAFE: "bg-teal-50 text-teal-700 ring-teal-200 dark:bg-teal-950 dark:text-teal-100",
  WARNING: "bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-950 dark:text-amber-100",
  HIGH_RISK: "bg-orange-50 text-orange-800 ring-orange-200 dark:bg-orange-950 dark:text-orange-100",
  ESCALATED: "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950 dark:text-red-100",
  RECOVERED: "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-950 dark:text-blue-100",
};

export function StateBadge({ state }: { state: SafetyState }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${styles[state]}`}>{state.replace("_", " ")}</span>;
}
