# itzKORE – osobní web

Moderní webová aplikace postavená na Next.js (TypeScript) s Tailwind CSS.

## Požadavky

- Node.js 20+
- npm (součást Node.js)

## Lokální spuštění (Windows cmd)

```cmd
npm install
npm run dev
```

Pak otevřete <http://localhost:3000>

## Užitečné skripty

```cmd
npm run build
npm start
npm run lint
npm run format
```

## Produkční nasazení

Minimální proměnné prostředí (pokud používáš Spotify/Supabase funkce):

```ini
# .env.production
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon
# Pro Spotify API proxy (volitelné)
SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret
```

Build + start (na serveru nebo v CI):

```cmd
npm ci
npm run build
npm start
```

Poznámky:
- `next.config.mjs` používá `output: 'standalone'` → složka `.next/standalone` lze zabalit do Docker image.
- Pro reverzní proxy (Nginx/Caddy) přesměruj `/:path*` na Node port (výchozí 3000). Předej hlavičky `X-Forwarded-*`.
- CSP hlavičky jsou přísné v produkci; v dev módu jsou uvolněné kvůli HMR.

## Struktura

- `src/app` – App Router, `page.tsx` (domovská stránka), `api/health` (zdraví API)
- `tailwind.config.ts`, `postcss.config.js` – konfigurace Tailwindu a PostCSS
- `src/app/music/beats` – seznam beatů + přehrávač (data pouze ze Supabase tabulky `beats`)
- `src/app/music/mix-master` – obsah o službách mix/master
- `src/app/music/portfolio` – grid releasů s embedem Spotify/YouTube

## CI

Konfigurace CI (GitHub Actions) je ve složce `.github/workflows`.

## Práce s hudbou (Music)

Beaty jsou načítány pouze ze Supabase (tabulka `beats`). Pro přehrávání používáme externí URL (např. Dropbox direct linky). Supabase Storage není vyžadován.

1. Nastav `.env.local` s:

```ini
NEXT_PUBLIC_SUPABASE_URL=...  
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

1. V Supabase vytvoř tabulku `beats` se sloupci: `id text`, `title text`, `bpm int4`, `genre text`, `mood text`, `url text`.

1. Povolit veřejné čtení (RLS policy) pro SELECT pro anon roli, např. `USING (true)`.

1. Do `url` vkládej plné URL na soubor (např. Dropbox share link). Aplikace je automaticky přepíše na `dl.dropboxusercontent.com` s `raw=1` pro přímé streamování.

1. Otevři `/music/beats` a klikni na položku pro přehrání.

Portfolio:

- Obrázky obalů vlož do `public/covers` a aktualizuj cesty v `src/app/music/portfolio/page.tsx`.
