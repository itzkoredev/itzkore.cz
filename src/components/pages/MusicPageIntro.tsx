'use client';

import { motion } from 'framer-motion';
import { Music, ArrowRight, Waves, Mic2, Headphones } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../lib/i18n';

export default function MusicPageIntro() {
  const router = useRouter();
  const { t, locale } = useI18n();

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
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
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
            <Link href="/games">
              <motion.span
                className="text-sm text-text-secondary hover:text-text-primary cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                Games
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
                <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-2xl shadow-rose-500/50">
                  <Music className="w-16 h-16" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {t.musicIntro.title}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {t.musicIntro.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <a href="#music-content">
                  <motion.button
                    className="group px-10 py-5 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 flex items-center gap-3 mx-auto"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t.musicIntro.cta}
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
                { icon: Waves, title: t.musicIntro.features.production.title, desc: t.musicIntro.features.production.desc },
                { icon: Mic2, title: t.musicIntro.features.mixing.title, desc: t.musicIntro.features.mixing.desc },
                { icon: Headphones, title: t.musicIntro.features.mastering.title, desc: t.musicIntro.features.mastering.desc },
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
                    <Icon className="w-8 h-8 mb-4 text-rose-400" />
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
