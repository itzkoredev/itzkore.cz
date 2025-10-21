"use client";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Vote } from "lucide-react";
import { useI18n } from "../../lib/i18n";

export default function AppsPageClient() {
  const { t } = useI18n();

  const apps = [
    {
      id: 'volby2025',
      title: t.apps.volby2025.title,
      description: t.apps.volby2025.description,
      href: 'https://itzkore.cz/volby2025',
      icon: Vote,
      gradient: 'from-blue-500 to-cyan-500',
      status: 'live' as const,
      tags: ['React', 'TypeScript', 'Web App']
    },
    {
      id: 'crossit',
      title: t.apps.crossit.title,
      description: t.apps.crossit.description,
      href: null,
      icon: Sparkles,
      gradient: 'from-violet-500 to-purple-500',
      status: 'development' as const,
      tags: ['Next.js', 'AI', 'Generator']
    },
  ];

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
            <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
              {t.apps.title}
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.apps.subtitle}
          </p>
        </motion.div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group relative"
            >
              {app.href ? (
                <a
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <AppCard app={app} />
                </a>
              ) : (
                <div className="cursor-not-allowed">
                  <AppCard app={app} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppCard({ app }: { app: { id: string; title: string; description: string; href: string | null; icon: any; gradient: string; status: 'live' | 'development'; tags: string[] } }) {
  const { t } = useI18n();
  const Icon = app.icon;
  const isLive = app.status === 'live';

  return (
    <div className="relative h-full p-6 rounded-2xl bg-bg-elevated border border-border-subtle overflow-hidden transition-all duration-300 hover:border-border-default group-hover:shadow-xl">
      {/* Gradient glow on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${app.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

      {/* Icon */}
      <div className="relative mb-4 flex items-center justify-between">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${app.gradient} bg-opacity-10`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Status badge */}
        <span className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${isLive
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
          }
        `}>
          {isLive ? t.apps.statusLive : t.apps.statusDev}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-3 text-text-primary group-hover:text-accent-hover transition-colors">
        {app.title}
        {isLive && (
          <ExternalLink className="inline-block w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </h3>

      <p className="text-text-secondary text-sm mb-4 leading-relaxed">
        {app.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {app.tags.filter(tag => tag.trim()).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-md bg-bg-secondary text-text-primary text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
