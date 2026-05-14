"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, TimerReset, X } from "lucide-react";
import { Button } from "@/components/Button";

export function CheckInModal({ open, interval, onSafe, onMiss, onClose }: { open: boolean; interval: number; onSafe: () => void; onMiss: () => void; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.section className="w-full max-w-md rounded-lg bg-white p-5 shadow-2xl dark:bg-slate-900" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="checkin-title">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-100">
                <TimerReset className="h-6 w-6" />
              </span>
              <button className="grid h-11 w-11 place-items-center rounded-lg hover:bg-slate-100 dark:hover:bg-white/10" onClick={onClose} aria-label="Close check-in">
                <X className="h-5 w-5" />
              </button>
            </div>
            <h2 className="mt-5 text-2xl font-semibold" id="checkin-title">Are you safe right now?</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Adaptive check-ins are currently set to every {interval} minutes for this commute context.</p>
            <div className="mt-6 grid gap-3">
              <Button icon={CheckCircle2} onClick={onSafe}>I am safe</Button>
              <Button variant="secondary" onClick={onMiss}>Simulate missed check-in</Button>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
