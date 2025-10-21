'use client';

import { motion } from 'framer-motion';
import { Music2, ExternalLink, Headphones, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// All Spotify tracks I worked on
const spotifyTracks = [
  {
    id: "2q72eiBqcJdUC5nnsQ9IZC",
    type: "track",
    title: "Hand2Hand",
    artist: "Indypndnt",
    role: "Produkce, Mix, Master"
  },
  {
    id: "7jffYOLZQOvDpe6WZMHuRz",
    type: "track",
    title: "Bisexualka",
    artist: "Wakka Glxkka",
    role: "Produkce, Mix, Master"
  },
  {
    id: "4892qyZ1bH1b1wpyeAMuiO",
    type: "track",
    title: "Dope",
    artist: "Wakka Glxkka ft. Ripley",
    role: "Mix, Master"
  },
  {
    id: "4qRkxmegEppinrBMQzxkKc",
    type: "track",
    title: "333",
    artist: "Sickkid ft. Yozev",
    role: "Mix, Master"
  },
  {
    id: "7fyd8wEEOYRKUxTfslCo3S",
    type: "track",
    title: "Lingo",
    artist: "itzKORE",
    role: "Rap, Mix, Master"
  },
  {
    id: "2tGV2LL3tRJh9YXJMGX3mh",
    type: "track",
    title: "Rabbithole",
    artist: "Primitiv",
    role: "Produkce, Mix, Master"
  },
  {
    id: "0SHuksH1vOQmodOp71cJtG",
    type: "track",
    title: "Můžou",
    artist: "Primitiv",
    role: "Produkce, Mix, Master"
  },
  {
    id: "6N6vDuesMsBnBPoi3GpBTI",
    type: "track",
    title: "Z paneláku",
    artist: "Wakka Glxkka",
    role: "Mix, Master"
  },
  {
    id: "4clAnNVdcScHVv9evZ90jf",
    type: "track",
    title: "Spit",
    artist: "Primitiv",
    role: "Produkce, Mix, Master"
  },
];

const playlists = [
  {
    title: 'Original Beats',
    description: 'Browse my complete catalog of trap and drill instrumentals',
    trackCount: 21,
    gradient: 'from-rose-500 to-pink-600',
    link: '/music/beats',
    icon: '🎵',
  },
  {
    title: 'Production Services',
    description: 'Professional mixing and mastering for your tracks',
    trackCount: 'Learn More',
    gradient: 'from-pink-500 to-rose-600',
    link: '/music/mix-master',
    icon: '🎚️',
  },
];

export default function PortfolioClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedEmbeds, setFailedEmbeds] = useState<Set<string>>(new Set());
  const itemsPerPage = 3;
  const totalPages = Math.ceil(spotifyTracks.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTracks = spotifyTracks.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

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
            <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 to-fuchsia-600">
              <Music2 className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
              My Work
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Production credits, beats, and collaborations across trap, drill, and hip-hop
          </p>
        </motion.div>

        {/* Carousel with All Spotify Tracks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Headphones className="w-6 h-6 text-violet-500" />
              <h2 className="text-3xl font-bold text-text-primary">Production Credits</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-tertiary">
                {currentIndex + 1} / {totalPages}
              </span>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-bg-elevated border border-border-subtle hover:border-violet-500/50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={totalPages <= 1}
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-bg-elevated border border-border-subtle hover:border-violet-500/50 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={totalPages <= 1}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>

            {/* Tracks Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {visibleTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl overflow-hidden border border-border-subtle bg-bg-elevated hover:border-violet-500/50 transition-all group"
                >
                  {/* Spotify Embed with fallback */}
                  <div className="p-4 pb-3">
                    {!failedEmbeds.has(track.id) ? (
                      <iframe
                        src={`https://open.spotify.com/embed/${track.type}/${track.id}?utm_source=generator&theme=0`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-lg"
                        onError={() => setFailedEmbeds((prev) => new Set(prev).add(track.id))}
                      />
                    ) : (
                      <div className="h-[152px] rounded-lg bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-border-subtle flex flex-col items-center justify-center gap-3 p-4">
                        <Music2 className="w-10 h-10 text-rose-400 opacity-50" />
                        <p className="text-xs text-text-tertiary text-center">
                          Embeds blokovány na localhost
                        </p>
                        <a
                          href={`https://open.spotify.com/${track.type}/${track.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 rounded-lg transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Otevřít na Spotify
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="px-4 pb-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-text-primary truncate">
                          {track.title}
                        </h3>
                        <p className="text-sm text-text-secondary truncate">
                          {track.artist}
                        </p>
                      </div>
                      <a
                        href={`https://open.spotify.com/${track.type}/${track.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-500 hover:text-violet-400 transition-colors flex-shrink-0"
                        aria-label="Open in Spotify"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>

                    <div className="inline-block px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                      <span className="text-xs font-medium text-violet-500">{track.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-violet-500'
                      : 'w-2 bg-border-subtle hover:bg-border-default'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6"
          >
            <div className="text-center p-6 rounded-xl bg-bg-elevated border border-border-subtle">
              <div className="text-3xl font-bold text-violet-500 mb-1">
                {spotifyTracks.length}
              </div>
              <div className="text-sm text-text-secondary">Production Credits</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-bg-elevated border border-border-subtle">
              <div className="text-3xl font-bold text-rose-500 mb-1">21</div>
              <div className="text-sm text-text-secondary">Original Beats</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-bg-elevated border border-border-subtle">
              <div className="text-3xl font-bold text-pink-500 mb-1">5+</div>
              <div className="text-sm text-text-secondary">Years Experience</div>
            </div>
          </motion.div>

          {/* Follow CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-text-secondary mb-4">
              Follow me on Spotify for new releases
            </p>
            <a
              href="https://open.spotify.com/artist/1xayITAmyr4ZLGI72vT3g2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                Follow on Spotify
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        {/* Project Collections with Working Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-text-primary">Browse Collections</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {playlists.map((playlist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="group p-8 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-rose-500/50 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r ${playlist.gradient} text-white text-sm font-semibold mb-4`}>
                  <Music2 className="w-3.5 h-3.5" />
                  {playlist.trackCount}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-text-primary">
                  {playlist.title}
                </h3>
                <p className="text-text-secondary mb-6">
                  {playlist.description}
                </p>
                <Link href={playlist.link}>
                  <motion.button
                    className={`px-6 py-3 rounded-lg bg-gradient-to-r ${playlist.gradient} text-white font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Headphones className="w-4 h-4" />
                    Listen Now
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-center mt-20"
        >
          <div className="p-10 rounded-2xl bg-gradient-to-br from-pink-500/10 to-fuchsia-600/10 border border-pink-500/20">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">
              Want to collaborate?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              I&apos;m always open to new projects and collaborations. Let&apos;s create something amazing together.
            </p>
            <Link href="/contact">
              <motion.button
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
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
