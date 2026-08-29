import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Link2, Loader2, Sparkles, AlertCircle, Globe2, Flag, Check } from 'lucide-react';
import DownloadCard from './DownloadCard';

// Custom SVG Icons to avoid missing export errors from lucide-react
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Hero() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [reported, setReported] = useState(false);

  // Connects to Flask POST /api/extract
  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please paste a valid link first.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    setReported(false);

    try {
      const response = await fetch('http://localhost:5000/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract media from this URL.');
      }

      setResult(data);
    } catch (err) {
      setError(err.message || 'Server error. Make sure your Python backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Connects to Flask POST /api/report-link
  const handleReportBrokenLink = async () => {
    if (!url) return;
    try {
      await fetch('http://localhost:5000/api/report-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      setReported(true);
      setTimeout(() => setReported(false), 4000);
    } catch (err) {
      console.error('Failed to log broken link report:', err);
    }
  };

  return (
    <section id="downloader" className="relative pt-4 sm:pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors duration-200">
      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/15 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold"
        >
          <Sparkles className="w-3.5 h-3.5" /> Fast, Free & Unlimited Media Saver
        </motion.div>

        {/* Animated Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight"
        >
          <motion.span
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1.5,
                },
              },
            }}
          >
            {"Download Videos, Reels & Stories ".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>

          <br />

          <motion.span
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-400 bg-clip-text text-transparent inline-block"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1.5,
                },
              },
            }}
          >
            {"In High Quality".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto"
        >
          Paste any link from YouTube, Instagram, or Facebook to immediately download media without watermarks.
        </motion.p>

        {/* Compact Platform Indicator Bar */}
        {/* <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 sm:gap-4 px-4 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-sm"
        >
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Globe2 className="w-3.5 h-3.5" /> Supported:
          </span>
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
            <YoutubeIcon className="w-4 h-4 hover:text-red-500 transition-colors" title="YouTube" />
            <InstagramIcon className="w-4 h-4 hover:text-pink-500 transition-colors" title="Instagram" />
            <FacebookIcon className="w-4 h-4 hover:text-blue-500 transition-colors" title="Facebook" />
          </div>
        </motion.div> */}

        {/* Compact Platform Indicator Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3.5 sm:gap-5 px-4.5 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-sm"
        >
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Globe2 className="w-4 h-4" /> Supported:
          </span>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
            <YoutubeIcon className="w-5 h-5 hover:text-red-500 transition-colors" title="YouTube" />
            <InstagramIcon className="w-5 h-5 hover:text-pink-500 transition-colors" title="Instagram" />
            <FacebookIcon className="w-5 h-5 hover:text-blue-500 transition-colors" title="Facebook" />
          </div>
        </motion.div>

        {/* Input Form */}
        <form onSubmit={handleDownload} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-1.5 sm:p-2 shadow-lg focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-600/20 dark:focus-within:ring-blue-500/20 transition-all">
            <Link2 className="w-5 h-5 text-slate-400 dark:text-slate-500 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste link here (e.g. https://instagram.com/reel/...)"
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-600/20 transition-all flex-shrink-0 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Fetching...
                </>
              ) : (
                <>
                  Fetch <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {error && (
            <p className="mt-2 text-xs text-red-500 dark:text-red-400 flex items-center justify-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}
        </form>

        {/* Result Card Container & Report Broken Link Action */}
        {result && (
          <div className="space-y-3">
            <DownloadCard data={result} onReset={() => setResult(null)} />
            
            <div className="flex justify-center">
              <button
                onClick={handleReportBrokenLink}
                disabled={reported}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                {reported ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-600 dark:text-green-400 font-medium">Report submitted! We are looking into it.</span>
                  </>
                ) : (
                  <>
                    <Flag className="w-3.5 h-3.5" />
                    <span>Report Broken Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


















































// import React, { useState } from 'react';
// import { LinkIcon, AlertCircle, RefreshCw } from 'lucide-react';
// import DownloadCard from './DownloadCard';

// export default function Hero() {
//   const [url, setUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [mediaData, setMediaData] = useState(null);
//   const [reportSent, setReportSent] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!url.trim()) return;

//     setLoading(true);
//     setError('');
//     setMediaData(null);
//     setReportSent(false);

//     try {
//       // Hit your local Flask extraction endpoint
//       const response = await fetch('http://localhost:5000/api/extract', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ url: url.trim() }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to extract video details');
//       }

//       setMediaData(data);
//     } catch (err) {
//       setError(err.message || 'Something went wrong. Please check your link.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReportLink = async () => {
//     try {
//       await fetch('http://localhost:5000/api/report-link', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ url }),
//       });
//       setReportSent(true);
//     } catch (err) {
//       console.error('Failed to report link:', err);
//     }
//   };

//   return (
//     <section className="pt-12 pb-16 px-4 text-center">
//       <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
//         Download Social Media Media <span className="text-blue-600">Instantly</span>
//       </h1>
//       <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-8">
//         Fast, high-quality video downloads for YouTube Shorts, Instagram Reels, and Facebook HD.
//       </p>

//       {/* URL Input Form */}
//       <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-8">
//         <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
//           <div className="flex items-center flex-1 px-4 gap-3">
//             <LinkIcon className="w-5 h-5 text-slate-400" />
//             <input
//               type="url"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//               placeholder="Paste YouTube, Instagram, or Facebook URL here..."
//               required
//               className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base py-3"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
//           >
//             {loading ? (
//               <>
//                 <RefreshCw className="w-5 h-5 animate-spin" /> Extracting...
//               </>
//             ) : (
//               'Download'
//             )}
//           </button>
//         </div>
//       </form>

//       {/* Error & SOP Broken Link Report Action */}
//       {error && (
//         <div className="max-w-md mx-auto p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-sm mb-8 flex flex-col items-center gap-3">
//           <div className="flex items-center gap-2">
//             <AlertCircle className="w-5 h-5" />
//             <span>{error}</span>
//           </div>
//           <button
//             onClick={handleReportLink}
//             disabled={reportSent}
//             className="text-xs text-blue-600 dark:text-blue-400 underline hover:text-blue-700 disabled:no-underline disabled:text-slate-400"
//           >
//             {reportSent ? 'Reported! Thanks for helping us fix this.' : 'Report Broken Link'}
//           </button>
//         </div>
//       )}

//       {/* Render Extracted Results */}
//       {mediaData && <DownloadCard data={mediaData} />}
//     </section>
//   );
// }