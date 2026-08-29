import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is this media downloader completely free?",
      answer: "Yes, our tool is 100% free with no hidden charges, trial limits, or account registration required."
    },
    {
      question: "Do I need to install any browser extensions or software?",
      answer: "No, everything works directly inside your web browser across mobile, tablet, and desktop devices."
    },
    {
      question: "Will the downloaded videos contain any watermarks?",
      answer: "No. All media links fetched are clean, original-quality files without added watermarks."
    },
    {
      question: "What platforms and content types are supported?",
      answer: "We support YouTube (Videos & Shorts), Instagram (Reels, Stories, Photos & Highlights), and Facebook videos."
    },
    {
      question: "Are there any daily download limits?",
      answer: "None at all. You can download as many videos, photos, and stories as you like."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 transition-colors duration-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" /> Support & Clarifications
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
            Everything you need to know about downloading media from supported platforms.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 text-slate-900 dark:text-white font-medium text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 dark:text-slate-500 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}