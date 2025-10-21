'use client';

import { motion } from 'framer-motion';
import { Brain, Code2, Database, Sparkles, Zap, MessageSquare, Search, GitBranch, Bot, Cpu, FileCode, Blocks } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

const services = [
  {
    id: 'rag',
    icon: Search,
    title: 'RAG Systémy',
    titleEn: 'RAG Systems',
    description: 'Retrieval-Augmented Generation pro inteligentní vyhledávání a zpracování dokumentů',
    descriptionEn: 'Retrieval-Augmented Generation for intelligent search and document processing',
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      { cs: 'Vektorové databáze (Pinecone, Weaviate)', en: 'Vector databases (Pinecone, Weaviate)' },
      { cs: 'Embeddings a semantic search', en: 'Embeddings and semantic search' },
      { cs: 'Indexování velkých dokumentů', en: 'Large document indexing' },
      { cs: 'Context-aware odpovědi', en: 'Context-aware responses' },
    ]
  },
  {
    id: 'ai-agents',
    icon: Bot,
    title: 'AI Agenti',
    titleEn: 'AI Agents',
    description: 'Vývoj inteligentních agentů s Model Context Protocol (MCP)',
    descriptionEn: 'Development of intelligent agents with Model Context Protocol (MCP)',
    gradient: 'from-purple-500 to-pink-500',
    features: [
      { cs: 'GitHub Copilot integrace', en: 'GitHub Copilot integration' },
      { cs: 'Custom MCP servery', en: 'Custom MCP servers' },
      { cs: 'Automatizace workflow', en: 'Workflow automation' },
      { cs: 'Code generation & refactoring', en: 'Code generation & refactoring' },
    ]
  },
  {
    id: 'chatbots',
    icon: MessageSquare,
    title: 'Chatboti & Asistenti',
    titleEn: 'Chatbots & Assistants',
    description: 'Konverzační AI s přirozeným jazykem (NLP)',
    descriptionEn: 'Conversational AI with Natural Language Processing (NLP)',
    gradient: 'from-emerald-500 to-teal-500',
    features: [
      { cs: 'OpenAI GPT-4 integrace', en: 'OpenAI GPT-4 integration' },
      { cs: 'Multi-turn conversations', en: 'Multi-turn conversations' },
      { cs: 'Context memory management', en: 'Context memory management' },
      { cs: 'Custom knowledge base', en: 'Custom knowledge base' },
    ]
  },
  {
    id: 'ml-models',
    icon: Brain,
    title: 'Machine Learning',
    titleEn: 'Machine Learning',
    description: 'Trénování a nasazování ML modelů',
    descriptionEn: 'Training and deploying ML models',
    gradient: 'from-orange-500 to-red-500',
    features: [
      { cs: 'PyTorch & TensorFlow', en: 'PyTorch & TensorFlow' },
      { cs: 'Fine-tuning LLM modelů', en: 'Fine-tuning LLM models' },
      { cs: 'Model optimization', en: 'Model optimization' },
      { cs: 'Cloud deployment (Docker)', en: 'Cloud deployment (Docker)' },
    ]
  },
  {
    id: 'backend',
    icon: Database,
    title: 'Backend Development',
    titleEn: 'Backend Development',
    description: 'API a databázové architektury',
    descriptionEn: 'API and database architectures',
    gradient: 'from-indigo-500 to-blue-500',
    features: [
      { cs: 'Node.js / Python / TypeScript', en: 'Node.js / Python / TypeScript' },
      { cs: 'PostgreSQL / Supabase', en: 'PostgreSQL / Supabase' },
      { cs: 'REST & GraphQL APIs', en: 'REST & GraphQL APIs' },
      { cs: 'Authentication & Security', en: 'Authentication & Security' },
    ]
  },
  {
    id: 'fullstack',
    icon: Code2,
    title: 'Full-Stack Projects',
    titleEn: 'Full-Stack Projects',
    description: 'Kompletní webové aplikace s AI funkcemi',
    descriptionEn: 'Complete web applications with AI features',
    gradient: 'from-violet-500 to-purple-500',
    features: [
      { cs: 'Next.js / React + TypeScript', en: 'Next.js / React + TypeScript' },
      { cs: 'Tailwind CSS / Framer Motion', en: 'Tailwind CSS / Framer Motion' },
      { cs: 'AI-powered features', en: 'AI-powered features' },
      { cs: 'Responsive & modern design', en: 'Responsive & modern design' },
    ]
  },
];

const techStack = [
  { name: 'Python', color: 'text-blue-500' },
  { name: 'TypeScript', color: 'text-cyan-500' },
  { name: 'Node.js', color: 'text-green-500' },
  { name: 'React', color: 'text-blue-400' },
  { name: 'Next.js', color: 'text-white' },
  { name: 'PostgreSQL', color: 'text-blue-600' },
  { name: 'Docker', color: 'text-cyan-400' },
  { name: 'OpenAI API', color: 'text-emerald-500' },
  { name: 'LangChain', color: 'text-purple-500' },
  { name: 'Pinecone', color: 'text-orange-500' },
  { name: 'Supabase', color: 'text-green-400' },
  { name: 'GitHub Copilot', color: 'text-indigo-400' },
];

export default function AIPageClient() {
  const { t, locale } = useI18n();
  const isCzech = locale === 'cs';

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-bg-primary to-purple-500/5 dark:from-blue-950/30 dark:via-bg-primary dark:to-purple-950/30">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgb(59 130 246 / 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(59 130 246 / 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 blur-3xl opacity-50 animate-pulse" />
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 shadow-2xl">
                  <Cpu className="w-16 h-16 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {t.aiPage.hero.title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto mb-12">
              {t.aiPage.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="/contact"
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.aiPage.hero.ctaPrimary}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <a
                href="#services"
                className="px-8 py-4 rounded-xl bg-bg-elevated border border-border-subtle text-text-primary font-semibold hover:border-blue-500/50 hover:bg-bg-secondary transition-all duration-300"
              >
                {t.aiPage.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div id="services" className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t.aiPage.services.title}
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t.aiPage.services.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-6 rounded-2xl bg-bg-elevated border border-border-subtle overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {isCzech ? service.title : service.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                      {isCzech ? service.description : service.descriptionEn}
                    </p>

                    {/* Features list */}
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-text-tertiary">
                          <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          <span>{isCzech ? feature.cs : feature.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t.aiPage.techStack.title}
            </span>
          </h2>
          <p className="text-text-secondary">
            {t.aiPage.techStack.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="group relative"
            >
              <div className="px-6 py-3 rounded-full bg-bg-elevated border border-border-subtle hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg">
                <span className={`font-semibold ${tech.color}`}>
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 p-12 md:p-16 text-center shadow-2xl"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, white 1px, transparent 1px),
                linear-gradient(to bottom, white 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.aiPage.cta.title}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t.aiPage.cta.subtitle}
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {t.aiPage.cta.button}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
