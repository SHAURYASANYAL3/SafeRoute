import type { Escalation, NotificationEvent, Trip } from "@/types";

export function buildCheckInReminder(minutes: number): NotificationEvent {
  return {
    id: `note-${Date.now()}`,
    title: "Check-in due soon",
    body: `SafeRoute will ask for confirmation in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    severity: "info",
    createdAt: new Date().toISOString(),
  };
}

export function buildEscalationPayload(trip: Trip, escalation: Escalation) {
  return {
    title: `SafeRoute ${escalation.level} escalation`,
    body: `${trip.destination} trip needs attention. Current state: ${trip.currentState}.`,
    data: {
      tripId: trip.tripId,
      destination: trip.destination,
      level: escalation.level,
      resolved: String(escalation.resolved),
    },
  };
}

export function simulateOfflineSmsFallback(recipients: string[]) {
  return recipients.map((recipient) => ({
    recipient,
    status: "queued",
    channel: "offline-sms-fallback",
    createdAt: new Date().toISOString(),
  }));
}
