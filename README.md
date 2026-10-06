# PlateDex v5.2.2

PlateDex is a private license-plate collection app built with React + Vite, Supabase, MapLibre/OpenFreeMap, Cloudflare Workers and an optional Capacitor Android shell.

## v5.2.2

- Platepedia has explicit coverage for all 195 sovereign-state entries used by PlateDex.
- Every country has a current ordinary-passenger plate layout entry.
- Every country has an explicit regional-decoding mode: automatic serial decoder, issuer/printed-region handling, regional selector, or not applicable.
- Regional countries always expose their registration-area catalogue instead of appearing as missing.
- Plate-code chips remain clickable and update the visual plate showcase when a reliable code table is available.
- The global PlateGeo rule loader now has jsDelivr + raw GitHub fallbacks and a more flexible nested-rule parser.
- Germany and Austria detailed district data use redundant CDN/raw sources; Poland detailed county data does the same.
- Added local decoders for China, India and Belarus in addition to the existing Montenegro, Türkiye, Romania, Croatia, Slovenia, Switzerland and Ireland decoders.
- Existing Supabase schema and stored plates remain compatible.

`src/platepedia-coverage.json` is a 195-entry completeness audit. `unclassified` must remain `0`.

## v5.2 / v5.2.1

- Independent desktop checklist columns.
- Platepedia encyclopedia tab.
- Hidden Platepedia scrollbars while preserving normal scrolling.
- Interactive plate-format showcase.
- Automatic region decoding where the typed registration reliably carries the geographic identifier.

## Regional-data rule

PlateDex only treats a country as regionally identifiable when its current ordinary passenger plate itself carries a meaningful geographic issuer/registration origin. Administrative regions alone do not qualify. Countries such as Denmark, Italy and modern Spain therefore do not receive an artificial regional checklist.

Some jurisdictions identify geography by the plate design or by separately printed issuer text rather than by characters inside the serial. PlateDex deliberately uses an area selector for those cases instead of inventing an automatic decoder.

## Android APK

The Android shell loads `https://platedex.emilo.workers.dev`, so ordinary web deployments update the app UI/data without reinstalling the APK. Native Android changes still require a new APK.

## Cloudflare Workers Builds

Build command: `npm run build`

Deploy command: `npx wrangler deploy`

Preview command: `npm run preview`

## Environment variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Never put the Supabase service-role/secret key in frontend code.
