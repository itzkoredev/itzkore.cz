'use client';

import { motion } from 'framer-motion';
import { Play, Music2, Headphones, Mic2 } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '../../lib/i18n';

export default function MusicDetailContent() {
  const { t } = useI18n();

  const musicCategories = [
    {
      title: t.musicDetail.categories.beats.title,
      description: t.musicDetail.categories.beats.description,
      icon: Play,
      gradient: 'from-pink-500 to-rose-600',
      href: '/music/beats'
    },
    {
      title: t.musicDetail.categories.portfolio.title,
      description: t.musicDetail.categories.portfolio.description,
      icon: Headphones,
      gradient: 'from-rose-400 to-pink-500',
      href: '/music/portfolio'
    },
    {
      title: t.musicDetail.categories.mixmaster.title,
      description: t.musicDetail.categories.mixmaster.description,
      icon: Mic2,
      gradient: 'from-pink-500 to-rose-600',
      href: '/music/mix-master'
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              {t.musicDetail.header}
            </span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.musicDetail.subheader}
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {musicCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={category.href}>
                  <motion.div
                    className="group relative h-64 rounded-2xl bg-bg-elevated border border-border-subtle overflow-hidden hover:border-border-default transition-all cursor-pointer"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                      {/* Icon */}
                      <motion.div
                        className={`mb-6 p-6 rounded-2xl bg-gradient-to-br ${category.gradient}`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </motion.div>

                      {/* Title */}
                      <h3
                        className={`text-2xl font-bold mb-3 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                      >
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-text-secondary">
                        {category.description}
                      </p>

                      {/* Arrow indicator */}
                      <motion.div
                        className="mt-6 text-text-tertiary group-hover:text-accent-primary transition-colors"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.div>
                    </div>

                    {/* Bottom Accent Line */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}
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
