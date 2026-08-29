import React from 'react';
import { Play, Camera, Share2, Layers } from 'lucide-react';

export default function PlatformSelector({ activePlatform, setActivePlatform, activeType, setActiveType }) {
  const platforms = [
    { id: 'all', label: 'All Platforms', icon: Layers },
    { id: 'youtube', label: 'YouTube', icon: Play, color: 'text-red-500' },
    { id: 'instagram', label: 'Instagram', icon: Camera, color: 'text-pink-500' },
    { id: 'facebook', label: 'Facebook', icon: Share2, color: 'text-blue-600' },
  ];

  const contentTypes = [
    { id: 'video', label: 'Videos & Shorts' },
    { id: 'photo', label: 'Photos' },
    { id: 'story', label: 'Stories & Highlights' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Platform Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm">
        {platforms.map((p) => {
          const Icon = p.icon;
          const isActive = activePlatform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-slate-100 text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${p.color || ''}`} />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Type Sub-Tabs */}
      <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-500">
        {contentTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveType(t.id)}
            className={`px-3 py-1 rounded-full transition-colors ${
              activeType === t.id
                ? 'bg-blue-50 text-blue-600 border border-blue-200 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}