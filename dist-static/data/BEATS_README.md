# Beats JSON Store Setup

## 📁 Soubor: `public/data/beats.json`

Beats se načítají z lokálního JSON souboru místo Supabase databáze.

## 🎵 Jak přidat nový beat:

1. **Nahraj MP3 na Dropbox**
2. **Sdílej soubor**: Pravý klik → Share → Copy link
3. **Získáš link**: `https://www.dropbox.com/scl/fi/abc123/song.mp3?rlkey=xyz&dl=0`
4. **Přidej do `beats.json`**:

```json
{
  "id": "beat-007",
  "title": "Nový Beat",
  "bpm": 140,
  "genre": "Trap",
  "mood": "Dark",
  "url": "https://www.dropbox.com/scl/fi/abc123/song.mp3?rlkey=xyz&dl=0"
}
```

## ⚙️ BeatPlayer automaticky upravuje URL

Komponenta `BeatPlayer.tsx` automaticky konvertuje Dropbox linky:
- `dl=0` → upraví se na `dl.dropboxusercontent.com` s `raw=1`
- Není třeba ručně měnit URL v JSON souboru
- Funguje i s přímými HTTP linky

## 📋 Struktura Beat objektu

```typescript
{
  "id": string,        // Unikátní ID (např. "beat-001")
  "title": string,     // Název beatu
  "bpm": number,       // Beats per minute
  "genre": string,     // Žánr (Trap, Drill, Hip-Hop, Lo-Fi, atd.)
  "mood": string,      // Nálada (Dark, Chill, Energetic, atd.)
  "url": string        // Dropbox share link nebo přímý link
}
```

## 🎯 Příklad různých mood tagů

Můžeš kombinovat více tags oddělených čárkou:
- `"Dark"`
- `"Dark, Atmospheric"`
- `"Chill, Relaxing"`
- `"Energetic, Aggressive"`

Filtry v UI automaticky rozpoznají jednotlivé tagy.

## 🔄 Jak aktualizovat beaty:

1. Uprav `public/data/beats.json`
2. Restart dev serveru není potřeba (hot reload)
3. Refresh stránky `/music/beats`

## 💡 Výhody JSON store:

✅ Žádná závislost na Supabase  
✅ Rychlé načítání (lokální soubor)  
✅ Snadná editace (textový editor)  
✅ Verzování v Gitu  
✅ Offline-ready po buildu  

## 🚀 Production:

Po `npm run build` se `beats.json` automaticky zkopíruje do `/out/data/beats.json` a bude dostupný na produkci.
