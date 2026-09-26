# PlateDex v4.1

PlateDex is a private license-plate collection app prepared for Supabase Auth/Postgres/Storage and Cloudflare Workers.

## Cloudflare Workers + Vite

This version uses the official Cloudflare Vite plugin and `wrangler.jsonc`.
The React/Vite build is deployed as Cloudflare Workers Static Assets with SPA fallback.

### Local build

```bash
npm install
npm run build
```

### Local preview

```bash
npm run preview
```

### Deploy

```bash
npm run deploy
```

### Cloudflare Workers Builds

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npm run preview`

### Required environment variables

Set these in Cloudflare Workers → Settings → Variables and Secrets:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Never put a Supabase secret/service-role key in this frontend project.

## Supabase

See `supabase/SETUP.md` and `supabase/schema.sql`.
