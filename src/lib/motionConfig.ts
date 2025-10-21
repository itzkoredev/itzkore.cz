/**
 * Optimalizované Framer Motion konfigurace pro vysokofrekvenční displeje
 * iPhone Pro má 120Hz ProMotion, moderní Androidy 90-165Hz
 */

// Detekce high refresh rate
export const isHighRefreshRate = () => {
  if (typeof window === 'undefined') return false;

  // Detekce pomocí matchMedia (Safari iOS)
  const highRefresh = window.matchMedia('(min-resolution: 120dpi)').matches;

  // Fallback na user agent pro iOS devices
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isModernIOS = isIOS && 'ontouchstart' in window;

  return highRefresh || isModernIOS;
};

// Detekce reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimalizované spring konfigurace
export const springConfigs = {
  // Ultra smooth pro 120Hz+ (iPhone-like)
  ultraSmooth: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.5,
  },

  // Smooth pro standardní interakce
  smooth: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },

  // Bouncy pro playful animace
  bouncy: {
    type: "spring" as const,
    stiffness: 500,
    damping: 25,
    mass: 0.6,
  },

  // Gentle pro subtle animace
  gentle: {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  },
};

// Easing funkce pro non-spring animace
export const easings = {
  // iOS-style easing (acceleration curve)
  ios: [0.4, 0.0, 0.2, 1],

  // Material Design easing
  material: [0.4, 0.0, 0.2, 1],

  // Smooth in-out
  smoothInOut: [0.45, 0, 0.55, 1],

  // Quick out slow in (pro zavírání)
  quickOut: [0.0, 0.0, 0.2, 1],
};

// Optimalizované transition konfigurace
export const getOptimizedTransition = (type: 'fast' | 'normal' | 'slow' = 'normal') => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 };
  }

  const isHighRefresh = isHighRefreshRate();

  const durations = {
    fast: isHighRefresh ? 0.2 : 0.15,
    normal: isHighRefresh ? 0.3 : 0.25,
    slow: isHighRefresh ? 0.5 : 0.4,
  };

  return {
    duration: durations[type],
    ease: easings.ios,
  };
};

// Viewport konfigurace pro lazy animace
export const viewportConfig = {
  once: true, // Animovat jen jednou pro lepší performance
  amount: 0.2, // Spustit když 20% je viditelné
  margin: "0px 0px -100px 0px", // Trigger trochu dříve
};

// Preset animace pro běžné use cases
export const animations = {
  // Fade in
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: getOptimizedTransition('fast'),
  },

  // Slide up fade in
  slideUpFadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: getOptimizedTransition('normal'),
  },

  // Scale fade in
  scaleFadeIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: getOptimizedTransition('normal'),
  },

  // Slide from left
  slideFromLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: getOptimizedTransition('normal'),
  },

  // Slide from right
  slideFromRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: getOptimizedTransition('normal'),
  },
};

// Stagger konfigurace pro sekvence
export const getStaggerConfig = (itemCount: number) => {
  const isHighRefresh = isHighRefreshRate();
  const baseDelay = isHighRefresh ? 0.05 : 0.08;

  return {
    staggerChildren: baseDelay,
    delayChildren: isHighRefresh ? 0.1 : 0.15,
  };
};

// Hover/tap animace pro interaktivní elementy
export const interactionAnimations = {
  // Tlačítka
  button: {
    whileHover: { scale: 1.02, transition: springConfigs.smooth },
    whileTap: { scale: 0.98, transition: springConfigs.smooth },
  },

  // Karty
  card: {
    whileHover: { y: -4, transition: springConfigs.gentle },
    whileTap: { scale: 0.98, transition: springConfigs.smooth },
  },

  // Ikony
  icon: {
    whileHover: { scale: 1.1, rotate: 5, transition: springConfigs.bouncy },
    whileTap: { scale: 0.9, transition: springConfigs.smooth },
  },

  // Linky
  link: {
    whileHover: { x: 4, transition: springConfigs.smooth },
  },
};
