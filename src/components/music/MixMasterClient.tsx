'use client';

import { motion } from 'framer-motion';
import { Sliders, Zap, Award, Music, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Mixing',
    price: '$50',
    icon: Sliders,
    features: [
      'Professional balance and clarity',
      'EQ and compression',
      'Stereo imaging',
      'Effects processing',
      'Up to 3 revisions',
    ],
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Mastering',
    price: '$30',
    icon: Zap,
    features: [
      'Radio-ready loudness',
      'Final polish and enhancement',
      'Streaming optimization',
      'Multiple format exports',
      '1 revision included',
    ],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Mix + Master',
    price: '$70',
    icon: Award,
    features: [
      'Complete production ready',
      'Full mixing service',
      'Professional mastering',
      'Priority turnaround',
      'Up to 5 revisions',
    ],
    gradient: 'from-violet-500 to-purple-600',
    popular: true,
  },
];

const genres = [
  'Drill',
  'Trap',
  'Hip-Hop',
  'R&B',
  'Rap',
  'UK Drill',
  'Afrobeat',
  'Pop',
];

export default function MixMasterClient() {
  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600">
              <Music className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
              Mix & Master
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Professional mixing and mastering services specialized in drill, trap, and hip-hop
          </p>
        </motion.div>

        {/* Genres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-text-primary">
            Specialized Genres
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {genres.map((genre, index) => (
              <motion.div
                key={genre}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="px-5 py-2 rounded-full bg-bg-elevated border border-border-subtle text-text-primary font-medium"
              >
                {genre}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`relative p-8 rounded-2xl border ${
                  service.popular
                    ? 'border-accent-primary bg-accent-primary/5'
                    : 'border-border-subtle bg-bg-elevated'
                } hover:border-accent-primary/50 transition-all`}
                whileHover={{ y: -8 }}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-bold">
                    POPULAR
                  </div>
                )}

                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-text-primary">
                  {service.title}
                </h3>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-text-primary">
                    {service.price}
                  </span>
                  <span className="text-text-secondary"> /track</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-secondary">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
                    service.popular
                      ? `bg-gradient-to-r ${service.gradient} text-white hover:shadow-lg`
                      : 'bg-bg-secondary border border-border-subtle text-text-primary hover:bg-bg-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Send Files', desc: 'Upload your stems or mixed track' },
              { step: '2', title: 'Discussion', desc: 'Share your vision and references' },
              { step: '3', title: 'Processing', desc: 'Professional mixing/mastering' },
              { step: '4', title: 'Delivery', desc: 'Receive polished final track' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <div className="p-10 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-600/10 border border-pink-500/20">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">
              Ready to elevate your sound?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Let&apos;s make your track sound professional and radio-ready
            </p>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="text-center mt-8"
        >
          <Link href="/music">
            <motion.button
              className="px-8 py-3 rounded-full bg-bg-elevated border border-border-subtle text-text-primary font-medium hover:bg-bg-secondary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Music
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
