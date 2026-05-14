# The Team Guy Backend (Phase 1)

## Quick start
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Run schema: `mysql -u test -p u873997170_vibes < sql/001_phase1_schema.sql`
4. Seed defaults: `mysql -u test -p u873997170_vibes < sql/002_phase1_seed.sql`
5. Start API: `npm run dev`

## API base
- Local: `http://localhost:8080`
- Health check: `GET /health`

## Notes
- OTP store is currently in-memory for MVP local/dev.
- Twilio sending auto-disables when credentials are missing.
- Full endpoint contract for Claude is in `docs/API_CONTRACT_PHASE1.md`.
