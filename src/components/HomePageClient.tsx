'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SplashIntro from './SplashIntro';

// Lazy load heavy components
const CategoryHub = dynamic(() => import('./CategoryHub'), {
  loading: () => null,
});

export default function HomePageClient() {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Simulate loading stages
    const stages = [
      { progress: 20, delay: 100 },  // Fonts loaded
      { progress: 40, delay: 200 },  // CSS loaded
      { progress: 60, delay: 300 },  // Components loading
      { progress: 80, delay: 400 },  // Almost ready
      { progress: 100, delay: 500 }, // Ready
    ];

    stages.forEach(({ progress, delay }) => {
      setTimeout(() => setLoadProgress(progress), delay);
    });

    // Check if user has seen intro this session
    const hasSeenIntro = sessionStorage.getItem('itzkore-intro-seen');
    if (hasSeenIntro) {
      // Skip intro but still show brief loading
      setTimeout(() => setShowIntro(false), 600);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('itzkore-intro-seen', 'true');
  };

  // Show intro/loading while mounting
  if (!mounted || showIntro) {
    return <SplashIntro onComplete={handleIntroComplete} progress={loadProgress} />;
  }

  return <CategoryHub />;
}
