# PlateDex v4.3.2

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

## v4.6.2
- Advanced collection/share search: `origin=`, `spotted=`, `rarity=`, `plate=`, `label=`; filters can be combined.
- Restores the last open app section after the browser/app is backgrounded or reloaded.
- JPEG EXIF GPS and capture date can auto-fill empty latitude, longitude and date fields when metadata is present.
- Special territories respect the selected region and appear above the normal country list while enabled.
