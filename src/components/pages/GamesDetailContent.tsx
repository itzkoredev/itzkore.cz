'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const games = [
  {
    title: 'CyberSurvivor',
    description: 'Cyberpunk-themed survivor game s roguelike prvky, procedurálním generováním a intenzivními souboji. Projekt ve vývoji.',
    tech: ['Game Dev', 'Pixel Art', '2D', 'Roguelike'],
    gradient: 'from-cyan-500 to-blue-600',
    image: '/covers/games/cybersurvivor.png',
    status: 'development',
    links: {
      live: '/projekty/cybersurvivor',
      github: null
    }
  }
];

export default function GamesDetailContent() {
  const game = games[0]; // Jediný projekt
  const isInDevelopment = game.status === 'development';

  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Herní projekty
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Herní vývoj a interaktivní zážitky
          </p>
        </motion.div>

        {/* CyberSurvivor Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative bg-bg-elevated rounded-2xl border border-border-subtle overflow-hidden hover:border-border-default transition-all duration-300"
        >
          {/* Image */}
          <div className="relative h-80 bg-bg-secondary">
            <Image
              src={game.image}
              alt={game.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-orange-500">
                  FEATURED PROJECT
                </span>
              </div>

              {isInDevelopment && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  🔨 Ve vývoji
                </span>
              )}
            </div>

            <h2 className="text-3xl font-bold mb-4 text-text-primary group-hover:text-accent-hover transition-colors">
              {game.title}
            </h2>
            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              {game.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {game.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm rounded-lg bg-bg-secondary text-text-secondary border border-border-subtle"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Link */}
            <Link href={game.links.live}>
              <motion.button
                className={`w-full px-6 py-4 rounded-lg bg-gradient-to-r ${game.gradient} text-white font-medium flex items-center justify-center gap-2 shadow-lg`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-5 h-5" />
                Zobrazit detail projektu
              </motion.button>
            </Link>
          </div>

          {/* Hover Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
          />
        </motion.div>
      </div>
    </div>
  );
}
