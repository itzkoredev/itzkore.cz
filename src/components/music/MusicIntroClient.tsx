'use client';

import { motion } from 'framer-motion';
import { Music, Sparkles, Headphones, Zap } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';

export default function MusicIntroClient() {
  const { t } = useI18n();

  const features = [
    {
      icon: Music,
      title: t.musicIntro.features.original.title,
      description: t.musicIntro.features.original.description,
    },
    {
      icon: Sparkles,
      title: t.musicIntro.features.versatile.title,
      description: t.musicIntro.features.versatile.description,
    },
    {
      icon: Headphones,
      title: t.musicIntro.features.quality.title,
      description: t.musicIntro.features.quality.description,
    },
    {
      icon: Zap,
      title: t.musicIntro.features.turnaround.title,
      description: t.musicIntro.features.turnaround.description,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
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

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              {t.musicIntro.heading}
            </span>
          </h1>

          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            {t.musicIntro.description}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/music/beats">
              <motion.button
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold hover:shadow-2xl hover:shadow-rose-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.musicIntro.browseBeats}
              </motion.button>
            </Link>
            <Link href="/music/portfolio">
              <motion.button
                className="px-8 py-4 rounded-lg bg-bg-elevated border border-border-subtle font-semibold hover:bg-bg-secondary transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.musicIntro.viewPortfolio}
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-6 rounded-xl bg-bg-elevated backdrop-blur-sm border border-border-subtle hover:bg-bg-secondary transition-all"
                whileHover={{ y: -4 }}
              >
                <Icon className="w-10 h-10 mb-4 text-rose-400" />
                <h3 className="text-lg font-bold mb-2 text-text-primary">{feature.title}</h3>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-center mb-10 text-text-primary">{t.musicIntro.whatIOffer}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Beat Production */}
            <div className="p-8 rounded-2xl bg-bg-elevated backdrop-blur-sm border border-border-subtle">
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t.musicIntro.beatProduction.title}</h3>
              <p className="text-text-secondary mb-4">
                {t.musicIntro.beatProduction.description}
              </p>
              <Link href="/music/beats">
                <motion.button
                  className="text-rose-400 font-semibold hover:text-rose-300 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {t.musicIntro.beatProduction.cta} →
                </motion.button>
              </Link>
            </div>

            {/* Mix & Master */}
            <div className="p-8 rounded-2xl bg-bg-elevated backdrop-blur-sm border border-border-subtle">
              <h3 className="text-2xl font-bold mb-4 text-text-primary">{t.musicIntro.mixMaster.title}</h3>
              <p className="text-text-secondary mb-4">
                {t.musicIntro.mixMaster.description}
              </p>
              <Link href="/music/mix-master">
                <motion.button
                  className="text-rose-400 font-semibold hover:text-rose-300 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {t.musicIntro.mixMaster.cta} →
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <Link href="/music">
            <motion.button
              className="px-8 py-3 rounded-full bg-bg-elevated border border-border-subtle text-text-primary font-medium hover:bg-bg-secondary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.musicIntro.backButton}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
