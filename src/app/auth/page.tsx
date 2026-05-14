"use client";

import { Globe, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";

export default function AuthPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--background)] p-4 text-[var(--foreground)]">
      <section className="safe-card w-full max-w-md rounded-lg p-6">
        <span className="grid h-14 w-14 place-items-center rounded-lg bg-blue-600 text-white">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold">Welcome to SafeRoute</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Use your campus email or Google account to begin monitored trips.</p>
        <form className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Campus email</span>
            <input className="mt-2 min-h-12 w-full rounded-lg border border-blue-100 bg-white px-3 dark:border-white/10 dark:bg-slate-900" placeholder="avery.chen@campus.edu" type="email" />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input className="mt-2 min-h-12 w-full rounded-lg border border-blue-100 bg-white px-3 dark:border-white/10 dark:bg-slate-900" placeholder="Password" type="password" />
          </label>
          <Button className="w-full" href="/dashboard" icon={Mail}>Continue</Button>
        </form>
        <div className="mt-4">
          <Button className="w-full" href="/dashboard" icon={Globe} variant="secondary">Continue with Google</Button>
        </div>
      </section>
    </main>
  );
}
