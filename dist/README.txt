Production bundle prepared in this folder.
Run: node server.js
Windows: start.cmd

Ensure required environment variables are set before starting:
- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET (if Spotify API is used)

Serve behind a reverse proxy (Nginx/Caddy) or expose port 3000 directly.
