'use client';

import { usePathname } from 'next/navigation';
import { Suspense, lazy, useEffect, useState } from 'react';

// Lazy load pro lepší performance
const MatrixRain = lazy(() => import('./backgrounds/MatrixRain'));
const AudioSpectrum = lazy(() => import('./backgrounds/AudioSpectrum'));
const FloatingParticles = lazy(() => import('./backgrounds/FloatingParticles'));
const GridWave = lazy(() => import('./backgrounds/GridWave'));

/**
 * Dynamické animované pozadí podle aktuální sekce
 * Automaticky přepíná mezi různými efekty
 * POUZE v dark mode!
 */
export default function SectionBackground() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detekce dark mode z document class
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Poslech změn dark mode
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Detekce aktuální sekce
  const getCurrentSection = () => {
    if (pathname.startsWith('/apps')) return 'apps';
    if (pathname.startsWith('/games') || pathname.startsWith('/projekty')) return 'games';
    if (pathname.startsWith('/music')) return 'music';
    if (pathname.startsWith('/ai')) return 'ai';
    return null; // Homepage a ostatní stránky bez pozadí
  };

  const section = getCurrentSection();

  // Žádné pozadí pro: homepage, ostatní stránky, LIGHT MODE
  if (!section || !isDark) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <Suspense fallback={null}>
        {section === 'apps' && <GridWave opacity={0.03} color="139, 92, 246" />}
        {section === 'games' && <FloatingParticles opacity={0.04} count={50} color="249, 115, 22" />}
        {section === 'music' && <AudioSpectrum opacity={0.05} barCount={40} color="236, 72, 153" />}
        {section === 'ai' && <MatrixRain opacity={0.03} speed={1} />}
      </Suspense>
    </div>
  );
}
