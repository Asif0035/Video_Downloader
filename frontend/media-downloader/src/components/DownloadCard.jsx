import React, { useState } from 'react';
import { Download, Check, Loader2, Play, Eye, Clock } from 'lucide-react';

export default function DownloadCard({ data, onReset }) {
  const [downloadingUrl, setDownloadingUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleDownload = (qualityUrl, qualityLabel) => {
    // If it's an external direct URL (Instagram/Facebook), download directly
    if (!qualityUrl.includes('/api/download')) {
      window.open(qualityUrl, '_blank');
      return;
    }

    // For YouTube backend-merged streams, track progress via XMLHttpRequest
    setDownloadingUrl(qualityUrl);
    setProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', qualityUrl, true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      } else {
        // Fallback smooth progress estimate if content-length header is absent
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        
        // Clean filename formatting
        const cleanTitle = (data.title || 'video').replace(/[^a-zA-Z0-9]/g, '_');
        link.download = `${cleanTitle}_${qualityLabel}.mp4`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } else {
        alert('Failed to download video. Please try again.');
      }
      setDownloadingUrl(null);
      setProgress(0);
    };

    xhr.onerror = () => {
      alert('Network error during download.');
      setDownloadingUrl(null);
      setProgress(0);
    };

    xhr.send();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl transition-all">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Thumbnail Preview */}
        <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[11px] font-medium text-white flex items-center gap-1">
            <Clock className="w-3 h-3" /> {data.duration}
          </div>
        </div>

        {/* Video Info */}
        <div className="flex-1 space-y-2 text-left w-full">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            {data.platform}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2">
            {data.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {data.views} views
          </p>
        </div>
      </div>

      {/* Real-time Download Progress Bar */}
      {downloadingUrl && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 rounded-xl space-y-1.5">
          <div className="flex justify-between items-center text-xs font-medium text-blue-700 dark:text-blue-300">
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Downloading & Merging Media...
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-blue-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 dark:bg-blue-400 h-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Quality Selection Options */}
      <div className="mt-5 border-t border-slate-100 dark:border-slate-800 pt-4">
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 text-left">
          Available Formats
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {data.qualities.map((item, index) => {
            const isProcessing = downloadingUrl === item.url;
            return (
              <button
                key={index}
                onClick={() => handleDownload(item.url, item.label)}
                disabled={!!downloadingUrl}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-700/60 rounded-xl text-left transition-all disabled:opacity-50 group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.size}
                  </div>
                </div>

                <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all text-slate-700 dark:text-slate-200">
                  {isProcessing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}