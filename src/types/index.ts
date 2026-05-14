export type SafetyState = "SAFE" | "WARNING" | "HIGH_RISK" | "ESCALATED" | "RECOVERED";

export type CommuteMode = "Walk" | "Bike" | "Rideshare" | "Transit";

export type TrustedContact = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: number;
  escalationEnabled: boolean;
};

export type UserPreferences = {
  darkMode: boolean;
  adaptiveIntervals: boolean;
  lowBatteryEscalation: boolean;
  offlineSmsFallback: boolean;
  checkInTone: "quiet" | "standard" | "persistent";
};

export type User = {
  uid: string;
  name: string;
  email: string;
  trustedContacts: TrustedContact[];
  preferences: UserPreferences;
};

export type RoutePoint = {
  label: string;
  status: "complete" | "current" | "upcoming";
  etaOffset: number;
};

export type Trip = {
  tripId: string;
  destination: string;
  eta: number;
  commuteMode: CommuteMode;
  currentState: SafetyState;
  routeData: RoutePoint[];
  startedAt: string;
  completedAt?: string;
  progress: number;
  batteryLevel: number;
  networkStatus: "online" | "degraded" | "offline";
  selectedContactIds: string[];
  riskScore: number;
};

export type CheckIn = {
  id: string;
  timestamp: string;
  responded: boolean;
  riskScore: number;
  escalationTriggered: boolean;
};

export type Escalation = {
  id: string;
  level: "Friend" | "Parent" | "Campus Security";
  recipients: string[];
  triggeredAt: string;
  resolved: boolean;
  summary: string;
};

export type NotificationEvent = {
  id: string;
  title: string;
  body: string;
  severity: "info" | "warning" | "critical" | "success";
  createdAt: string;
};

export type RiskInput = {
  hour: number;
  missedCheckIns: number;
  inactivityMinutes: number;
  tripDurationMinutes: number;
  batteryLevel: number;
  silentDistress: boolean;
  networkStatus: Trip["networkStatus"];
};
