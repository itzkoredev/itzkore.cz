'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function ContactCTA() {
  const router = useRouter();

  return (
    <section className="py-24 px-6 bg-bg-primary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-primary to-accent-secondary p-12 md:p-16 text-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0"
                 style={{
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s create something amazing together.
              I&apos;m always open to discussing new opportunities and collaborations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/contact')}
                className="px-8 py-4 bg-white text-accent-primary rounded-xl font-semibold text-lg
                         shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                Start a Conversation
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('mailto:contact@itzkore.cz')}
                className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg
                         hover:bg-white hover:text-accent-primary transition-all duration-300 w-full sm:w-auto"
              >
                Email Me
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
