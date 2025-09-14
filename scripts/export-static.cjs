const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function mv(src, dest) {
  try {
    fs.renameSync(src, dest);
    return true;
  } catch {
    try {
      // Fallback: copy then remove
      const stat = fs.statSync(src);
      if (stat.isDirectory()) {
        fs.cpSync(src, dest, { recursive: true });
        fs.rmSync(src, { recursive: true, force: true });
      } else {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
        fs.rmSync(src, { force: true });
      }
      return true;
    } catch {
      return false;
    }
  }
}
function rmrf(p) { try { fs.rmSync(p, { recursive: true, force: true }); } catch {} }
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

const root = process.cwd();
const toDisable = [
  'src/app/api',
  'src/app/robots.ts',
  'src/app/sitemap.ts',
  'src/app/opengraph-image.tsx',
  'src/app/projekty/cybersurvivor/opengraph-image.tsx',
];
const disabledDir = path.join(root, '.export-tmp-disabled');
rmrf(disabledDir);
ensureDir(disabledDir);

// Temporarily move server-only routes out of the tree
for (const rel of toDisable) {
  const abs = path.join(root, rel);
  if (fs.existsSync(abs)) {
    const dest = path.join(disabledDir, rel.replaceAll('/', '__')); // flatten
    ensureDir(path.dirname(dest));
    const ok = mv(abs, dest);
    if (!ok) {
      console.warn('[export-static] WARN: failed to move', rel, '— continuing, export may fail');
    } else {
      console.log('[export-static] moved', rel, '->', path.relative(root, dest));
    }
  }
}

// Sanity check: ensure API directory is absent before building
const apiDir = path.join(root, 'src', 'app', 'api');
if (fs.existsSync(apiDir)) {
  console.error('[export-static] ERROR: src/app/api still present after move. Cannot export static while API routes exist.');
  console.error('Please close any editor/terminal locking files and re-run: npm run build:export');
  process.exit(3);
}

// Build with STATIC_EXPORT=1 (Next 15: output: 'export' handles the static HTML generation during build)
const env = { ...process.env, STATIC_EXPORT: '1' };
let r = spawnSync('npx', ['next', 'build'], { stdio: 'inherit', env, shell: process.platform === 'win32' });
if (r.status !== 0) { console.error('Build failed'); cleanup(); process.exit(r.status || 1); }

// Package to dist-static and add redirects + sitemap
// Resolve export directory: prefer .next/export (some versions), fallback to out/
let outDir = path.join(root, '.next', 'export');
if (!fs.existsSync(outDir)) {
  outDir = path.join(root, 'out');
}
if (!fs.existsSync(outDir)) {
  console.error('[export-static] ERROR: export output not found at .next/export or out/.');
  cleanup();
  process.exit(4);
}
const dist = path.join(root, 'dist-static');
rmrf(dist);
try {
  fs.cpSync(outDir, dist, { recursive: true });
} catch (e) {
  console.error('[export-static] ERROR: failed to copy export to dist-static:', e && e.message);
  cleanup();
  process.exit(5);
}

// Add static redirect /kontakt -> /contact
const kontaktDir = path.join(dist, 'kontakt');
ensureDir(kontaktDir);
const redirectHtml = (to) => `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${to}"><script>location.replace(${JSON.stringify(to)});</script><a href="${to}">Redirect</a>`;
fs.writeFileSync(path.join(kontaktDir, 'index.html'), redirectHtml('/contact/'));

// Add static robots.txt if missing
const robotsPath = path.join(dist, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  fs.writeFileSync(robotsPath, 'User-agent: *\nAllow: /\nSitemap: /sitemap.xml\n');
}

// Generate a simple static sitemap.xml
const urls = [
  '/', '/apps', '/games', '/contact', '/music', '/music/intro', '/music/beats', '/music/mix-master', '/music/portfolio', '/o-mne', '/projekty', '/projekty/cybersurvivor'
];
const today = new Date().toISOString().slice(0,10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>https://itzkore.cz${u.endsWith('/')?u:u+'/'} </loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

console.log('Static export ready at', dist);

cleanup();

function cleanup() {
  // Restore moved items
  for (const rel of toDisable) {
    const src = path.join(disabledDir, rel.replaceAll('/', '__'));
    const dest = path.join(root, rel);
    if (fs.existsSync(src)) {
      ensureDir(path.dirname(dest));
      mv(src, dest);
    }
  }
  rmrf(disabledDir);
}
