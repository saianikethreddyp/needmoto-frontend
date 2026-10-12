# Rentals frontend

Next.js (App Router) + Tailwind + shadcn/ui admin portal. A standalone app: it talks to the backend only over HTTP.

## Run locally
```
bun install
# .env.local: NEXT_PUBLIC_API_URL=http://localhost:8787
bun run dev               # http://localhost:3000/admin
bun run check && bun run build
```

## Deploy (Vercel or any Node host)
Set `NEXT_PUBLIC_API_URL` to the public backend URL. The backend's `WEB_ORIGIN` must equal this app's URL.

## Shared schemas
`src/shared` is a generated copy of `../backend/src/shared`. Do not edit it; run `../scripts/sync-shared.sh`, and `../scripts/check-shared-in-sync.sh` to verify.
