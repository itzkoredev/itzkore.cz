const fs = require('fs');
const path = require('path');

function rmrf(p) { try { fs.rmSync(p, { recursive: true, force: true }); } catch {} }
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function copy(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, dest, { recursive: true, force: true });
}

const root = process.cwd();
const dist = path.join(root, 'dist');

rmrf(dist);
ensureDir(dist);

// 1) Copy Next standalone server into dist root
const standaloneDir = path.join(root, '.next', 'standalone');
copy(standaloneDir, dist);

// 2) Copy static assets used by the server
ensureDir(path.join(dist, '.next'));
copy(path.join(root, '.next', 'static'), path.join(dist, '.next', 'static'));

// 3) Public assets
copy(path.join(root, 'public'), path.join(dist, 'public'));

// 4) Convenience start scripts
try { fs.writeFileSync(path.join(dist, 'start.cmd'), '@echo off\r\nnode server.js\r\n'); } catch {}
try { fs.writeFileSync(path.join(dist, 'start.sh'), '#!/usr/bin/env sh\nnode server.js\n'); } catch {}
try {
  fs.writeFileSync(
    path.join(dist, 'README.txt'),
    [
      'Production bundle prepared in this folder.',
      'Run: node server.js',
      'Windows: start.cmd',
      '',
      'Ensure required environment variables are set before starting:',
      '- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY',
      '- SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET (if Spotify API is used)',
      '',
      'Serve behind a reverse proxy (Nginx/Caddy) or expose port 3000 directly.',
      ''
    ].join('\n')
  );
} catch {}

console.log('dist prepared at', dist);
