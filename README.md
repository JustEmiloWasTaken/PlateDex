# PlateDex v4

PlateDex v4 is prepared for:
- Cloudflare Pages
- Supabase Auth
- Supabase Postgres + RLS
- Supabase Storage

## Build
```bash
npm install
npm run build
```

Cloudflare Pages:
- Build command: `npm run build`
- Output directory: `dist`

Add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Do NOT put a Supabase secret/service-role key in this project.

## Supabase
Run `supabase/schema.sql` in SQL Editor.

Then create your first account in Authentication > Users and put that user's UUID into `public.profiles` as an admin. See `supabase/SETUP.md`.

The app has no public signup screen. Friends are intended to be created manually by the administrator through Supabase Auth for this first version.
