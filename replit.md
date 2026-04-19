# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### EduMatch AI (artifacts/edumatch-app)
- Kind: Mobile (Expo / React Native)
- Purpose: AI-powered faculty recruitment platform
- Preview path: /
- Design: Deep navy #1e1b4b + violet #7c3aed, Inter font
- Auth: Mock auth with AsyncStorage (Dr. Aisha Raza, IISAT University)

**Screens:**
- `(auth)/index.tsx` — Animated splash/landing screen
- `(auth)/login.tsx` — Sign in / Register form with tabs
- `(tabs)/index.tsx` — Dashboard: match score, quick stats, quick actions, recommended jobs
- `(tabs)/jobs.tsx` — Job listings with search, filters, save/apply
- `(tabs)/applications.tsx` — Application tracker with timeline and status
- `(tabs)/profile.tsx` — User profile with skills, education, links
- `resume-upload.tsx` — 3-step resume upload with AI analysis animation
- `career-roadmap.tsx` — AI career gap analysis + recommended courses
- `edit-profile.tsx` — Full profile editor (personal, contact, skills, bio, preferences)

**Key files:**
- `constants/colors.ts` — Design tokens
- `contexts/AuthContext.tsx` — Auth state with AsyncStorage
- `hooks/useColors.ts` — Color scheme hook
- `app.json` — splash backgroundColor: #1e1b4b

### API Server (artifacts/api-server)
- Express 5 + TypeScript
- Running on port 8080
- Health check: GET /api/healthz

### Canvas / Mockup Sandbox (artifacts/mockup-sandbox)
- Design mockups for faculty app screens
