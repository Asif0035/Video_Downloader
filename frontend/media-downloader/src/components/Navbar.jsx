import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Download, Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Custom smooth scroll handler replacing react-router-hash-link
  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-600/20">
                <Download className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SmartDownloader
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links & Actions */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              Home
            </Link>

            {/* Target Platforms Dropdown for SOP Programmatic Routes */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-white transition-colors py-2"
              >
                <span>Platforms</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
                  <Link
                    to="/youtube-shorts-downloader"
                    className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    YouTube Shorts
                  </Link>
                  <Link
                    to="/instagram-reels-downloader"
                    className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Instagram Reels
                  </Link>
                  <Link
                    to="/facebook-video-downloader-hd"
                    className="block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Facebook HD
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('downloader')}
              className="hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              Downloader
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="hover:text-blue-600 dark:hover:text-white transition-colors"
            >
              FAQ
            </button>

            {/* Dark/Light Theme Toggle (Desktop) */}
            <ThemeToggle />
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium py-1"
          >
            Home
          </Link>
          <div className="pl-2 border-l-2 border-slate-200 dark:border-slate-800 space-y-1">
            <Link
              to="/youtube-shorts-downloader"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 py-1"
            >
              YouTube Shorts
            </Link>
            <Link
              to="/instagram-reels-downloader"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 py-1"
            >
              Instagram Reels
            </Link>
            <Link
              to="/facebook-video-downloader-hd"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 py-1"
            >
              Facebook HD
            </Link>
          </div>
          <button
            onClick={() => scrollToSection('downloader')}
            className="block w-full text-left text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium py-1"
          >
            Downloader
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium py-1"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="block w-full text-left text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white font-medium py-1"
          >
            FAQ
          </button>
        </div>
      )}
    </nav>
  );
}