'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ViewTransition wrapper pro plynulé přechody mezi stránkami
 * Řeší problém s bílou obrazovkou při přepínání
 */
export default function ViewTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    // Fade out aktuální obsah
    setIsTransitioning(true);

    // Po fade out aktualizovat obsah
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
      // Smooth scroll nahoru
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150); // Krátký delay pro plynulý přechod

    return () => clearTimeout(timer);
  }, [pathname, children]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        {displayChildren}
      </motion.div>
    </AnimatePresence>
  );
}
