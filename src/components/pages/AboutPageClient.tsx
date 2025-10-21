'use client';

import { motion } from 'framer-motion';
import { Code2, Gamepad2, Music, Award, Users, Zap, Target } from 'lucide-react';
import { useI18n } from '../../lib/i18n';

export default function AboutPageClient() {
  const { t } = useI18n();

  const skills = [
    { name: t.about.skills.web, icon: Code2, level: 95, color: 'from-violet-500 to-purple-600' },
    { name: t.about.skills.game, icon: Gamepad2, level: 85, color: 'from-orange-500 to-red-600' },
    { name: t.about.skills.music, icon: Music, level: 90, color: 'from-rose-500 to-pink-600' },
  ];

  const achievements = [
    { icon: Award, label: t.about.achievements.projects.label, desc: t.about.achievements.projects.desc },
    { icon: Users, label: t.about.achievements.clients.label, desc: t.about.achievements.clients.desc },
    { icon: Zap, label: t.about.achievements.experience.label, desc: t.about.achievements.experience.desc },
    { icon: Target, label: t.about.achievements.satisfaction.label, desc: t.about.achievements.satisfaction.desc },
  ];

  const timeline = [
    { year: '2020', title: t.about.timeline['2020'].title, desc: t.about.timeline['2020'].desc },
    { year: '2021', title: t.about.timeline['2021'].title, desc: t.about.timeline['2021'].desc },
    { year: '2022', title: t.about.timeline['2022'].title, desc: t.about.timeline['2022'].desc },
    { year: '2023', title: t.about.timeline['2023'].title, desc: t.about.timeline['2023'].desc },
    { year: '2024', title: t.about.timeline['2024'].title, desc: t.about.timeline['2024'].desc },
  ];
  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              {t.about.title}
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            {t.about.blurb}
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-6 rounded-2xl bg-bg-elevated border border-border-subtle text-center hover:border-accent-primary/50 transition-all"
                whileHover={{ y: -4 }}
              >
                <Icon className="w-8 h-8 mx-auto mb-4 text-accent-primary" />
                <div className="text-2xl font-bold text-text-primary mb-1">
                  {achievement.label}
                </div>
                <div className="text-sm text-text-secondary">
                  {achievement.desc}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            Core Skills
          </h2>
          <div className="space-y-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-text-primary" />
                      <span className="font-semibold text-text-primary">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-text-secondary font-medium">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-3 bg-bg-elevated rounded-full overflow-hidden border border-border-subtle">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            Journey
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-primary to-accent-secondary" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary border-4 border-bg-primary" />

                  <div className="p-6 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/50 transition-all">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary text-sm font-bold">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-text-primary">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-text-secondary">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-20"
        >
          <p className="text-text-secondary mb-6">
            Want to work together?
          </p>
          <a href="/contact">
            <motion.button
              className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold hover:shadow-lg hover:shadow-accent-primary/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
