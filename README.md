# PlateDex v4.3.1

PlateDex is a private license plate collection app built with React + Vite, Supabase, MapLibre/OpenFreeMap, and Cloudflare Workers.

## v4.3 changes
- Restored the v3-style Collection UI: large cards, 3-column layout, rarity borders, real interactive map, Hide/Show map.
- Added Country Checklist for 195 countries with continent percentages and spotted/not-spotted checkmarks.
- Added Special Territories & Dependencies section (tracked separately from the 195-country percentages).
- Added Profile modal with editable display name.
- Added profile share links using the existing secure share system.
- Kept private notes and exact coordinates out of public share pages.
- Kept Supabase auth, Users/admin, Add/Edit/Delete, Storage, Shares, and Cloudflare Vite/Workers setup.

## Cloudflare Workers Builds
Build command:
`npm run build`

Deploy command:
`npx wrangler deploy`

Preview command:
`npm run preview`

## Environment variables
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Never put the Supabase service-role/secret key in frontend code.

## Map
The Collection map uses MapLibre GL JS with the OpenFreeMap Liberty style. OpenFreeMap requires attribution, which MapLibre adds automatically.
