"use client";

import { MapPin, Navigation, ShieldCheck } from "lucide-react";
import type { Trip } from "@/types";

export function SafetyMap({ trip }: { trip: Trip }) {
  return (
    <section className="safe-card subtle-grid relative min-h-[320px] overflow-hidden rounded-lg p-5">
      <div className="absolute inset-x-10 top-1/2 h-2 -translate-y-1/2 rounded-full bg-blue-100 dark:bg-blue-950" />
      <div className="absolute left-[18%] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-teal-500 ring-4 ring-white dark:ring-slate-900" />
      <div className="absolute left-[46%] top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-blue-600 text-white shadow-lg">
        <Navigation className="h-5 w-5" />
      </div>
      <div className="absolute right-[14%] top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-blue-700 ring-1 ring-blue-200 dark:bg-slate-900 dark:text-blue-100">
        <MapPin className="h-5 w-5" />
      </div>
      <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-300">Live route simulation</p>
            <h2 className="mt-1 text-xl font-semibold">{trip.destination}</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-teal-700 ring-1 ring-teal-100 dark:bg-slate-950 dark:text-teal-100">
            <ShieldCheck className="h-4 w-4" />
            Corridor score 86
          </span>
        </div>
        <div className="rounded-lg bg-white/88 p-4 backdrop-blur dark:bg-slate-950/88">
          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>Route progress</span>
            <span>{trip.progress}%</span>
          </div>
          <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-3 rounded-full bg-blue-600" style={{ width: `${trip.progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
