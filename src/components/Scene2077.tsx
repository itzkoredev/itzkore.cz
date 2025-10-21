'use client';

import { useEffect, useState } from 'react';

export default function Scene2077() {
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

  // Pouze v dark mode!
  if (!isDark) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Main gradient background - lowest layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] to-black opacity-90" />

      {/* FX effects - middle layer (visible above background) */}
      <div className="absolute inset-0 bg-neon-spots opacity-50 mix-blend-screen" />
      <div className="scanlines absolute inset-0 opacity-20" />

      {/* Grid pattern - top layer (most visible) */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Vignette - final overlay */}
      <div className="vignette absolute inset-0 opacity-60" />
    </div>
  );
}
