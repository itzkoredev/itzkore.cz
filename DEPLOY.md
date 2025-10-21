# Deploy Guide - itzkore.cz

## 🚀 Quick Deploy to Forpsi

### Prerequisites
- Node.js 18+ installed
- npm installed
- Forpsi FTP access credentials

### Build Static Export

```bash
# 1. Install dependencies
npm install

# 2. Build static export
npm run build:export
```

This will create a `dist-static` folder with all static files.

### Deploy to Forpsi

1. **Connect to Forpsi via FTP**
   - Host: `ftp.itzkore.cz`
   - Username: Your Forpsi username
   - Password: Your Forpsi password

2. **Upload Files**
   - Upload entire contents of `dist-static` folder to `/www` or `/public_html`
   - Make sure all files and folders are transferred
   - Ensure `.htaccess` is uploaded if present

3. **Verify Deployment**
   - Visit https://itzkore.cz
   - Test all navigation
   - Check mobile responsiveness
   - Verify all assets load correctly

### File Structure

```
dist-static/
├── index.html          # Homepage
├── _next/              # Next.js assets (CSS, JS, images)
├── assets/             # Static assets
├── covers/             # Game/project covers
├── data/               # JSON data files
├── apps/               # Apps section
├── games/              # Games section
├── music/              # Music section
├── ai/                 # AI section
├── kontakt/            # Contact page (Czech)
├── contact/            # Contact page (English)
└── projekty/           # Projects (CyberSurvivor)
```

### Performance Optimizations

✅ **120Hz Mobile Optimized**
- GPU-accelerated animations (`transform: translateZ(0)`)
- `willChange` hints for smooth animations
- Minimal DOM operations
- RequestAnimationFrame for smooth progress

✅ **Static Export**
- No server-side rendering required
- Fast CDN delivery
- Pre-rendered HTML pages
- Optimized assets

✅ **Loading Performance**
- Auto-skip splash after 3s
- Fast 1.5s loading animation
- Minimal JavaScript bundle
- Lazy-loaded images

### Troubleshooting

**Issue: Splash screen lags on mobile**
- ✅ FIXED: New minimalist design with GPU acceleration
- Uses `transform: translateZ(0)` for hardware acceleration
- Reduced particle count from 15 to 8
- Removed heavy canvas animations (matrix, lightning)

**Issue: Pages not loading on navigation**
- Check `.htaccess` configuration for SPA routing
- Ensure all static assets are uploaded
- Clear browser cache

**Issue: 404 errors**
- Verify all HTML files are in correct directories
- Check case sensitivity in URLs
- Ensure index.html exists in each route folder

### Environment Variables

Create `.env.local` for development:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

**Note:** Static export doesn't use server-side env vars.

### Build Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run build:export` - Static export for Forpsi
- `npm run build:dist` - Build + dist folder preparation

### Support

For issues or questions:
- GitHub: https://github.com/itzkore/itzkore.cz
- Email: contact@itzkore.cz

---

**Last Updated:** October 20, 2025
**Version:** 1.0.0
**Build:** Static Export
