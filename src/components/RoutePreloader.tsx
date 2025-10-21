'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Inteligentní preloader pro Next.js route
 * Preloaduje pravděpodobné další stránky podle aktuální pozice
 */
export default function RoutePreloader() {
  const pathname = usePathname();

  useEffect(() => {
    // Preload strategicky důležité route podle aktuální stránky
    const preloadRoutes = () => {
      const routes: string[] = [];

      // Homepage -> preload kategorie
      if (pathname === '/') {
        routes.push('/apps', '/games', '/music', '/ai');
      }
      // Apps -> preload detail, ostatní kategorie
      else if (pathname === '/apps') {
        routes.push('/', '/games', '/music');
      }
      // Games -> preload CyberSurvivor detail
      else if (pathname === '/games') {
        routes.push('/projekty/cybersurvivor', '/apps', '/music');
      }
      // Music -> preload sub-pages
      else if (pathname === '/music') {
        routes.push('/music/beats', '/music/portfolio', '/music/intro', '/music/mix-master');
      }
      // Music sub-pages -> preload ostatní music pages
      else if (pathname.startsWith('/music/')) {
        routes.push('/music', '/music/beats', '/music/portfolio');
      }
      // AI section
      else if (pathname === '/ai') {
        routes.push('/', '/apps');
      }
      // Project detail -> preload zpět na kategorii
      else if (pathname.startsWith('/projekty/')) {
        routes.push('/games', '/');
      }

      // Preload pomocí link rel="prefetch"
      routes.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        link.as = 'document';

        // Kontrola, zda link už neexistuje
        const existing = document.querySelector(`link[href="${route}"][rel="prefetch"]`);
        if (!existing) {
          document.head.appendChild(link);
        }
      });
    };

    // Delay preload, aby nezpomaloval initial render
    const timer = setTimeout(preloadRoutes, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
