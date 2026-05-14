"use client";

import { motion } from "framer-motion";
import { ArrowRight, BellRing, GitBranch, MapPinned, ShieldCheck, Workflow } from "lucide-react";
import { Button } from "@/components/Button";
import { StateBadge } from "@/components/StateBadge";

const pillars = [
  { icon: Workflow, title: "State-driven orchestration", body: "Trips move through SAFE, WARNING, HIGH_RISK, ESCALATED, and RECOVERED states with predictable transitions." },
  { icon: BellRing, title: "Adaptive check-ins", body: "Intervals respond to time of day, route duration, inactivity, battery, and missed responses." },
  { icon: GitBranch, title: "Structured escalation", body: "Trusted contacts are notified progressively: friend, parent, campus security." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="subtle-grid min-h-[92vh] px-4 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <nav className="flex items-center justify-between rounded-lg bg-white/80 px-4 py-3 backdrop-blur dark:bg-slate-950/80">
            <div className="flex items-center gap-3 font-semibold">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white">
                <ShieldCheck className="h-5 w-5" />
              </span>
              SafeRoute
            </div>
            <Button href="/auth" variant="secondary">Sign in</Button>
          </nav>

          <div className="grid min-h-[72vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-200">HackRent 2026 · Systems Track</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 md:text-7xl dark:text-white">SafeRoute</h1>
              <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-650 dark:text-slate-300">
                A calm student safety orchestration system for late-night commutes, adaptive check-ins, trusted-contact escalation, and recovery workflows.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/dashboard" icon={ArrowRight}>Open dashboard</Button>
                <Button href="/start-trip" variant="secondary" icon={MapPinned}>Start a trip</Button>
              </div>
            </motion.div>

            <motion.div className="safe-card rounded-lg p-5" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.1 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-300">Active commute</p>
                  <h2 className="mt-1 text-2xl font-semibold">Library to North Campus</h2>
                </div>
                <StateBadge state="SAFE" />
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["ETA 18m", "Next check-in 5m", "Risk score 18"].map((item) => (
                  <div className="rounded-lg bg-blue-50 p-4 text-center font-semibold text-blue-900 dark:bg-blue-950 dark:text-blue-100" key={item}>{item}</div>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {["Route entered safe corridor", "Quiet check-in confirmed", "Trusted contacts standing by"].map((item, index) => (
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 dark:bg-slate-900" key={item}>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-teal-50 text-sm font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-100">{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-14 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article className="safe-card rounded-lg p-5" key={pillar.title}>
            <pillar.icon className="h-7 w-7 text-blue-700 dark:text-blue-200" />
            <h2 className="mt-5 text-xl font-semibold">{pillar.title}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">{pillar.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
