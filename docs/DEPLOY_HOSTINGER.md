# Hostinger VPS Deployment Guide - ORI-OS

## Prerequisites
- VPS running Ubuntu 24.04 LTS
- Docker & Docker Compose installed
- Domain names pointed to VPS IP:
  - `ori-os.ori-craftlabs.com` (Frontend)
  - `api.ori-os.ori-craftlabs.com` (API)

## Step 1: Clone and Setup
```bash
git clone https://github.com/ib4d/ori-os-chatzai.git
cd ori-os-chatzai
cp .env.example .env
# Edit .env and set production values (JWT_SECRET, DATABASE_URL, etc.)
```

## Step 2: Database Migration
```bash
pnpm install
pnpm db:generate
pnpm db:push # In production, use prisma migrate deploy
```

## Step 3: Run with Docker Compose
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Step 4: SSL with Caddy (Included)
The project includes a `Caddyfile` for automatic SSL. Ensure ports 80 and 443 are open.

## Production Checklist
- [ ] `ORI_AUTH_BYPASS` set to `0`
- [ ] `NODE_ENV` set to `production`
- [ ] `DATABASE_URL` points to a persistent Volume or external RDS
- [ ] All API keys (OpenAI, Resend, etc.) are valid
