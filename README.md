# SafeRoute

SafeRoute is an adaptive student commute safety orchestration system built for HackRent 2026 under the Systems Track. It focuses on predictable monitoring, state-driven risk evaluation, structured escalation, and calm recovery workflows.

## Stack

- Next.js 15 with App Router and TypeScript
- React, Tailwind CSS, Framer Motion
- Firebase Authentication, Firestore, Cloud Messaging adapters
- Mapbox-ready route and ETA service layer
- PWA manifest for install support

## Key Workflows

- Student authentication with email and Google UI paths
- Trip creation with destination, commute mode, ETA, and trusted contacts
- Active monitoring with ETA, route progress, safety state, and adaptive check-ins
- Risk engine states: `SAFE`, `WARNING`, `HIGH_RISK`, `ESCALATED`, `RECOVERED`
- Silent distress trigger and progressive escalation chain
- Recovery workflow that stops alerts, notifies contacts, and archives the trip
- Trusted contact priority management and settings

## Local Development

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` when connecting Firebase and Mapbox.

## Architecture

```text
src/
  app/          Route pages and layouts
  components/   Reusable accessible UI primitives
  context/      App state provider for demo orchestration
  firebase/     Firebase SDK configuration
  hooks/        Trip orchestration hooks
  services/     Firebase, notification, and Mapbox adapters
  types/        Domain models
  utils/        Mock data and risk engine
```
