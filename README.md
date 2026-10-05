# PlateDex v5.1

PlateDex 5.1 adds a mobile-first UI, consistent SVG flags, plate-region checklists, and an Android Capacitor shell that stays synced with the deployed web app.

## Android APK

After pushing to GitHub, open **Actions → Build PlateDex Android APK → Run workflow** (or let the main-branch push trigger it). When the workflow finishes, download the `PlateDex-v5.1-Android` artifact and extract `app-debug.apk`. This APK is for direct personal installation/testing.

The Android shell loads `https://platedex.emilo.workers.dev`, so normal web deployments update the app UI/data without reinstalling the APK. Native Android changes still require a new APK.

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


## 5.1 regional checklist data note
The regional checklist now uses a conservative, plate-system-first dataset. Italy and Spain were removed because ordinary current national serials do not encode a geographic registration area. Germany and Poland are temporarily omitted from the UI rather than showing incorrect state/voivodeship counts; their district-level code datasets require a dedicated verified import. Türkiye (81 province codes) and Norway (official Statens vegvesen issuing areas) were added. The UI total is calculated only from entries currently present in the verified dataset.


## PlateDex 5.1.1 regional checklist

The regional checklist now has an explicit current-ordinary-plate classification for all 195 sovereign states used by PlateDex. Countries whose normal current passenger plates do not encode geography are excluded. Germany and Austria use detailed registration-district data from `openpotato/kfz-kennzeichen`; Poland uses the current county dataset from `open-admin-data/poland-administrative-divisions`. These detailed lists are loaded at runtime and cached by the browser.

Important examples fixed from 5.0: Denmark, Italy and Spain do not receive regional checklists; Germany is not reduced to 16 states; Poland is not reduced to 16 voivodeships; Austria is not reduced to 9 states.
