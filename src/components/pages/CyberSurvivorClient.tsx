'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Gamepad2, Zap, Target, Trophy } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export default function CyberSurvivorClient() {
  const { t } = useI18n();

  const features = [
    {
      icon: Gamepad2,
      title: t.cybersurvivor.features.roguelike.title,
      description: t.cybersurvivor.features.roguelike.description
    },
    {
      icon: Zap,
      title: t.cybersurvivor.features.combat.title,
      description: t.cybersurvivor.features.combat.description
    },
    {
      icon: Target,
      title: t.cybersurvivor.features.upgrades.title,
      description: t.cybersurvivor.features.upgrades.description
    },
    {
      icon: Trophy,
      title: t.cybersurvivor.features.theme.title,
      description: t.cybersurvivor.features.theme.description
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Hero Section */}
      <div className="relative">
        {/* Subtle orange/red gradient for games section */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-orange-500/5 pointer-events-none" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/games">
              <motion.button
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-elevated backdrop-blur-sm border border-border-subtle hover:bg-bg-secondary transition-all"
                whileHover={{ x: -4 }}
              >
                <ArrowLeft className="w-4 h-4" />
                {t.cybersurvivor.backToGames}
              </motion.button>
            </Link>
          </motion.div>

          {/* Title & Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/50 mb-6">
                <span className="text-orange-400 font-semibold text-sm">
                  {t.cybersurvivor.featured}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                  CyberSurvivor
                </span>
              </h1>

              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                {t.cybersurvivor.tagline}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {t.cybersurvivor.techStack.map((tech: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-bg-elevated border border-border-subtle text-sm font-medium text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <motion.button
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.cybersurvivor.playDemo}
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-lg bg-bg-elevated border border-border-default text-text-primary font-semibold hover:bg-bg-secondary transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.cybersurvivor.viewCode}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-video rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-2xl shadow-orange-500/20"
            >
              <Image
                src="/covers/games/cybersurvivor.png"
                alt="CyberSurvivor"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">{t.cybersurvivor.keyFeatures}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-6 rounded-xl bg-bg-elevated border border-border-subtle hover:border-border-default transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <Icon className="w-10 h-10 mb-4 text-orange-500" />
                    <h3 className="text-lg font-bold mb-2 text-text-primary">{feature.title}</h3>
                    <p className="text-text-secondary text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Gameplay Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-10 rounded-2xl bg-bg-elevated border border-border-subtle">
              <h2 className="text-3xl font-bold mb-6 text-text-primary">{t.cybersurvivor.about.title}</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>{t.cybersurvivor.about.p1}</p>
                <p>{t.cybersurvivor.about.p2}</p>
                <p>{t.cybersurvivor.about.p3_polished}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
