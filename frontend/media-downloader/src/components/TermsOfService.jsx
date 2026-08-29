import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" /> User Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Terms of Service</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Effective Date: August 2026</p>
        </motion.div>

        <div className="space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl p-6 sm:p-10 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Acceptable Use
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              SmartDownloader is provided as a public utility to assist users in saving personal content or public domain media. By accessing this platform, you agree to comply with copyright laws governing content ownership in your jurisdiction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Intellectual Property Disclaimer
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Users are solely responsible for respecting intellectual property rights. You must not download or distribute copyrighted material without explicit permission from the original content owner.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Limitation of Liability
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              SmartDownloader provides services "as-is" without explicit warranties. We are not liable for service interruptions, source platform API changes, or user misuse of downloaded files.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}