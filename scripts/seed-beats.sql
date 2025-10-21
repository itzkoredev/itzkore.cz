-- Supabase Beats Table Setup Script
-- Run this in Supabase SQL Editor

-- 1. Create table
CREATE TABLE IF NOT EXISTS beats (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  bpm INTEGER NOT NULL,
  genre TEXT NOT NULL,
  mood TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable RLS
ALTER TABLE beats ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read
DROP POLICY IF EXISTS "Public read access" ON beats;
CREATE POLICY "Public read access"
ON beats FOR SELECT
TO public
USING (true);

-- 4. Insert sample data (REPLACE URLs with your Dropbox links!)
INSERT INTO beats (id, title, bpm, genre, mood, url) VALUES
  ('beat-001', 'Night Drive', 140, 'Trap', 'Dark', 'https://www.dropbox.com/scl/fi/YOUR_FILE_1/night-drive.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-002', 'Neon Rain', 90, 'Boom Bap', 'Moody', 'https://www.dropbox.com/scl/fi/YOUR_FILE_2/neon-rain.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-003', 'Street Heat', 150, 'Drill', 'Aggressive', 'https://www.dropbox.com/scl/fi/YOUR_FILE_3/street-heat.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-004', 'Cloud Nine', 85, 'Lo-Fi', 'Chill', 'https://www.dropbox.com/scl/fi/YOUR_FILE_4/cloud-nine.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-005', 'Cyber Rush', 160, 'Trap', 'Energetic', 'https://www.dropbox.com/scl/fi/YOUR_FILE_5/cyber-rush.mp3?rlkey=YOUR_KEY&raw=1'),
  ('beat-006', 'Midnight Ride', 145, 'UK Drill', 'Dark, Atmospheric', 'https://www.dropbox.com/scl/fi/YOUR_FILE_6/midnight-ride.mp3?rlkey=YOUR_KEY&raw=1')
ON CONFLICT (id) DO NOTHING;

-- 5. Verify
SELECT * FROM beats ORDER BY title;
