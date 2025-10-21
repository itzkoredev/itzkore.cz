'use client';

import { motion } from 'framer-motion';
import { Play, Download, Heart, Music } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const beats = [
  {
    id: 1,
    title: 'Neon Nights',
    genre: 'Trap',
    bpm: 140,
    key: 'Am',
    duration: '3:24',
    price: '$29',
    tags: ['Dark', 'Hard', '808'],
    audioUrl: '#', // Replace with actual audio URL
  },
  {
    id: 2,
    title: 'Street Dreams',
    genre: 'Drill',
    bpm: 145,
    key: 'Dm',
    duration: '2:58',
    price: '$29',
    tags: ['UK Drill', 'Aggressive', 'Heavy'],
    audioUrl: '#',
  },
  {
    id: 3,
    title: 'Cloud Nine',
    genre: 'Hip-Hop',
    bpm: 85,
    key: 'C',
    duration: '3:45',
    price: '$24',
    tags: ['Chill', 'Melodic', 'Smooth'],
    audioUrl: '#',
  },
  {
    id: 4,
    title: 'Cyber Rush',
    genre: 'Trap',
    bpm: 150,
    key: 'F#m',
    duration: '3:12',
    price: '$29',
    tags: ['Futuristic', 'Fast', 'Energy'],
    audioUrl: '#',
  },
  {
    id: 5,
    title: 'Midnight Ride',
    genre: 'Drill',
    bpm: 140,
    key: 'Gm',
    duration: '3:01',
    price: '$29',
    tags: ['Dark', 'Bass Heavy', 'Minimal'],
    audioUrl: '#',
  },
  {
    id: 6,
    title: 'Golden Hour',
    genre: 'R&B',
    bpm: 75,
    key: 'D',
    duration: '4:15',
    price: '$24',
    tags: ['Soul', 'Warm', 'Vocal'],
    audioUrl: '#',
  },
];

export default function BeatsClient() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [likedBeats, setLikedBeats] = useState<Set<number>>(new Set());

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedBeats);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedBeats(newLiked);
  };

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
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600">
              <Music className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Browse Beats
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Original instrumentals ready for your next project
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {['All', 'Trap', 'Drill', 'Hip-Hop', 'R&B'].map((filter) => (
            <motion.button
              key={filter}
              className="px-6 py-2 rounded-full bg-bg-elevated border border-border-subtle text-text-primary hover:border-accent-primary hover:text-accent-primary transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Beats List */}
        <div className="space-y-4">
          {beats.map((beat, index) => (
            <motion.div
              key={beat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="group p-6 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/50 transition-all"
            >
              <div className="flex items-center gap-6">
                {/* Play Button */}
                <motion.button
                  onClick={() => togglePlay(beat.id)}
                  className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    playingId === beat.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600'
                      : 'bg-bg-secondary border border-border-subtle hover:border-accent-primary'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Play className="w-6 h-6 text-white fill-white" />
                </motion.button>

                {/* Beat Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    {beat.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-text-secondary">
                    <span>{beat.genre}</span>
                    <span>•</span>
                    <span>{beat.bpm} BPM</span>
                    <span>•</span>
                    <span>Key: {beat.key}</span>
                    <span>•</span>
                    <span>{beat.duration}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {beat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-bg-secondary text-text-tertiary text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() => toggleLike(beat.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      likedBeats.has(beat.id)
                        ? 'text-rose-500'
                        : 'text-text-tertiary hover:text-rose-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`w-5 h-5 ${likedBeats.has(beat.id) ? 'fill-current' : ''}`}
                    />
                  </motion.button>

                  <div className="text-right mr-4">
                    <div className="text-2xl font-bold text-text-primary">
                      {beat.price}
                    </div>
                  </div>

                  <motion.button
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    Buy
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary mb-4">
            Need a custom beat?
          </p>
          <Link href="/contact">
            <motion.button
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact for Custom Work
            </motion.button>
          </Link>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
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
