import { Check, Circle } from "lucide-react";
import type { RoutePoint } from "@/types";

export function TripTimeline({ points }: { points: RoutePoint[] }) {
  return (
    <ol className="space-y-3">
      {points.map((point) => (
        <li className="flex gap-3" key={point.label}>
          <span className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full ${point.status === "complete" ? "bg-teal-600 text-white" : point.status === "current" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400 dark:bg-slate-800"}`}>
            {point.status === "complete" ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3 fill-current" />}
          </span>
          <div>
            <p className="font-medium">{point.label}</p>
            <p className="text-sm text-slate-500 dark:text-slate-300">{point.status === "current" ? "Current segment" : `${Math.abs(point.etaOffset)} min ${point.etaOffset < 0 ? "ago" : "away"}`}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
