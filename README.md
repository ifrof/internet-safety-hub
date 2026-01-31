# IFROF (V1) – Full Project Replacement ZIP

This ZIP is intended to **replace** the old project folder in your repo.

## Quick start (local)

### Requirements
- Node 18+
- pnpm (`npm i -g pnpm`)
- PostgreSQL (or any DB compatible with `DATABASE_URL`)

### Install
```bash
pnpm install
```

### Configure env
```bash
cp .env.example .env
# edit .env with real values
```

### Run (dev)
```bash
pnpm dev
```

### Run server (if separate)
```bash
pnpm --filter server dev
```

### Build
```bash
pnpm build
```

### Tests
```bash
pnpm test
```

## Git hygiene (NO SECRETS)
- `.env` and `.env.*` are ignored by git.
- If you ever committed secrets: rotate them immediately (Supabase/Stripe/Auth secrets).

## Replace old repo contents
1. Download and unzip this project
2. Copy all files into your repo (or replace the folder)
3. Commit + push
```bash
git add -A
git commit -m "chore: replace project with IFROF V1 full codebase"
git push origin main
```
