import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Upper Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
              <Download className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">SmartDownloader</span>
          </Link>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300 font-medium">
            <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
            <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Lower Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="max-w-xl text-center md:text-left">
            Disclaimer: SmartDownloader is an independent tool and is not affiliated with YouTube, Instagram, or Facebook.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            Built with <Heart className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> for creators
          </div>
        </div>
      </div>
    </footer>
  );
}