import React from 'react';
import { ShieldCheck, Zap, Video, Smartphone, Sparkles, RefreshCw } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Ultra Fast Conversion',
      desc: 'High-speed cloud servers parse and prepare media streams instantly.'
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Anonymous',
      desc: 'No login or registration required. We do not track your activity or save media files.'
    },
    {
      icon: Video,
      title: 'Original Quality',
      desc: 'Get full HD, 4K videos, and original resolution images without compression.'
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive',
      desc: 'Works seamlessly across all modern browsers, smartphones, tablets, and desktops.'
    },
    {
      icon: RefreshCw,
      title: 'Auto Format Parsing',
      desc: 'Automatically extracts MP4, MP3, and HD photo links tailored to your choice.'
    },
    {
      icon: Sparkles,
      title: 'No Watermark',
      desc: 'Clean downloads for video reels and short clips directly from supported sources.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Why Use SmartDownloader?</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Designed for smooth navigation, quick processing, and modern usability.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-colors space-y-3"
              >
                <div className="p-3 w-fit bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-100 dark:border-blue-500/20">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}