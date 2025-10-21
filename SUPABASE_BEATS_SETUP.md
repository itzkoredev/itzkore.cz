# Supabase Beats Database Setup

## 1. Vytvoř tabulku `beats`

V Supabase SQL Editoru spusť:

```sql
-- Create beats table
CREATE TABLE beats (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  bpm INTEGER NOT NULL,
  genre TEXT NOT NULL,
  mood TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access"
ON beats FOR SELECT
TO public
USING (true);
```

## 2. Naplň data pomocí INSERT

### Možnost A: Použij placeholder data (než nahraješ na Dropbox)

```sql
INSERT INTO beats (id, title, bpm, genre, mood, url) VALUES
  ('beat-001', 'Night Drive', 140, 'Trap', 'Dark', 'https://www.dropbox.com/scl/fi/YOUR_FILE_1/night-drive.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-002', 'Neon Rain', 90, 'Boom Bap', 'Moody', 'https://www.dropbox.com/scl/fi/YOUR_FILE_2/neon-rain.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-003', 'Street Heat', 150, 'Drill', 'Aggressive', 'https://www.dropbox.com/scl/fi/YOUR_FILE_3/street-heat.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-004', 'Cloud Nine', 85, 'Lo-Fi', 'Chill', 'https://www.dropbox.com/scl/fi/YOUR_FILE_4/cloud-nine.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-005', 'Cyber Rush', 160, 'Trap', 'Energetic', 'https://www.dropbox.com/scl/fi/YOUR_FILE_5/cyber-rush.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-006', 'Midnight Ride', 145, 'UK Drill', 'Dark', 'https://www.dropbox.com/scl/fi/YOUR_FILE_6/midnight-ride.mp3?rlkey=YOUR_KEY&raw=1');
```

### Možnost B: Testovací data s public domain audio

```sql
INSERT INTO beats (id, title, bpm, genre, mood, url) VALUES
  ('beat-demo-1', 'Demo Beat 1', 120, 'Hip-Hop', 'Chill', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'),
  ('beat-demo-2', 'Demo Beat 2', 130, 'Trap', 'Dark', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'),
  ('beat-demo-3', 'Demo Beat 3', 140, 'Drill', 'Energetic', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3');
```

## 3. Jak nahrát beaty na Dropbox a získat odkazy

1. **Nahraj MP3 soubory** na Dropbox
2. **Sdílej soubor** → Vyber soubor → "Share" → "Copy link"
3. **Uprav URL**:
   - Původní: `https://www.dropbox.com/scl/fi/abc123/song.mp3?rlkey=xyz&dl=0`
   - Změň na: `https://www.dropbox.com/scl/fi/abc123/song.mp3?rlkey=xyz&raw=1`
   - (změn `dl=0` na `raw=1` pro přímé přehrávání)

4. **Update v databázi**:
```sql
UPDATE beats 
SET url = 'https://www.dropbox.com/scl/fi/YOUR_REAL_LINK/beat1.mp3?rlkey=KEY&raw=1'
WHERE id = 'beat-001';
```

## 4. Ověř, že to funguje

```sql
-- Zobraz všechny beaty
SELECT * FROM beats ORDER BY title;

-- Test konkrétního beatu
SELECT * FROM beats WHERE id = 'beat-001';
```

## 5. CORS poznámka

BeatPlayer komponenta má automatickou CORS detekci:
- Dropbox linky s `raw=1` parametrem obvykle fungují
- Pokud narazíš na CORS chybu, soubor musí být public shared s `raw=1`

## Příklad správného Dropbox URL formátu

✅ **Správně:**
```
https://www.dropbox.com/scl/fi/abc123xyz/my-beat.mp3?rlkey=secretkey123&raw=1
```

❌ **Špatně:**
```
https://www.dropbox.com/scl/fi/abc123xyz/my-beat.mp3?rlkey=secretkey123&dl=0
```

## Test připojení

Zkontroluj, že máš správně nastavené ENV:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

BeatsBrowser komponenta automaticky načte data z `beats` tabulky.
