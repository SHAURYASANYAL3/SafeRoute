"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, MapPinned, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import { useApp } from "@/context/AppContext";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/start-trip", label: "Start", icon: MapPinned },
  { href: "/active-trip", label: "Monitor", icon: ShieldCheck },
  { href: "/contacts", label: "Contacts", icon: UsersRound },
  { href: "/settings", label: "Profile", icon: UserRound },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { notifications } = useApp();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-30 border-b border-blue-100/70 bg-white/88 backdrop-blur dark:border-white/10 dark:bg-slate-950/86">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link className="flex items-center gap-3 font-semibold" href="/">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span>SafeRoute</span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  className={`flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${
                    active ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200" : "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link className="relative grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-100" href="/dashboard" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500" aria-label={`${notifications.length} notifications`} />
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 pb-24 md:py-8">{children}</div>
      <nav aria-label="Mobile primary" className="fixed bottom-0 left-0 right-0 z-40 border-t border-blue-100 bg-white/95 px-2 py-2 backdrop-blur md:hidden dark:border-white/10 dark:bg-slate-950/95">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link className={`grid min-h-14 place-items-center rounded-lg text-xs ${active ? "bg-blue-600 text-white" : "text-slate-600 dark:text-slate-200"}`} href={item.href} key={item.href}>
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
