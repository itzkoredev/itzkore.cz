'use client';

import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../../lib/i18n';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/itzkoredev', color: 'hover:text-gray-900 dark:hover:text-gray-100' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/david-vrba-0860a918b/', color: 'hover:text-blue-600' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/itzkore_', color: 'hover:text-pink-600' },
];

export default function ContactPageClient() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => { setFormData({ name: '', email: '', subject: '', message: '' }); setStatus('idle'); }, 3000);
  };

  return (
    <div className="min-h-screen bg-bg-primary py-20 px-6">
      <div className="max-w-6xl mx-auto">
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
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary">
              <Mail className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              {t.contact.title}
            </span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t.contact.blurb}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition-all"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition-all"
                  placeholder={t.contact.form.emailPlaceholder}
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                  {t.contact.form.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition-all"
                  placeholder={t.contact.form.subjectPlaceholder}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 outline-none transition-all resize-none"
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              >
                {status === 'sending' && t.contact.form.sending}
                {status === 'success' && t.contact.form.success}
                {status === 'idle' && (
                  <>
                    {t.contact.form.submit}
                    <Send className="w-4 h-4" />
                  </>
                )}
                {status === 'error' && t.contact.form.error}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div className="p-8 rounded-2xl bg-bg-elevated border border-border-subtle">
              <h3 className="text-xl font-bold mb-4 text-text-primary">
                {t.contact.direct.title}
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:K9Skore@gmail.com"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>K9Skore@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-8 rounded-2xl bg-bg-elevated border border-border-subtle">
              <h3 className="text-xl font-bold mb-6 text-text-primary">
                {t.contact.social.title}
              </h3>
              <div className="flex flex-col gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 rounded-lg bg-bg-secondary border border-border-subtle hover:border-border-default transition-all ${social.color}`}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20">
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                {t.contact.availability.title}
              </h3>
              <p className="text-text-secondary">
                {t.contact.availability.text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
