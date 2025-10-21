'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Python', category: 'Language' },
  { name: 'GSAP', category: 'Animation' },
  { name: 'Framer Motion', category: 'Animation' },
  { name: 'Godot', category: 'Game Dev' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Git', category: 'Tools' },
  { name: 'Figma', category: 'Design' },
];

export default function SkillsSection() {
  return (
    <section className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Modern tech stack for building exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="p-4 bg-bg-elevated rounded-xl border border-border-subtle
                       shadow-sm hover:shadow-md transition-all duration-300 text-center group"
            >
              <div className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                {skill.name}
              </div>
              <div className="text-xs text-text-tertiary mt-1">
                {skill.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
