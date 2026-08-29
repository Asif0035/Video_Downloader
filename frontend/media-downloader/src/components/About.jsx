import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, DownloadCloud, Globe, Heart, Users } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Downloads Processed', value: '10M+' },
    { label: 'Supported Platforms', value: '3+' },
    { label: 'Uptime Guarantee', value: '99.9%' },
    { label: 'Happy Users', value: '500K+' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Speeds',
      description: 'Engineered with optimized streaming protocols to fetch and render high-definition media links in seconds.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy-First Architecture',
      description: 'We do not store your media, track download history, or mandate user registration.',
    },
    {
      icon: Globe,
      title: 'Cross-Platform Support',
      description: 'Fully responsive UI optimized for seamless usage across smartphones, tablets, and desktop browsers.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" /> Our Story & Mission
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Empowering Smooth Media Downloads
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            We built this platform to give creators, consumers, and archivists a simple, safe, and lightning-fast way to save their favorite videos, photos, and stories without annoying popups or software downloads.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl text-center"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Core Values / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-slate-100 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 border border-blue-200/60 dark:border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <DownloadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Dedicated to Open & Fast Access</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Whether you are preserving personal memories from Instagram Stories or pulling educational clips from YouTube, our mission is to ensure you retain high-quality access to the content that matters to you.
          </p>
        </div>

      </div>
    </div>
  );
}