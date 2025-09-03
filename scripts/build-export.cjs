const fs = require('fs');
const path = require('path');

function rmrf(p) { try { fs.rmSync(p, { recursive: true, force: true }); } catch {} }
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function copy(src, dest) { if (fs.existsSync(src)) fs.cpSync(src, dest, { recursive: true }); }

const root = process.cwd();
const outDir = path.join(root, 'out');
const dist = path.join(root, 'dist-static');

rmrf(dist);
if (!fs.existsSync(outDir)) {
  console.error('Missing "out" directory. Did the export step run?');
  process.exit(2);
}
copy(outDir, dist);

// Create static redirect pages to mimic next.config redirects
function makeRedirect(fromPath, toPath) {
  const targetDir = path.join(dist, fromPath.replace(/^\//, ''));
  ensureDir(targetDir);
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=${toPath}"><meta name="robots" content="noindex"><title>Redirecting…</title><script>location.replace(${JSON.stringify(toPath)});</script></head><body><a href="${toPath}">Redirect</a></body></html>`;
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
}

// Known redirects from next.config.mjs
makeRedirect('/kontakt', '/contact/');

fs.writeFileSync(path.join(dist, 'README.txt'), 'Static export for FTP hosting.\n\nUpload ALL files and folders inside this directory to your web root (e.g., public_html).\nMake sure the _next, assets, audio, and covers folders are preserved.');
console.log('Static exported to', dist);
