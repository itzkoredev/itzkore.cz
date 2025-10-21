# Google Search Console - Kompletní návod

**Datum:** 20. října 2025  
**Status:** Připraveno k registraci po nasazení do produkce

---

## 📋 Krok za krokem

### 1️⃣ Nasaď web do produkce

**Musí běžet na finální doméně:** `https://itzkore.cz`

```bash
# Na serveru (nebo Vercel/Netlify):
npm ci
npm run build
npm start
```

**Ověř že funguje:**
- ✅ `https://itzkore.cz` - homepage se načte
- ✅ `https://itzkore.cz/sitemap.xml` - zobrazí XML sitemap
- ✅ `https://itzkore.cz/robots.txt` - zobrazí robots.txt

---

### 2️⃣ Registrace v Google Search Console

**Odkaz:** https://search.google.com/search-console/

#### Postup:

1. **Přihlas se** Google účtem (použij stejný jako pro Google Analytics pokud ho máš)

2. **Klikni "Přidat web"** (nebo "Add property")

3. **Vyber typ:**
   - **Doporučuji:** "URL prefix" (zadej `https://itzkore.cz`)
   - **Alternativa:** "Domain" (zadej `itzkore.cz`) - vyžaduje DNS ověření

---

### 3️⃣ Ověření vlastnictví (Verification)

Google ti nabídne několik metod. **Nejjednodušší pro Next.js:**

#### Metoda A: HTML tag (DOPORUČENÁ)

1. Google ti dá meta tag, vypadá takto:
   ```html
   <meta name="google-site-verification" content="abc123xyz..." />
   ```

2. **Zkopíruj kód** (jen `abc123xyz...` část)

3. **Přidej do `src/app/layout.tsx`:**
   ```typescript
   export const metadata: Metadata = {
     metadataBase: new URL("https://itzkore.cz"),
     // ... existující metadata ...
     verification: {
       google: "abc123xyz...", // ← Vlož sem svůj kód
     },
   };
   ```

4. **Deploy změnu:**
   ```bash
   git add src/app/layout.tsx
   git commit -m "Add Google Search Console verification"
   git push
   # Počkej na deploy
   ```

5. **Klikni "Verify" v Google Search Console**

#### Metoda B: HTML soubor (alternativa)

1. Google ti dá soubor `google123abc.html`
2. Stáhni ho
3. Vlož do `public/` složky
4. Deploy
5. Ověř že funguje: `https://itzkore.cz/google123abc.html`
6. Klikni "Verify"

#### Metoda C: DNS (pro pokročilé)

- Přidej TXT záznam do DNS
- Použij pokud máš přístup k DNS nastavení domény

---

### 4️⃣ Odeslání Sitemap

**Hned po ověření:**

1. V Google Search Console **jdi na "Sitemaps"** (levý sidebar)

2. **Zadej URL sitemap:**
   ```
   https://itzkore.cz/sitemap.xml
   ```

3. **Klikni "Submit"**

4. **Počkej 1-2 dny** - Google začne indexovat stránky

---

### 5️⃣ Co sledovat v Search Console

#### První týden:
- **Coverage** - kolik stránek Google objevil
- **Sitemaps** - zda byla sitemap úspěšně načtena (mělo by být 13 URLs)
- **Errors** - jakékoliv chyby při crawlování

#### Po měsíci:
- **Performance** - impressions, clicks, CTR, average position
- **Queries** - na jaká klíčová slova se zobrazuješ
- **Pages** - které stránky mají nejvíc zobrazení

---

## 🎯 Očekávané výsledky

### První indexace (1-7 dní):
```
URLs discovered: 13
URLs indexed: 13 (nebo postupně)
```

### Po měsíci (odhad):
```
Impressions: 100-500
Clicks: 5-20
CTR: 2-5%
Average position: 20-50
```

### Po 3 měsících (cíl):
```
Impressions: 1000+
Clicks: 50-100
CTR: 5-10%
Average position: 10-20 (pro brand keywords)
```

---

## 📊 Tipy pro lepší výkon

### 1. **Sleduj Core Web Vitals**
- Search Console → Experience → Core Web Vitals
- Měly by být všechny zelené (LCP, FID, CLS)

### 2. **Oprav Mobile Usability issues**
- Search Console → Experience → Mobile Usability
- Web je responsive, mělo by být 0 errors

### 3. **Sleduj Search Appearance**
- Rich Results - zda Google rozpoznal tvoje structured data (JSON-LD)
- Měl by vidět: Person, WebSite, CreativeWork schemas

### 4. **URL Inspection Tool**
- Zkontroluj jednotlivé stránky
- Klikni "Test Live URL" pro okamžitou indexaci
- Použij "Request indexing" pro prioritní crawlování

