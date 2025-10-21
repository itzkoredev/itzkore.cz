'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const projects = [
  {
    title: 'CyberSurvivor',
    description: 'Pixel art roguelike game with procedural generation and intense combat',
    category: 'Game Development',
    image: '/covers/games/cybersurvivor.png',
    link: '/projekty/cybersurvivor',
    tags: ['Godot', 'Pixel Art', 'Roguelike'],
  },
  {
    title: 'Music Production Suite',
    description: 'Complete music portfolio with beats, mixes, and production showcase',
    category: 'Music & Audio',
    image: null,
    link: '/music/portfolio',
    tags: ['Audio', 'Production', 'Mix & Master'],
  },
  {
    title: 'Web Applications',
    description: 'Modern web apps and tools built with cutting-edge technology',
    category: 'Web Development',
    image: null,
    link: '/apps',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
];

export default function FeaturedProjects() {
  const router = useRouter();

  return (
    <section className="py-24 px-6 bg-bg-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A selection of my recent work across game development, music production, and web applications
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              onClick={() => router.push(project.link)}
              className="group cursor-pointer bg-bg-elevated rounded-2xl border border-border-subtle
                       shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              {project.image ? (
                <div className="relative h-48 bg-bg-secondary overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-accent-light to-accent-secondary/10
                               flex items-center justify-center">
                  <span className="text-accent-primary text-4xl font-bold opacity-20">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="text-xs text-accent-primary font-semibold mb-2 uppercase tracking-wide">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-bg-secondary rounded-lg text-xs font-medium text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/projekty')}
            className="px-8 py-4 border-2 border-border-default text-text-primary rounded-xl font-semibold
                     hover:border-accent-primary hover:text-accent-primary
                     transition-all duration-300 inline-flex items-center gap-2"
          >
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
