import React from 'react';
import { ViewTab } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: ViewTab) => void;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDarkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t-2 transition-colors duration-150 py-12 px-4 sm:px-6 ${
        isDarkMode
          ? 'border-neutral-800 bg-[#09090b] text-neutral-400'
          : 'border-neutral-300 bg-[#fafafa] text-neutral-600'
      }`}
      id="main-footer"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left: Branding & Core Mandatory Attribution */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`w-6 h-6 border flex items-center justify-center font-japanese font-black text-xs ${
                isDarkMode ? 'border-neutral-400 text-white' : 'border-black text-black'
              }`}
            >
              力
            </span>
            <span className="font-manga-title text-2xl font-black tracking-wide text-neutral-100 dark:text-neutral-100 text-neutral-900">
              XPLORATION OF POWERS
            </span>
          </div>

          <div className="font-japanese text-lg font-bold text-neutral-300 dark:text-neutral-300 text-neutral-800">
            力の探求
          </div>

          <p className="font-sans-body text-xs text-neutral-400 mt-2 max-w-sm">
            An original student manga project.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              onNavigate('home');
              scrollToTop();
            }}
            className="hover:text-current transition-colors text-neutral-400 hover:text-white"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('read');
              scrollToTop();
            }}
            className="hover:text-current transition-colors text-neutral-400 hover:text-white"
          >
            Read Ch. 01
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('chapters');
              scrollToTop();
            }}
            className="hover:text-current transition-colors text-neutral-400 hover:text-white"
          >
            Chapters
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('order');
              scrollToTop();
            }}
            className="hover:text-current transition-colors text-neutral-400 hover:text-white"
          >
            Order
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('about');
              scrollToTop();
            }}
            className="hover:text-current transition-colors text-neutral-400 hover:text-white"
          >
            About
          </button>
        </div>

        {/* Right: Scroll to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className={`p-2.5 border text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
            isDarkMode
              ? 'border-neutral-800 hover:border-neutral-600 hover:text-white'
              : 'border-neutral-300 hover:border-black hover:text-black'
          }`}
          id="btn-scroll-to-top"
          title="Return to top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="hidden sm:inline">Top</span>
        </button>

      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-neutral-800/60 text-[11px] font-mono text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <span>Original work created for school circulation. Strictly non-commercial.</span>
        <span>力 (Chikara) — Exploration of Powers</span>
      </div>
    </footer>
  );
};
