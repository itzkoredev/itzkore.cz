'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code2, Gamepad2, Music, Cpu, Sun, Moon, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useI18n } from '../lib/i18n';

export default function CategoryHub() {
  const [isDark, setIsDark] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const categories = [
    {
      id: 'apps',
      title: t.nav.apps,
      description: t.hero.channels,
      icon: Code2,
      href: '/apps',
      gradient: 'from-violet-500 to-purple-600',
      accentColor: 'rgba(139, 92, 246, 0.1)',
    },
    {
      id: 'games',
      title: t.nav.games,
      description: locale === 'cs' ? 'Interaktivní Zážitky' : 'Interactive Experiences',
      icon: Gamepad2,
      href: '/games',
      gradient: 'from-orange-500 to-red-600',
      accentColor: 'rgba(249, 115, 22, 0.1)',
    },
    {
      id: 'music',
      title: t.nav.music,
      description: locale === 'cs' ? 'Produkce & Sound Design' : 'Production & Sound Design',
      icon: Music,
      href: '/music',
      gradient: 'from-rose-500 to-pink-600',
      accentColor: 'rgba(244, 63, 94, 0.1)',
    },
    {
      id: 'ai',
      title: t.nav.ai,
      description: locale === 'cs' ? 'AI Agenti & Workflow' : 'Agent-Driven Workflow',
      icon: Cpu,
      href: '/ai',
      gradient: 'from-blue-500 to-cyan-500',
      accentColor: 'rgba(59, 130, 246, 0.1)',
    },
  ];

  useEffect(() => {
    // Check initial theme from document
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDark(darkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLocale = () => {
    const newLocale = locale === 'cs' ? 'en' : 'cs';
    setLocale(newLocale);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6 relative">
      {/* Language Toggle - Top Left */}
      <motion.button
        onClick={toggleLocale}
        className="fixed top-6 left-6 z-50 px-4 py-2 rounded-full bg-bg-elevated border border-border-subtle hover:border-accent-primary transition-all flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Globe className="w-4 h-4 text-accent-primary" />
        <span className="text-sm font-semibold text-text-primary">{locale === 'cs' ? '🇨🇿' : '🇬🇧'} {locale.toUpperCase()}</span>
      </motion.button>

      {/* Dark/Light Mode Toggle - Top Right */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-bg-elevated border border-border-subtle hover:border-accent-primary transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-accent-primary" />
        ) : (
          <Moon className="w-5 h-5 text-accent-primary" />
        )}
      </motion.button>

      <div className="max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              itzKORE
            </span>
          </h1>
          <p className="text-text-secondary text-lg md:text-xl">
            {locale === 'cs' ? 'Vyber kategorii k prozkoumání' : 'Select a category to explore'}
          </p>
        </motion.div>

        {/* Categories Grid - 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={category.href}>
                  <motion.div
                    className="relative group h-80 rounded-2xl overflow-hidden cursor-pointer border border-border-subtle"
                    style={{ backgroundColor: category.accentColor }}
                    whileHover={{ scale: 1.02, y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-6">
                      {/* Icon */}
                      <motion.div
                        className={`mb-6 p-4 rounded-2xl bg-gradient-to-br ${category.gradient}`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Title */}
                      <h2
                        className={`text-2xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                      >
                        {category.title}
                      </h2>

                      {/* Description */}
                      <p className="text-text-secondary text-center mb-6 text-sm">
                        {category.description}
                      </p>

                      {/* Enter Button */}
                      <motion.div
                        className={`px-6 py-2 rounded-full bg-gradient-to-r ${category.gradient} text-white font-medium text-sm`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Enter
                      </motion.div>
                    </div>

                    {/* Bottom Accent Line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.2 * index, duration: 0.6 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
