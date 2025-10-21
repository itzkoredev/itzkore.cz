/** @type {import('next').NextConfig} */
const isStatic = process.env.STATIC_EXPORT === '1';
const nextConfig = {
  reactStrictMode: true,
  output: isStatic ? 'export' : 'standalone',
  images: isStatic ? { unoptimized: true } : undefined,

  // Experimentální funkce pro lepší performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Compiler optimalizace
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';
    const scriptSrc = isDev
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:"
      : "script-src 'self' 'unsafe-inline'";
    const connectSrc = isDev
      ? "connect-src 'self' ws: wss: https://api.spotify.com https://open.spotify.com https://*.supabase.co"
      : "connect-src 'self' https://api.spotify.com https://open.spotify.com https://*.supabase.co";
    const imgSrc = "img-src 'self' data: blob: https:";
    const mediaSrc = "media-src 'self' https://dl.dropboxusercontent.com https://*.supabase.co";
    const csp = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      imgSrc,
      "font-src 'self' data:",
      connectSrc,
      mediaSrc,
      "frame-src https://open.spotify.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join('; ');
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/kontakt", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
