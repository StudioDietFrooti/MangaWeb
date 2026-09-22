import React, { useState } from 'react';
import { MANGA_INFO, AWAKENED_POWERS } from '../data/mangaData';
import { MangaCover } from './MangaCover';
import { AbilityEffectOverlay, AbilityEffectType } from './AbilityEffectOverlay';
import { GasGenieFigure } from './GasGenieFigure';
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
  Zap,
  ListOrdered,
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
  const [activeEffect, setActiveEffect] = useState<{
    powerId: AbilityEffectType;
    triggerKey: number;
  } | null>({
    powerId: 'tiger',
    triggerKey: Date.now(),
  });

  const activePower =
    AWAKENED_POWERS.find((p) => p.id === selectedPowerId) || AWAKENED_POWERS[0];

  const handlePowerCardClick = (id: string) => {
    setSelectedPowerId(id);
    setActiveEffect({
      powerId: id as AbilityEffectType,
      triggerKey: Date.now(),
    });
  };

  const getPowerIcon = (id: string, isSelected: boolean) => {
    switch (id) {
      case 'tiger':
        return (
          <Flame
            className={`w-4 h-4 transition-colors ${
              isSelected ? 'text-amber-500' : 'text-orange-400/80 group-hover:text-orange-400'
            }`}
          />
        );
      case 'light':
        return (
          <Sun
            className={`w-4 h-4 transition-colors ${
              isSelected ? 'text-yellow-600' : 'text-yellow-400/80 group-hover:text-yellow-300'
            }`}
          />
        );
      case 'portal':
        return (
          <DoorOpen
            className={`w-4 h-4 transition-colors ${
              isSelected ? 'text-indigo-600' : 'text-indigo-400/80 group-hover:text-cyan-400'
            }`}
          />
        );
      case 'gas':
        return (
          <Wind
            className={`w-4 h-4 transition-colors ${
              isSelected ? 'text-teal-600' : 'text-teal-300/80 group-hover:text-teal-200'
            }`}
          />
        );
      case 'art':
        return (
          <Palette
            className={`w-4 h-4 transition-colors ${
              isSelected ? 'text-neutral-900' : 'text-neutral-400 group-hover:text-white'
            }`}
          />
        );
      default:
        return <Sparkles className="w-4 h-4" />;
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

            {/* Manga Story Narrative */}
            <div
              className={`mt-4 space-y-3 font-sans-body max-w-xl text-sm sm:text-base leading-relaxed ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}
              id="hero-synopsis-block"
            >
              <p>
                When an ominous portal tore open without warning across the school grounds, a group of ordinary students stepped into the uncharted rift. Traversing the unknown threshold altered them forever—awakening extraordinary, unprecedented powers dormant within their spirits.
              </p>
              
              <p className="text-neutral-400 dark:text-neutral-300">
                Among them arose the ferocious primal might of the <strong className="text-neutral-100 font-bold">Tiger</strong>, the blinding velocity and radiant energy of <strong className="text-neutral-100 font-bold">Light</strong>, the dimensional tears of the <strong className="text-neutral-100 font-bold">Portal</strong>, the volatile atmospheric dispersion of <strong className="text-neutral-100 font-bold">Gas</strong>, and the miraculous ability to summon physical living reality from drawn <strong className="text-neutral-100 font-bold">Art</strong>.
              </p>

              <p className="text-neutral-300 dark:text-neutral-200">
                Their awakening re-ignites dormant powers within them—thrusting ordinary students into extraordinary battles of will, instinct, and survival. As their abilities surge, each student must discover how to master their awakening and uncover the secrets waiting beyond the threshold.
              </p>

              <p className="font-medium italic border-l-2 pl-3 py-0.5 border-neutral-500 text-neutral-200 dark:text-neutral-200">
                To experience the story as it unfolds and see their powers in action, click Read below to dive directly into Chapter 01.
              </p>
            </div>

            {/* Interactive Awakened Powers Showcase (5 Powers: Tiger, Light, Portal, Gas, Art) */}
            <div className="mt-6 p-4 border border-neutral-800 bg-neutral-950/70 max-w-xl">
              <div className="flex items-center justify-between mb-2.5 border-b border-neutral-800 pb-2">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-300 font-bold">
                    AWAKENED STUDENT ABILITIES (能力覚醒)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 hidden sm:inline">
                  Tap card to trigger effect
                </span>
              </div>

              {/* Ability Cards Grid (5 Columns: Tiger, Light, Portal, Gas, Art) */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-3">
                {AWAKENED_POWERS.map((power) => {
                  const isSelected = power.id === selectedPowerId;
                  const isEffectActive = activeEffect?.powerId === power.id;

                  // Unique styling per ability
                  let borderClass = 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-600 hover:text-white';
                  if (isSelected) {
                    switch (power.id) {
                      case 'tiger':
                        borderClass = 'border-orange-500 bg-orange-950/40 text-orange-200 shadow-[0_0_12px_rgba(249,115,22,0.35)]';
                        break;
                      case 'light':
                        borderClass = 'border-yellow-400 bg-yellow-950/40 text-yellow-200 shadow-[0_0_12px_rgba(250,204,21,0.35)]';
                        break;
                      case 'portal':
                        borderClass = 'border-indigo-400 bg-indigo-950/40 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.35)]';
                        break;
                      case 'gas':
                        borderClass = 'border-teal-400 bg-teal-950/40 text-teal-200 shadow-[0_0_12px_rgba(45,212,191,0.35)]';
                        break;
                      case 'art':
                        borderClass = 'border-neutral-300 bg-neutral-900 text-white shadow-[0_0_12px_rgba(255,255,255,0.25)]';
                        break;
                      default:
                        borderClass = 'border-white bg-white text-black font-bold';
                    }
                  }

                  return (
                    <button
                      key={power.id}
                      type="button"
                      onClick={() => handlePowerCardClick(power.id)}
                      className={`relative overflow-hidden p-2 border transition-all text-left flex flex-col justify-between group active:scale-95 cursor-pointer select-none ${borderClass}`}
                      id={`power-card-${power.id}`}
                      aria-label={`Trigger ${power.name} ability effect`}
                      title={`Click to trigger ${power.name} (${power.kanji}) effect`}
                    >
                      <div className="flex items-center justify-between pointer-events-none">
                        <span className="font-japanese text-sm sm:text-base font-black">
                          {power.kanji}
                        </span>
                        {getPowerIcon(power.id, isSelected)}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider block mt-1 truncate pointer-events-none font-bold">
                        {power.name}
                      </span>

                      {/* On-Card Compact Themed Animation Overlay */}
                      {isEffectActive && (
                        <AbilityEffectOverlay
                          effect={power.id as AbilityEffectType}
                          triggerKey={activeEffect.triggerKey}
                          isCompact={true}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Power Detail Card with Large Interactive Effect Stage */}
              <div
                onClick={() => handlePowerCardClick(activePower.id)}
                className="relative overflow-hidden p-3.5 border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-900/80 transition-all text-left cursor-pointer group select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                id="active-power-detail-card"
                title="Tap to re-trigger ability effect"
              >
                {/* Large Themed Animation Overlay on Stage */}
                {activeEffect?.powerId === activePower.id && (
                  <AbilityEffectOverlay
                    effect={activePower.id as AbilityEffectType}
                    triggerKey={activeEffect.triggerKey}
                    isCompact={false}
                  />
                )}

                <div className="relative z-10">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-japanese text-base sm:text-lg font-black text-white">
                        {activePower.japanese}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 border border-neutral-700 text-neutral-300 bg-neutral-950/80 font-bold">
                        {activePower.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-neutral-400 group-hover:text-amber-300 transition-colors flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        <span>Tap to trigger</span>
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
                        • {activePower.colorTone}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-sans-body text-neutral-300 mt-1.5 leading-relaxed">
                    {activePower.description}
                  </p>

                  {/* Small-Medium Gas Genie Figure with Cool Blue, Violet & Cyan Mouth Flames Automatically Swinging Sword */}
                  {activePower.id === 'gas' && (
                    <div className="mt-3 pt-3 border-t border-cyan-900/60 flex flex-col sm:flex-row items-center gap-4 bg-neutral-950/80 p-3 border border-cyan-500/40 rounded">
                      {/* Small/Medium Animated Genie Figure */}
                      <div className="shrink-0 flex items-center justify-center p-1 bg-neutral-900/60 rounded-full border border-cyan-500/30">
                        <GasGenieFigure size="md" autoSwing={true} />
                      </div>

                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono uppercase px-2 py-0.5 border border-cyan-400/80 bg-cyan-950 text-cyan-300 font-bold tracking-wider">
                            AUTOMATIC TRAIT // 気の巨神
                          </span>
                          <span className="text-[10px] font-japanese text-violet-400 font-bold">
                            蒼炎紫電・自動抜刀
                          </span>
                        </div>
                        <h4 className="text-xs font-mono font-bold text-white uppercase mt-1">
                          Vapor Djinn with Cyan, Blue & Violet Mouth Flames
                        </h4>
                        <p className="text-[11px] font-sans-body text-neutral-300 mt-1 leading-relaxed">
                          Continuously exhales cool blue, violet, and cyan atmospheric flames while automatically executing swift energy sword slashes like an inherent combat trait.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
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
                onClick={() => onNavigate('chapters')}
                className={`px-6 py-4 text-sm sm:text-base font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2.5 border-2 ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900/90 text-white hover:border-neutral-500 hover:bg-neutral-800'
                    : 'border-neutral-400 bg-white text-black hover:border-neutral-700 hover:bg-neutral-50'
                }`}
                id="hero-btn-explore-chapters"
              >
                <ListOrdered className="w-4 h-4" />
                <span>CHAPTER ARCHIVE</span>
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