---

## ⚡ Rychlá indexace (opciónal)

Pokud chceš urychlit indexaci:

### 1. **Request Indexing**
- V Search Console → URL Inspection
- Zadej URL (např. `https://itzkore.cz/music`)
- Klikni "Request indexing"
- **Limit:** 10 URLs/den

### 2. **Submit všechny důležité stránky:**
```
https://itzkore.cz
https://itzkore.cz/music
https://itzkore.cz/music/beats
https://itzkore.cz/games
https://itzkore.cz/apps
https://itzkore.cz/ai
```

---

## 🔍 Ověření že SEO funguje

### Test 1: Rich Results Test
**Odkaz:** https://search.google.com/test/rich-results

1. Zadej URL: `https://itzkore.cz`
2. Klikni "Test URL"
3. **Mělo by najít:**
   - ✅ Person schema (itzKORE)
   - ✅ WebSite schema
   - ✅ Logo/Image

### Test 2: Facebook Sharing Debugger
**Odkaz:** https://developers.facebook.com/tools/debug/

1. Zadej URL: `https://itzkore.cz`
2. Klikni "Debug"
3. **Mělo by zobrazit:**
   - ✅ Title: "itzKORE | Music Producer..."
   - ✅ Description
   - ✅ Image: `/og-image.png` (až ho vytvoříš)

### Test 3: Twitter Card Validator
**Odkaz:** https://cards-dev.twitter.com/validator

1. Zadej URL: `https://itzkore.cz`
2. **Mělo by zobrazit:**
   - ✅ Card type: summary_large_image
   - ✅ Title, description
   - ✅ Image preview

---

## 🚨 Časté problémy a řešení

### Problem: "Sitemap couldn't be fetched"
**Řešení:**
- Ověř že `https://itzkore.cz/sitemap.xml` vrací XML (ne 404)
- Zkontroluj že je accessible (ne za přihlášením)
- Počkej 24 hodin a zkus znovu

### Problem: "Page is not indexed"
**Řešení:**
- Zkontroluj `robots.txt` - nesmí blokovat tu stránku
- Použij URL Inspection → Request Indexing
- Počkej 1-2 týdny (Google je pomalý)

### Problem: "Soft 404"
**Řešení:**
- Ujisti se že stránka vrací status code 200
- Stránka musí mít dostatek obsahu (300+ slov)

### Problem: "Duplicate content"
**Řešení:**
- Canonical URLs jsou už nastavené v metadata
- Nech Google 1-2 týdny to zpracovat

---

## 📧 Notifications

**Zapni email notifikace:**
1. Search Console → Settings (ozubené kolo)
2. Users and Permissions
3. Přidej svůj email
4. Zapni notifications pro:
   - ✅ Critical errors
   - ✅ Security issues
   - ✅ Manual actions

---

## 📅 Maintenance Schedule

### Každý týden:
- Zkontroluj Performance report
- Sleduj nové queries (keywords)
- Oprav jakékoliv errors

### Každý měsíc:
- Analyzuj top performing pages
- Optimalizuj underperforming content
- Update sitemap (pokud přidáš nové stránky)

### Každé 3 měsíce:
- Kompletní SEO audit
- Competitors analysis
- Keyword strategy update

---

## ✅ Checklist po registraci

Po úspěšném ověření webu:

- [ ] Sitemap odeslána (`sitemap.xml`)
- [ ] Coverage report ukazuje 13 URLs
- [ ] Žádné kritické errors
- [ ] Mobile Usability: 0 issues
- [ ] Core Web Vitals: všechny zelené
- [ ] Rich Results Test: prošel
- [ ] Facebook Debugger: zobrazuje OG tags
- [ ] Email notifications: zapnuté

---

## 🎓 Další zdroje

**Google dokumentace:**
- https://developers.google.com/search/docs
- https://support.google.com/webmasters

**SEO nástroje:**
- Google Analytics (traffic tracking)
- Google PageSpeed Insights (performance)
- Ahrefs / Semrush (konkurence, keywords)

---

## 🆘 Potřebuješ pomoc?

Pokud cokoliv nejde:

1. **Zkontroluj SEO_AUDIT.md** - kompletní checklist
2. **Google Search Console Help** - https://support.google.com/webmasters
3. **Reddit r/SEO** - community pomoc
4. **Web Dev Discord** - live chat s vývojáři

---

**✨ Tvůj web je 100% připravený na Google indexaci!**

Jediné co potřebuješ: nasadit do produkce → zaregistrovat v GSC → odeslat sitemap → počkat 1-2 týdny.
