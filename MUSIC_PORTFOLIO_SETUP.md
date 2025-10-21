# Music Portfolio Setup Guide

## 🎵 Jak nastavit Spotify Portfolio Page

### 1. Získej Spotify Track/Album IDs

**Postup:**
1. Otevři Spotify Desktop nebo Web
2. Najdi svůj track/album
3. Pravý klik → Share → Copy Link
4. Získáš URL jako: `https://open.spotify.com/track/2q72eiBqcJdUC5nnsQ9IZC?si=...`
5. ID je část mezi `/track/` a `?si=`: **2q72eiBqcJdUC5nnsQ9IZC**

### 2. Uprav PortfolioClient.tsx

Soubor: `src/components/music/PortfolioClient.tsx`

```tsx
const spotifyEmbeds = [
  { 
    id: "TVÉ_TRACK_ID_1", 
    type: "track",  // nebo "album" nebo "playlist"
    title: "Název tvého tracku"
  },
  { 
    id: "TVÉ_TRACK_ID_2", 
    type: "track",
    title: "Další track"
  },
  // ... přidej další
];
```

### 3. Nastav Artist ID pro Follow tlačítko

Na řádku ~115 najdi:
```tsx
href="https://open.spotify.com/artist/YOUR_ARTIST_ID"
```

Změň `YOUR_ARTIST_ID` na své Spotify Artist ID.

**Jak získat Artist ID:**
- Otevři svůj artist profil na Spotify
- Copy link → ID je za `/artist/`

### 4. Typy Spotify Embedů

Můžeš použít:
- `type: "track"` - Jednotlivý song
- `type: "album"` - Celé album
- `type: "playlist"` - Playlist
- `type: "artist"` - Artist profil

### 5. Příklad kompletního nastavení

```tsx
const spotifyEmbeds = [
  { 
    id: "7jffYOLZQOvDpe6WZMHuRz", 
    type: "track",
    title: "My Hit Single"
  },
  { 
    id: "4892qyZ1bH1b1wpyeAMuiO", 
    type: "album",
    title: "Debut Album"
  },
  { 
    id: "37i9dQZF1DXcBWIGoYBM5M", 
    type: "playlist",
    title: "My Best Beats"
  },
];
```

## ✨ Nové funkce v Portfolio page:

✅ **Skutečné Spotify embedy** - přehrávání přímo na stránce  
✅ **Responsive design** - funguje na mobilu i desktopu  
✅ **Funkční linky** - Browse Collections vede na `/music/beats`  
✅ **Follow on Spotify** tlačítko  
✅ **Emerald/teal téma** - konzistentní s Music sekcí  
✅ **Smooth animace** - Framer Motion transitions  

## 🎨 Přizpůsobení

### Změnit počet embedů:
Jednoduše přidej/odeber objekty v `spotifyEmbeds` array.

### Změnit layout:
Grid používá `md:grid-cols-2` - pro 3 sloupce změň na `md:grid-cols-3`.

### Upravit kolekce:
```tsx
const playlists = [
  {
    title: 'Tvůj název',
    description: 'Popis kolekce',
    trackCount: 'Počet tracků nebo text',
    gradient: 'from-COLOR to-COLOR',
    link: '/cesta/kam/vede',
  },
];
```

## 🚀 Výsledek

- Spotify tracky se přehrávají přímo na stránce
- Kliknutím na ikonu external link se otevře Spotify
- Follow tlačítko vede na tvůj artist profil
- Collections jsou teď funkční s odkazy na Beats page
- Vše je modern, responsive a working! 🎉
