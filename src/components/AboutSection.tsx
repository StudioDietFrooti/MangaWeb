import React from 'react';
import { MANGA_INFO } from '../data/mangaData';
import { Info, User, School, PenTool, Image as ImageIcon, HelpCircle, Layers } from 'lucide-react';

interface AboutSectionProps {
  isDarkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDarkMode }) => {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto" id="about-section">
      {/* Header */}
      <div className="border-b-2 border-current pb-4 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1">
          <Info className="w-3.5 h-3.5" />
          <span>PROJECT STATEMENT & CREDITS</span>
        </div>
        <h2 className="font-manga-title text-4xl sm:text-5xl font-black uppercase tracking-tight">
          ABOUT THE PROJECT
        </h2>
        <p className="font-sans-body text-sm text-neutral-400 mt-1 max-w-2xl">
          <em>Xploration of Powers (力の探求)</em> is an original student-made manga created for school circulation.
        </p>
      </div>

      {/* Main About Content */}
      <div className="space-y-8">
        {/* Core Manifesto / Statement */}
        <div
          className={`p-6 sm:p-8 border-2 ${
            isDarkMode
              ? 'border-neutral-800 bg-neutral-950/80 text-neutral-200'
              : 'border-neutral-300 bg-white text-neutral-800'
          }`}
        >
          <span className="font-japanese text-xl font-bold block text-neutral-400 mb-1">
            作品概要 (Project Outline)
          </span>
          <h3 className="font-manga-title text-3xl font-black uppercase tracking-wider mb-4">
            A STUDENT CREATIVE ENDEAVOR
          </h3>
          <div className="font-sans-body text-sm leading-relaxed space-y-3">
            <p>
              <strong>XPLORATION OF POWERS (力の探求 — Chikara no Tankyū)</strong> was born out of a passion for authentic Japanese manga storytelling, dynamic page paneling, and the timeless question of what happens when ordinary students suddenly encounter extraordinary abilities.
            </p>
            <p>
              Rather than a mass-market commercial product, this manga is an independent, original student creation. Every page, panel layout, sound effect, and story beat has been drawn and constructed for schoolmates, friends, and fellow manga enthusiasts.
            </p>
          </div>
        </div>

        {/* Project Credits & Real Placeholders (Strictly No Invented Names/Publishers) */}
        <div>
          <h3 className="font-manga-title text-2xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-neutral-500" />
            <span>PROJECT CREDITS & SPECIFICATIONS</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className={`p-4 border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}>
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                Story & Artwork
              </span>
              <strong className="text-sm block">{MANGA_INFO.authorPlaceholder}</strong>
              <span className="text-[11px] text-neutral-500 mt-1 block font-sans-body">
                (Will be updated when the student author wishes to display their name or pen name)
              </span>
            </div>

            <div className={`p-4 border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}>
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                Affiliation / Circulation
              </span>
              <strong className="text-sm block">{MANGA_INFO.schoolPlaceholder}</strong>
              <span className="text-[11px] text-neutral-500 mt-1 block font-sans-body">
                Independent school circulation project
              </span>
            </div>

            <div className={`p-4 border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}>
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                Tools & Medium
              </span>
              <strong className="text-sm block">Traditional Inking & Digital Tone</strong>
              <span className="text-[11px] text-neutral-500 mt-1 block font-sans-body">
                G-Pen & fineliner line work, screentone shading, B5 manuscript format
              </span>
            </div>

            <div className={`p-4 border ${isDarkMode ? 'border-neutral-800 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'}`}>
              <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                Publishing Status
              </span>
              <strong className="text-sm block">Self-published School Edition</strong>
              <span className="text-[11px] text-neutral-500 mt-1 block font-sans-body">
                No external publisher or commercial sponsorship
              </span>
            </div>
          </div>
        </div>

        {/* ARTWORK PLACEHOLDERS SECTION (Manga cover, Chapter pages, Character artwork) */}
        <div className="pt-4">
          <h3 className="font-manga-title text-2xl font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-neutral-500" />
            <span>ARTWORK & PRODUCTION GALLERY SLOTS</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Slot 1: Manga Cover Placeholder */}
            <div className={`border-2 p-4 text-center ${isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-300 bg-neutral-50'}`}>
              <div className="aspect-[2/3] w-full border border-dashed border-neutral-600 flex flex-col items-center justify-center p-4 mb-3 screentone-dots">
                <ImageIcon className="w-8 h-8 text-neutral-500 mb-2" />
                <span className="text-xs font-mono font-bold uppercase text-neutral-300">
                  MANGA COVER
                </span>
                <span className="text-[10px] font-mono text-neutral-500 mt-1">
                  Front Cover Art Slot
                </span>
              </div>
              <span className="text-xs font-mono font-bold block">COVER ARTWORK</span>
              <span className="text-[11px] text-neutral-500 block font-sans-body mt-0.5">
                Tankōbon B5 format
              </span>
            </div>

            {/* Slot 2: Chapter Pages Placeholder */}
            <div className={`border-2 p-4 text-center ${isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-300 bg-neutral-50'}`}>
              <div className="aspect-[2/3] w-full border border-dashed border-neutral-600 flex flex-col items-center justify-center p-4 mb-3 screentone-dots">
                <Layers className="w-8 h-8 text-neutral-500 mb-2" />
                <span className="text-xs font-mono font-bold uppercase text-neutral-300">
                  CHAPTER PAGES
                </span>
                <span className="text-[10px] font-mono text-neutral-500 mt-1">
                  12 Pages Initial Slot
                </span>
              </div>
              <span className="text-xs font-mono font-bold block">MANUSCRIPT PAGES</span>
              <span className="text-[11px] text-neutral-500 block font-sans-body mt-0.5">
                Loaded in Manga Reader
              </span>
            </div>

            {/* Slot 3: Character Artwork Placeholder */}
            <div className={`border-2 p-4 text-center ${isDarkMode ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-300 bg-neutral-50'}`}>
              <div className="aspect-[2/3] w-full border border-dashed border-neutral-600 flex flex-col items-center justify-center p-4 mb-3 screentone-dots">
                <User className="w-8 h-8 text-neutral-500 mb-2" />
                <span className="text-xs font-mono font-bold uppercase text-neutral-300">
                  CHARACTER ART
                </span>
                <span className="text-[10px] font-mono text-neutral-500 mt-1">
                  Design Sheets Slot
                </span>
              </div>
              <span className="text-xs font-mono font-bold block">CHARACTER ARTWORK</span>
              <span className="text-[11px] text-neutral-500 block font-sans-body mt-0.5">
                Concept & Ability Profiles
              </span>
            </div>

          </div>
        </div>

        {/* Note on integrity */}
        <div
          className={`p-4 border text-xs font-mono ${
            isDarkMode ? 'border-neutral-800 bg-neutral-950 text-neutral-400' : 'border-neutral-300 bg-neutral-100 text-neutral-600'
          }`}
        >
          <strong>Notice of Originality:</strong> All characters, conceptual abilities, and sequences in <em>Xploration of Powers</em> are original student creations.
        </div>
      </div>
    </section>
  );
};
