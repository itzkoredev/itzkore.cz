'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Vote, Sparkles } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'Volby 2025 - Volební kalkulačka',
    description: 'Interaktivní volební kalkulačka pro parlamentní volby 2025. Vyplň své politické postoje a zjisti, která strana ti sedí nejlépe.',
    tech: ['React', 'TypeScript', 'Web App'],
    gradient: 'from-blue-500 to-cyan-500',
    icon: Vote,
    status: 'live',
    links: {
      live: 'https://itzkore.cz/volby2025',
      github: null
    }
  },
  {
    title: 'CrossIt - Generátor křižovek',
    description: 'AI-powered generátor křížovek s vlastními slovy a definicemi. Vytvoř si vlastní křížovky pro školu, zábavu nebo trénink paměti.',
    tech: ['Next.js', 'AI', 'Generator'],
    gradient: 'from-violet-500 to-purple-500',
    icon: Sparkles,
    status: 'development',
    links: {
      live: null,
      github: null
    }
  }
];

export default function AppsDetailContent() {
  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              Aplikace
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Webové aplikace a nástroje, které jsem vytvořil
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isLive = project.status === 'live';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-bg-elevated rounded-2xl border border-border-subtle overflow-hidden hover:border-border-default transition-all duration-300"
                whileHover={{ y: -8 }}
              >
                {/* Content */}
                <div className="p-6">
                  {/* Icon and Status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${project.gradient} bg-opacity-10`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${isLive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }
                    `}>
                      {isLive ? '🟢 Live' : '🔨 Ve vývoji'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-accent-hover transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.filter(tech => tech.trim()).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-md bg-bg-secondary text-gray-700 dark:text-gray-300 text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.links.live && (
                    <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        className={`w-full px-4 py-3 rounded-lg bg-gradient-to-r ${project.gradient} text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Otevřít aplikaci
                      </motion.button>
                    </Link>
                  )}
                  {!project.links.live && (
                    <div className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border-subtle text-text-tertiary text-sm font-medium text-center cursor-not-allowed">
                      Brzy k dispozici
                    </div>
                  )}
                </div>

                {/* Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
