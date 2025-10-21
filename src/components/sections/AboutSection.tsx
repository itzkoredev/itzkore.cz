'use client';

import { motion } from 'framer-motion';

const stats = [
  { label: 'Projects Delivered', value: '50+' },
  { label: 'Years Experience', value: '5+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Client Satisfaction', value: '100%' },
];

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              About Me
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed mb-6">
              I&apos;m a passionate developer specializing in creating modern web applications,
              interactive experiences, and digital products. With expertise in full-stack
              development and a keen eye for design, I bring ideas to life.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              My work spans from music production tools to game development, always
              pushing the boundaries of what&apos;s possible on the web.
            </p>
          </motion.div>

          {/* Right: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="p-6 bg-bg-elevated rounded-2xl border border-border-subtle shadow-md
                         hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary
                               bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
