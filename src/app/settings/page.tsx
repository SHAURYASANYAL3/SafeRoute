"use client";

import { Moon, Smartphone, WifiOff } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { user, toggleDarkMode } = useApp();

  return (
    <AppShell>
      <PageHeader eyebrow="Settings" title="Profile and safety preferences" description="Configure defaults for check-ins, fallback channels, accessibility, and PWA installation." />
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1fr]">
        <section className="safe-card rounded-lg p-5">
          <div className="grid h-16 w-16 place-items-center rounded-lg bg-blue-600 text-xl font-semibold text-white">AC</div>
          <h2 className="mt-4 text-2xl font-semibold">{user.name}</h2>
          <p className="mt-1 text-slate-500 dark:text-slate-300">{user.email}</p>
        </section>
        <section className="space-y-3">
          <button className="safe-card flex min-h-16 w-full items-center justify-between rounded-lg p-4 text-left" onClick={toggleDarkMode}>
            <span className="flex items-center gap-3 font-semibold"><Moon className="h-5 w-5" /> Dark mode</span>
            <span>{user.preferences.darkMode ? "On" : "Off"}</span>
          </button>
          <div className="safe-card flex min-h-16 items-center justify-between rounded-lg p-4">
            <span className="flex items-center gap-3 font-semibold"><WifiOff className="h-5 w-5" /> Offline SMS fallback</span>
            <span>{user.preferences.offlineSmsFallback ? "Enabled" : "Disabled"}</span>
          </div>
          <div className="safe-card flex min-h-16 items-center justify-between rounded-lg p-4">
            <span className="flex items-center gap-3 font-semibold"><Smartphone className="h-5 w-5" /> PWA install support</span>
            <span>Ready</span>
          </div>
          <Button href="/auth" variant="secondary">Manage authentication</Button>
        </section>
      </div>
    </AppShell>
  );
}
