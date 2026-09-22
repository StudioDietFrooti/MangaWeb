import React from 'react';
import { MANGA_INFO } from '../data/mangaData';
import { MangaCover } from './MangaCover';
import { BookOpen, ShoppingBag, ArrowRight, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { ViewTab } from '../types';

interface HeroProps {
  onNavigate: (tab: ViewTab) => void;
  customCover: string | null;
  onCoverChange: (dataUrl: string | null) => void;
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  customCover,
  onCoverChange,
  isDarkMode,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 sm:pt-12 pb-16 sm:pb-24 border-b border-neutral-800/80" id="hero-section">
      {/* Subtle halftone/screentone background texture overlay */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-40 ${
          isDarkMode ? 'screentone-dots' : 'screentone-dots-light'
        }`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Manga Information & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Project Origin Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest border font-bold ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900/90 text-neutral-300'
                    : 'border-neutral-400 bg-neutral-100 text-neutral-800'
                }`}
                id="hero-origin-badge"
              >
                <Layers className="w-3 h-3" />
                ORIGINAL STUDENT MANGA PROJECT
              </span>
              <span className="text-[11px] font-mono text-neutral-500 uppercase">
                SCHOOL CREATION
              </span>
            </div>

            {/* Japanese Title Header */}
            <div className="mb-2">
              <span
                className="font-japanese text-3xl sm:text-4xl lg:text-5xl font-black tracking-wide block text-neutral-400 dark:text-neutral-300"
                id="hero-japanese-title"
              >
                {MANGA_INFO.japaneseTitle}
              </span>
              <span className="text-xs sm:text-sm font-mono tracking-[0.25em] text-neutral-500 block uppercase mt-0.5">
                {MANGA_INFO.japaneseRomaji} — {MANGA_INFO.tagline}
              </span>
            </div>

            {/* Main Manga English Title */}
            <h1
              className={`font-manga-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] my-2 ${
                isDarkMode ? 'text-white' : 'text-neutral-950'
              }`}
              id="hero-main-title"
            >
              {MANGA_INFO.title}
            </h1>

            {/* Short Original Description */}
            <p
              className={`mt-4 text-base sm:text-lg leading-relaxed font-sans-body max-w-xl ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}
              id="hero-synopsis"
            >
              {MANGA_INFO.synopsis}
            </p>

            {/* Verification Note: Real Data Only */}
            <div
              className={`mt-4 p-3 border text-xs font-mono flex items-start gap-2 max-w-xl ${
                isDarkMode
                  ? 'border-neutral-800 bg-neutral-950/60 text-neutral-400'
                  : 'border-neutral-300 bg-neutral-50 text-neutral-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-neutral-400" />
              <span>
                <strong>Notice:</strong> This is an independent student-authored school manga. No commercial publishers, false sales metrics, or fabricated ratings. Real chapters and art will be uploaded directly.
              </span>
            </div>

            {/* Large Call to Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('read')}
                className={`px-8 py-4 text-sm sm:text-base font-mono uppercase tracking-widest font-black transition-all flex items-center justify-center gap-3 border-2 ${
                  isDarkMode
                    ? 'border-white bg-white text-black hover:bg-neutral-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                    : 'border-black bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'
                } active:translate-x-0.5 active:translate-y-0.5`}
                id="hero-btn-read-manga"
              >
                <BookOpen className="w-5 h-5" />
                <span>READ MANGA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('order')}
                className={`px-6 py-4 text-sm sm:text-base font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2.5 border-2 ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900/90 text-white hover:border-neutral-500 hover:bg-neutral-800'
                    : 'border-neutral-400 bg-white text-black hover:border-neutral-700 hover:bg-neutral-50'
                }`}
                id="hero-btn-order-copy"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER A COPY</span>
              </button>
            </div>

            {/* Real Project Spec Grid (No fake stats!) */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500">
                  Current Release
                </span>
                <span className="font-mono text-xs font-bold text-neutral-200 dark:text-neutral-100">
                  Chapter 01
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500">
                  Format
                </span>
                <span className="font-mono text-xs font-bold text-neutral-200 dark:text-neutral-100">
                  Vertical & Page View
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500">
                  Distribution
                </span>
                <span className="font-mono text-xs font-bold text-neutral-200 dark:text-neutral-100">
                  School Print & Web
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500">
                  Language & Script
                </span>
                <span className="font-mono text-xs font-bold text-neutral-200 dark:text-neutral-100">
                  English / 日本語
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Manga Cover Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-[340px]">
              <MangaCover
                customCover={customCover}
                onCoverChange={onCoverChange}
              />
              <p className="text-center text-[11px] font-mono text-neutral-500 mt-3">
                Cover Art Frame • Tankōbon B5 Ratio
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
