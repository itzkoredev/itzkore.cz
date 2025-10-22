'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../lib/i18n';

interface SplashIntroProps {
  onComplete: () => void;
  progress?: number;
}

export default function SplashIntro({ onComplete, progress: externalProgress }: SplashIntroProps) {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const { locale } = useI18n();

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Use external progress if provided, otherwise auto-animate
    if (externalProgress !== undefined) {
      setProgress(externalProgress);
      if (externalProgress >= 100) {
        setTimeout(() => setShowContent(true), 100);
        setTimeout(() => handleSkip(), 800); // Auto-complete when loaded
      }
      return;
    }

    // Fallback auto-animation
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setShowContent(true), 100);
      }
    };

    requestAnimationFrame(animate);

    // Auto-skip after 3 seconds
    const autoSkip = setTimeout(() => {
      handleSkip();
    }, 3000);

    return () => {
      clearTimeout(autoSkip);
    };
  }, [handleSkip, externalProgress]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSkip]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Minimal animated grid - GPU accelerated */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px),
              linear-gradient(0deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 60%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl w-full">
        {/* Logo - Simple and bold */}
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold mb-8 select-none"
          style={{
            background: 'linear-gradient(135deg, rgb(99, 102, 241) 0%, rgb(139, 92, 246) 50%, rgb(59, 130, 246) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          itzKORE
        </motion.h1>

        {/* Subtitle - Clean typography */}
        <motion.p
          className="text-indigo-300/80 text-sm sm:text-base md:text-lg mb-12 font-light tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {locale === 'cs'
            ? 'Music Producer • Sound Engineer • Developer'
            : 'Music Producer • Sound Engineer • Developer'}
        </motion.p>

        {/* Progress bar - Minimal and sleek, 120Hz optimized */}
        <motion.div
          className="w-full max-w-md mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full"
              style={{
                width: `${progress}%`,
                transform: 'translateZ(0)', // GPU acceleration
                willChange: 'width',
              }}
            />
          </div>
        </motion.div>

        {/* Enter button - Only show when loaded */}
        {showContent && (
          <motion.button
            onClick={handleSkip}
            className="group px-8 py-3 text-sm sm:text-base font-medium rounded-full
                       bg-indigo-600/10 border border-indigo-500/30 text-indigo-300
                       hover:bg-indigo-600/20 hover:border-indigo-500/50
                       active:scale-95
                       transition-all duration-200 ease-out
                       backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'backOut' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              {locale === 'cs' ? 'Vstoupit' : 'Enter'}
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        )}

        {/* Hint text */}
        {showContent && (
          <motion.p
            className="text-white/30 text-xs mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {locale === 'cs' ? 'Stiskni Enter, Escape nebo mezerník' : 'Press Enter, Escape or Space'}
          </motion.p>
        )}
      </div>

      {/* Floating particles - Minimal, GPU-accelerated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`,
              transform: 'translateZ(0)', // GPU acceleration
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
