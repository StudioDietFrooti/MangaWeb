import React, { useState } from 'react';
import { MANGA_INFO, AWAKENED_POWERS } from '../data/mangaData';
import { MangaCover } from './MangaCover';
import {
  BookOpen,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
  Layers,
  Flame,
  Sun,
  DoorOpen,
  Wind,
  Palette,
  Sparkles,
  Swords,
  Lock,
  Eye,
  Scroll,
} from 'lucide-react';
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
  const [selectedPowerId, setSelectedPowerId] = useState<string>('tiger');
  const activePower =
    AWAKENED_POWERS.find((p) => p.id === selectedPowerId) || AWAKENED_POWERS[0];

  const getPowerIcon = (id: string) => {
    switch (id) {
      case 'tiger':
        return <Flame className="w-4 h-4 text-neutral-400 group-hover:text-white" />;
      case 'light':
        return <Sun className="w-4 h-4 text-neutral-400 group-hover:text-white" />;
      case 'portal':
        return <DoorOpen className="w-4 h-4 text-neutral-400 group-hover:text-white" />;
      case 'gas':
        return <Wind className="w-4 h-4 text-neutral-400 group-hover:text-white" />;
      case 'art':
        return <Palette className="w-4 h-4 text-neutral-400 group-hover:text-white" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const scrollToLore = () => {
    const el = document.getElementById('world-lore-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10 pb-16 sm:pb-24 border-b border-neutral-800/80" id="hero-section">
      {/* Subtle halftone/screentone background texture overlay */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-40 ${
          isDarkMode ? 'screentone-dots' : 'screentone-dots-light'
        }`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Hero Manga Information & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Project Origin Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest border font-bold ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900/90 text-neutral-300'
                    : 'border-neutral-400 bg-neutral-100 text-neutral-800'
                }`}
                id="hero-origin-badge"
              >
                <Layers className="w-3.5 h-3.5" />
                ORIGINAL STUDENT MANGA
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

            {/* Rich Manga Story Narrative with Lore, Forbidden Fusion, Secret, and Dragon Hint */}
            <div
              className={`mt-4 space-y-3 font-sans-body max-w-xl text-sm sm:text-base leading-relaxed ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}
              id="hero-synopsis-block"
            >
              <p>
                When an ominous portal tore open without warning across the school grounds, a small group of ordinary students stepped into the uncharted rift. Traversing the unknown threshold altered them forever—awakening extraordinary, unprecedented powers dormant within their spirits.
              </p>
              
              <p className="text-neutral-400 dark:text-neutral-300">
                Among them arose the ferocious primal might of the <strong className="text-neutral-100 font-bold">Tiger</strong>, the blinding velocity and radiant energy of <strong className="text-neutral-100 font-bold">Light</strong>, the dimensional tears of the <strong className="text-neutral-100 font-bold">Portal</strong>, the volatile atmospheric dispersion of <strong className="text-neutral-100 font-bold">Gas</strong>, and the miraculous ability to summon physical living reality from drawn <strong className="text-neutral-100 font-bold">Art</strong>.
              </p>

              {/* The 60% Ancient Lore Context: Civilizations, Forbidden Fusion & The Secret */}
              <div
                className={`p-3.5 border text-xs sm:text-sm font-sans-body leading-relaxed space-y-2 ${
                  isDarkMode
                    ? 'border-neutral-800 bg-neutral-950/80 text-neutral-300'
                    : 'border-neutral-300 bg-neutral-50 text-neutral-700'
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400 font-bold">
                  <Swords className="w-3.5 h-3.5" />
                  <span>The 60% Ancient Lore & The Shattered Blade</span>
                </div>
                <p>
                  Their awakening re-ignites an ancient blood feud: catastrophic riots once tore the earth between the <em>Fruit-Eater Civilization</em> and the disciplined <em>Swordsman Civilization</em>. By an inviolable cosmic rule, <strong>if any fruit user attempts to master a sword or fuse both powers, the steel violently shatters and breaks into dust</strong>.
                </p>
                <div className="flex items-start gap-2 pt-1 border-t border-neutral-800/60 font-mono text-xs text-neutral-400">
                  <Lock className="w-3.5 h-3.5 mt-0.5 shrink-0 text-neutral-300" />
                  <span>
                    <strong>Group Secret:</strong> Two students in the classroom are secretly destined to receive swords—hiding their blade legacy from their fruit-wielding classmates.
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 italic">
                  <Eye className="w-3 h-3 text-neutral-400" />
                  <span>...And beneath the deepest seismic crust, a slumbering dragon slowly stirs.</span>
                </div>
              </div>

              <p className="font-medium italic border-l-2 pl-3 py-0.5 border-neutral-500 text-neutral-200 dark:text-neutral-200">
                To uncover where the portal leads, how the tension between steel and power explodes, and what happens next—click Read below to dive into Chapter 01.
              </p>
            </div>

            {/* Interactive Awakened Powers Showcase (5 Powers: Tiger, Light, Portal, Gas, Art) */}
            <div className="mt-6 p-4 border border-neutral-800 bg-neutral-950/70 max-w-xl">
              <div className="flex items-center justify-between mb-3 border-b border-neutral-800 pb-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                  AWAKENED STUDENT ABILITIES (能力概要)
                </span>
                <button
                  type="button"
                  onClick={scrollToLore}
                  className="text-[10px] font-mono text-neutral-400 underline hover:text-white"
                >
                  View World Lore ↓
                </button>
              </div>

              {/* Power Selector Tabs (5 Columns) */}
              <div className="grid grid-cols-5 gap-1.5 mb-3">
                {AWAKENED_POWERS.map((power) => {
                  const isSelected = power.id === selectedPowerId;
                  return (
                    <button
                      key={power.id}
                      type="button"
                      onClick={() => setSelectedPowerId(power.id)}
                      className={`p-2 border transition-all text-left flex flex-col justify-between group ${
                        isSelected
                          ? 'border-white bg-white text-black font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]'
                          : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                      id={`power-tab-${power.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-japanese text-sm font-black">
                          {power.kanji}
                        </span>
                        {getPowerIcon(power.id)}
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider block mt-1 truncate">
                        {power.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Power Detail Card */}
              <div className="p-3 border border-neutral-800 bg-neutral-900/40 text-left">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-japanese text-base font-black text-white">
                      {activePower.japanese}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 border border-neutral-700 text-neutral-300">
                      {activePower.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {activePower.colorTone}
                  </span>
                </div>
                <p className="text-xs font-sans-body text-neutral-300 mt-1.5 leading-relaxed">
                  {activePower.description}
                </p>
              </div>
            </div>

            {/* Verification Note: Real Student Data Only */}
            <div
              className={`mt-4 p-3 border text-xs font-mono flex items-start gap-2 max-w-xl ${
                isDarkMode
                  ? 'border-neutral-800 bg-neutral-950/60 text-neutral-400'
                  : 'border-neutral-300 bg-neutral-50 text-neutral-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0 text-neutral-400" />
              <span>
                <strong>Notice:</strong> Original independent student manga project. No commercial publishers, false sales metrics, or fabricated reviews. Real chapters and artwork uploaded directly.
              </span>
            </div>

            {/* Large Call to Action Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('read')}
                className={`px-8 py-4 text-sm sm:text-base font-mono uppercase tracking-widest font-black transition-all flex items-center justify-center gap-3 border-2 ${
                  isDarkMode
                    ? 'border-white bg-white text-black hover:bg-neutral-200 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]'
                    : 'border-black bg-black text-white hover:bg-neutral-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]'
                } active:translate-x-0.5 active:translate-y-0.5 group`}
                id="hero-btn-read-manga"
              >
                <BookOpen className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>READ MANGA</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={scrollToLore}
                className={`px-6 py-4 text-sm sm:text-base font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2.5 border-2 ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900/90 text-white hover:border-neutral-500 hover:bg-neutral-800'
                    : 'border-neutral-400 bg-white text-black hover:border-neutral-700 hover:bg-neutral-50'
                }`}
                id="hero-btn-explore-lore"
              >
                <Scroll className="w-4 h-4" />
                <span>EXPLORE LORE</span>
              </button>
            </div>

            {/* Real Project Spec Grid (No fake stats!) */}
            <div className="mt-8 pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <span className="block text-[10px] font-mono uppercase text-neutral-500">
                  Current Release
                </span>
                <span className="font-mono text-xs font-bold text-neutral-200 dark:text-neutral-100">
                  Chapter 01 (12 Pages)
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
                  World Lore
                </span>
                <span className="font-mono text-xs font-bold text-neutral-200 dark:text-neutral-100">
                  The Two Civilizations
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
