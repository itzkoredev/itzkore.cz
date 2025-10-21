'use client';

import { useState, useEffect } from 'react';
import SplashIntro from './SplashIntro';
import CategoryHub from './CategoryHub';

export default function HomePageClient() {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Always show intro on fresh page load
    // sessionStorage is NOT used - intro shows every time
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Prevent flash of content
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-950" />;
  }

  return (
    <>
      {showIntro ? (
        <SplashIntro onComplete={handleIntroComplete} />
      ) : (
        <CategoryHub />
      )}
    </>
  );
}
