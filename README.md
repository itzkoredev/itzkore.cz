# itzKORE – osobní web

Moderní webová aplikace postavená na Next.js 15 (TypeScript) s Tailwind CSS.

## ✨ Hlavní funkce

- 🎨 **Dynamické téma** - Light/Dark mode s automatickou detekcí
- � **Plná i18n podpora** - Kompletní Czech/English překlady (CategoryHub, About, Contact, Music, Games, Apps)
- �🌊 **View Transitions** - Plynulé přechody mezi stránkami (iOS-like)
- 🎬 **Animovaná pozadí** - Unikátní canvas animace pro každou sekci
- 🚀 **Optimalizace výkonu** - 120Hz+ display support, preloading, GPU acceleration
- 🎵 **Audio player** - Custom BeatPlayer s FFT visualizerem (rose/pink color palette)
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessibility** - WCAG AA compliant, reduce motion support
- 🔍 **SEO optimalizované** - Open Graph, Twitter Cards, JSON-LD strukturovaná data, dynamická sitemap
- 🧪 **Test Coverage** - Jest + React Testing Library pro unit/integration testy

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
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm start            # Start production server
npm run lint         # ESLint check
npm run format       # Prettier formatting
npm test             # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
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

2. V Supabase vytvoř tabulku `beats` se sloupci: `id text`, `title text`, `bpm int4`, `genre text`, `mood text`, `url text`.

3. Povolit veřejné čtení (RLS policy) pro SELECT pro anon roli, např. `USING (true)`.

4. Do `url` vkládej plné URL na soubor (např. Dropbox share link). Aplikace je automaticky přepíše na `dl.dropboxusercontent.com` s `raw=1` pro přímé streamování.

5. Otevři `/music/beats` a klikni na položku pro přehrání.

**Poznámka k barvám:** BeatPlayer visualizer používá rose/pink paletu (`#F43F5E`, `#EC4899`, `#DB2777`) konzistentní s Music sekcí.

Portfolio:

- Obrázky obalů vlož do `public/covers` a aktualizuj cesty v `src/app/music/portfolio/page.tsx`.

## Testování

Projekt obsahuje unit/integration testy s Jest a React Testing Library:

```cmd
npm test              # Spustit všechny testy
npm run test:watch    # Watch mode pro vývoj
npm run test:coverage # Generovat coverage report
```

**Testované oblasti:**
- ✅ i18n systém (přepínání jazyků, překlady)
- ✅ Kontaktní formulář (validace, i18n labels/placeholders)
- 🔜 Theme toggling (light/dark mode)
- 🔜 Audio player controls
- 🔜 Route navigation

## SEO

Web je plně optimalizován pro vyhledávače:

### Implementované SEO prvky

- ✅ **Kompletní metadata** - Title tags, meta descriptions, keywords pro každou stránku
- ✅ **Open Graph tags** - Optimalizace pro Facebook, LinkedIn a další platformy
- ✅ **Twitter Cards** - Náhledy s velkými obrázky
- ✅ **JSON-LD strukturovaná data** - Schema.org (Person, WebSite, CreativeWork, SoftwareApplication)
- ✅ **Dynamická sitemap** - `/sitemap.xml` automaticky generována Next.js
- ✅ **Robots.txt** - `/robots.txt` s pravidly pro crawlery
- ✅ **Canonical URLs** - Prevence duplicitního obsahu
- ✅ **Hreflang tags** - Podpora cs/en jazykových variant
- ✅ **Alt texty** - Všechny obrázky mají popisky
- ✅ **Semantic HTML** - Správná H1-H6 hierarchie

### Po nasazení do produkce

1. **Google Search Console**
   - Přidej web a ověř vlastnictví
   - Odešli sitemap: `https://itzkore.cz/sitemap.xml`
   - Sleduj indexaci a výkon

2. **Open Graph images** (TODO)
   - Vytvoř `public/og-image.png` (1200x630px) - hlavní image
   - Vytvoř `public/og-music.png` - pro /music sekci
   - Vytvoř `public/og-games.png` - pro /games sekci
   - Vytvoř `public/og-apps.png` - pro /apps sekci
   - Vytvoř `public/og-ai.png` - pro /ai sekci

3. **Verification tags** (volitelné)
   - V `src/app/layout.tsx` je připraveno pole `verification`
   - Přidej Google/Yandex verification kódy po registraci

### SEO dokumentace

Kompletní SEO audit najdeš v souboru `SEO_AUDIT.md`.
