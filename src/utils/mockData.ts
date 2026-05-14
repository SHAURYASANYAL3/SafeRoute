import type { CheckIn, Escalation, NotificationEvent, Trip, TrustedContact, User } from "@/types";

export const trustedContacts: TrustedContact[] = [
  {
    id: "contact-1",
    name: "Maya Rao",
    relationship: "Roommate",
    phone: "+1 415 555 0184",
    email: "maya@example.edu",
    priority: 1,
    escalationEnabled: true,
  },
  {
    id: "contact-2",
    name: "Arun Sanya",
    relationship: "Parent",
    phone: "+1 415 555 0191",
    email: "arun@example.com",
    priority: 2,
    escalationEnabled: true,
  },
  {
    id: "contact-3",
    name: "Campus Security",
    relationship: "University response desk",
    phone: "+1 415 555 0100",
    email: "security@campus.edu",
    priority: 3,
    escalationEnabled: true,
  },
];

export const demoUser: User = {
  uid: "student-demo-001",
  name: "Avery Chen",
  email: "avery.chen@campus.edu",
  trustedContacts,
  preferences: {
    darkMode: false,
    adaptiveIntervals: true,
    lowBatteryEscalation: true,
    offlineSmsFallback: true,
    checkInTone: "quiet",
  },
};

export const activeTrip: Trip = {
  tripId: "trip-hr26-1842",
  destination: "North Campus Residence Hall",
  eta: 18,
  commuteMode: "Walk",
  currentState: "SAFE",
  startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  progress: 46,
  batteryLevel: 42,
  networkStatus: "online",
  selectedContactIds: ["contact-1", "contact-2", "contact-3"],
  riskScore: 18,
  routeData: [
    { label: "Library exit", status: "complete", etaOffset: -10 },
    { label: "Blue-light corridor", status: "complete", etaOffset: -4 },
    { label: "Maple transit stop", status: "current", etaOffset: 0 },
    { label: "Residence gate", status: "upcoming", etaOffset: 9 },
    { label: "North Campus Residence Hall", status: "upcoming", etaOffset: 18 },
  ],
};

export const recentTrips: Trip[] = [
  { ...activeTrip, tripId: "trip-hr26-1819", currentState: "RECOVERED", completedAt: new Date(Date.now() - 86400000).toISOString(), progress: 100, destination: "Graduate Studio" },
  { ...activeTrip, tripId: "trip-hr26-1741", currentState: "SAFE", completedAt: new Date(Date.now() - 172800000).toISOString(), progress: 100, destination: "East Campus Lab", riskScore: 12 },
  { ...activeTrip, tripId: "trip-hr26-1627", currentState: "WARNING", completedAt: new Date(Date.now() - 259200000).toISOString(), progress: 100, destination: "Off-campus apartment", riskScore: 39 },
];

export const checkIns: CheckIn[] = [
  { id: "check-1", timestamp: new Date(Date.now() - 24 * 60 * 1000).toISOString(), responded: true, riskScore: 14, escalationTriggered: false },
  { id: "check-2", timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), responded: true, riskScore: 18, escalationTriggered: false },
  { id: "check-3", timestamp: new Date(Date.now() + 5 * 60 * 1000).toISOString(), responded: false, riskScore: 24, escalationTriggered: false },
];

export const escalations: Escalation[] = [
  {
    id: "esc-1",
    level: "Friend",
    recipients: ["Maya Rao"],
    triggeredAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    resolved: true,
    summary: "Missed check-in resolved by student confirmation after 90 seconds.",
  },
  {
    id: "esc-2",
    level: "Parent",
    recipients: ["Maya Rao", "Arun Sanya"],
    triggeredAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    resolved: true,
    summary: "Connectivity loss during transit. Offline SMS fallback simulated.",
  },
];

export const notifications: NotificationEvent[] = [
  {
    id: "note-1",
    title: "Next check-in scheduled",
    body: "Quiet prompt in 5 minutes based on current route context.",
    severity: "info",
    createdAt: new Date().toISOString(),
  },
  {
    id: "note-2",
    title: "Battery-aware monitoring",
    body: "Escalation timers will shorten if battery falls below 18%.",
    severity: "warning",
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
];
