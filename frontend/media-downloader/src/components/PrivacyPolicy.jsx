import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Server } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" /> Security & Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Last updated: August 2026</p>
        </motion.div>

        <div className="space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl p-6 sm:p-10 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Information We Do Not Collect
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              SmartDownloader operates on a privacy-first principle. We do not require account registration, email addresses, or personal identity details to process media downloads.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Media Processing & Storage
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We do not store or mirror downloaded videos, reels, photos, or stories on our servers. All URLs submitted are parsed on-the-fly and redirected straight from source platforms to your local device memory.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Cookies & Server Logs
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We utilize standard local session caching strictly to prevent rate-limit abuse. Temporary log files (e.g., standard IP access requests) are automatically purged within 24 hours.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}