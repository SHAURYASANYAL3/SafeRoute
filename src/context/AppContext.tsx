"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Escalation, NotificationEvent, SafetyState, Trip, TrustedContact, User } from "@/types";
import { activeTrip as seedTrip, demoUser, escalations as seedEscalations, notifications as seedNotifications } from "@/utils/mockData";

type AppContextValue = {
  user: User;
  activeTrip: Trip | null;
  notifications: NotificationEvent[];
  escalations: Escalation[];
  setActiveTrip: (trip: Trip | null) => void;
  updateTripState: (state: SafetyState, riskScore?: number) => void;
  addContact: (contact: TrustedContact) => void;
  removeContact: (id: string) => void;
  addNotification: (event: NotificationEvent) => void;
  addEscalation: (event: Escalation) => void;
  toggleDarkMode: () => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(demoUser);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(seedTrip);
  const [notifications, setNotifications] = useState(seedNotifications);
  const [escalations, setEscalations] = useState(seedEscalations);

  const updateTripState = useCallback((state: SafetyState, riskScore?: number) => {
    setActiveTrip((trip) => {
      if (!trip) return trip;
      const nextScore = riskScore ?? trip.riskScore;
      if (trip.currentState === state && trip.riskScore === nextScore) return trip;
      return { ...trip, currentState: state, riskScore: nextScore };
    });
  }, []);

  const addContact = useCallback((contact: TrustedContact) => {
    setUser((current) => ({
      ...current,
      trustedContacts: [...current.trustedContacts, contact].sort((a, b) => a.priority - b.priority),
    }));
  }, []);

  const removeContact = useCallback((id: string) => {
    setUser((current) => ({
      ...current,
      trustedContacts: current.trustedContacts.filter((contact) => contact.id !== id),
    }));
  }, []);

  const addNotification = useCallback((event: NotificationEvent) => setNotifications((current) => [event, ...current]), []);
  const addEscalation = useCallback((event: Escalation) => setEscalations((current) => [event, ...current]), []);
  const toggleDarkMode = useCallback(() => {
    setUser((current) => ({
      ...current,
      preferences: { ...current.preferences, darkMode: !current.preferences.darkMode },
    }));
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      activeTrip,
      notifications,
      escalations,
      setActiveTrip,
      updateTripState,
      addContact,
      removeContact,
      addNotification,
      addEscalation,
      toggleDarkMode,
    }),
    [activeTrip, addContact, addEscalation, addNotification, escalations, notifications, removeContact, toggleDarkMode, updateTripState, user],
  );

  return (
    <AppContext.Provider value={value}>
      <div className={user.preferences.darkMode ? "dark" : ""}>{children}</div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
