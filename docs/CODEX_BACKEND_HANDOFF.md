# Codex Backend Handoff (May 14, 2026)

Backend location (shared project):
- `/Users/test/Documents/Playground/TheTeamGuy/Codex`

Implemented endpoints:
- `GET /api/homepage/options`
- `POST /api/auth/request-otp`
- `POST /api/auth/verify-otp`
- `GET /api/vibes/recommend`
- `GET /api/vibes/:id`
- `GET /api/vibes/:id/addons`
- `POST /api/bookings/create`
- `POST /api/communications/sms`

Key files:
- `Codex/src/app.js`
- `Codex/src/server.js`
- `Codex/sql/001_phase1_schema.sql`
- `Codex/sql/002_phase1_seed.sql`
- `Codex/docs/API_CONTRACT_PHASE1.md`
- `Codex/.env.example`

Frontend note:
- `GET /api/homepage/options` currently returns `{ "options": [...] }`
- If frontend expects raw array, adapt frontend API layer to use `data.options`

Run backend:
1. `cd /Users/test/Documents/Playground/TheTeamGuy/Codex`
2. `npm install`
3. Apply SQL schema + seed to DB
4. `npm run dev`

Suggested frontend env:
- `VITE_API_URL=http://localhost:8080`
