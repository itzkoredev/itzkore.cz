'use client';

import { motion } from 'framer-motion';
import { Gamepad2, ArrowRight, Target, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../lib/i18n';

export default function GamesPageIntro() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const gamesIntro = t.gamesIntro;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center">
          <Link href="/">
            <motion.div
              className="text-2xl font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                itzKORE
              </span>
            </motion.div>
          </Link>
          <div className="flex gap-6">
            <Link href="/apps">
              <motion.span
                className="text-sm text-text-secondary hover:text-text-primary cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Apps
              </motion.span>
            </Link>
            <Link href="/music">
              <motion.span
                className="text-sm text-text-secondary hover:text-text-primary cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Music
              </motion.span>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-5xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              {/* Icon */}
              <motion.div
                className="inline-block mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl shadow-orange-500/50">
                  <Gamepad2 className="w-16 h-16" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-orange-300 via-red-300 to-rose-300 bg-clip-text text-transparent">
                  {gamesIntro.title}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {gamesIntro.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <a href="#projects">
                  <motion.button
                    className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-3 mx-auto"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {gamesIntro.cta}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[
                { icon: Target, title: gamesIntro.features.genre.title, desc: gamesIntro.features.genre.desc },
                { icon: Trophy, title: gamesIntro.features.independent.title, desc: gamesIntro.features.independent.desc },
                { icon: Sparkles, title: gamesIntro.features.engaging.title, desc: gamesIntro.features.engaging.desc },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                <motion.div
                  key={i}
                    className="p-6 rounded-xl bg-bg-elevated border border-border-subtle hover:border-border-default hover:bg-bg-secondary transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Icon className="w-8 h-8 mb-4 text-orange-400" />
                    <h3 className="text-lg font-semibold mb-2 text-text-primary">{feature.title}</h3>
                    <p className="text-text-secondary text-sm">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
