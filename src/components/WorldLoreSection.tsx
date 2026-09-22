import React, { useState } from 'react';
import { WORLD_LORE } from '../data/mangaData';
import {
  Swords,
  Sparkles,
  ShieldAlert,
  Flame,
  Lock,
  Eye,
  Scroll,
  HelpCircle,
  AlertTriangle,
  Compass,
} from 'lucide-react';

interface WorldLoreSectionProps {
  isDarkMode: boolean;
  onReadClick: () => void;
}

export const WorldLoreSection: React.FC<WorldLoreSectionProps> = ({
  isDarkMode,
  onReadClick,
}) => {
  const [revealedSecret, setRevealedSecret] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'civilizations' | 'fusion' | 'secret' | 'dragon'>('civilizations');

  return (
    <section
      className={`py-12 sm:py-16 px-4 sm:px-6 border-b transition-colors ${
        isDarkMode
          ? 'border-neutral-800 bg-[#0e0e11] text-neutral-200'
          : 'border-neutral-300 bg-neutral-50 text-neutral-800'
      }`}
      id="world-lore-section"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="border-b-2 border-current pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border font-bold ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900 text-neutral-300'
                    : 'border-neutral-400 bg-white text-neutral-800'
                }`}
              >
                WORLD ARCHIVE // 60% FOUNDATION
              </span>
              <span className="font-japanese text-xs text-neutral-500">
                古代伝承・分裂の歴史
              </span>
            </div>
            <h2 className="font-manga-title text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
              THE CIVILIZATION RIOTS & THE SHATTERED STEEL
            </h2>
            <p className="font-sans-body text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
              Behind the classroom portal lies an ancient rift history: the catastrophic feud between the Fruit-Eaters and the Swordsmen, and the absolute law that prevents their forces from ever uniting.
            </p>
          </div>

          <button
            type="button"
            onClick={onReadClick}
            className={`self-start md:self-auto px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 transition-all shrink-0 ${
              isDarkMode
                ? 'border-white bg-white text-black hover:bg-neutral-200'
                : 'border-black bg-black text-white hover:bg-neutral-800'
            }`}
          >
            Read Chapter 01 →
          </button>
        </div>

        {/* Lore Nav Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('civilizations')}
            className={`px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider border transition-all ${
              activeTab === 'civilizations'
                ? isDarkMode
                  ? 'border-white bg-white text-black'
                  : 'border-black bg-black text-white'
                : isDarkMode
                ? 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                : 'border-neutral-300 bg-white text-neutral-600 hover:text-black'
            }`}
          >
            01 // The Two Civilizations & Riots
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fusion')}
            className={`px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider border transition-all ${
              activeTab === 'fusion'
                ? isDarkMode
                  ? 'border-white bg-white text-black'
                  : 'border-black bg-black text-white'
                : isDarkMode
                ? 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                : 'border-neutral-300 bg-white text-neutral-600 hover:text-black'
            }`}
          >
            02 // The Shattered Blade Law (60% Lore)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('secret')}
            className={`px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider border transition-all flex items-center gap-1.5 ${
              activeTab === 'secret'
                ? isDarkMode
                  ? 'border-white bg-white text-black'
                  : 'border-black bg-black text-white'
                : isDarkMode
                ? 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                : 'border-neutral-300 bg-white text-neutral-600 hover:text-black'
            }`}
          >
            <Lock className="w-3 h-3" />
            <span>03 // Secret: The Twin Blades</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dragon')}
            className={`px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider border transition-all flex items-center gap-1.5 ${
              activeTab === 'dragon'
                ? isDarkMode
                  ? 'border-white bg-white text-black'
                  : 'border-black bg-black text-white'
                : isDarkMode
                ? 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                : 'border-neutral-300 bg-white text-neutral-600 hover:text-black'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>04 // Slumbering Dragon Whisper</span>
          </button>
        </div>

        {/* Tab 01: Civilizations and Riots */}
        {activeTab === 'civilizations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fruit-Eater Civilization */}
            <div
              className={`p-6 border-2 relative overflow-hidden ${
                isDarkMode
                  ? 'border-neutral-800 bg-neutral-950/80'
                  : 'border-neutral-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3 border-b pb-2 border-neutral-700/50">
                <span className="font-japanese text-lg font-bold text-neutral-400">
                  {WORLD_LORE.civilizationClash.fruitCivilization.japanese}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-neutral-700">
                  PRIMORDIAL FLORA
                </span>
              </div>
              <h3 className="font-manga-title text-2xl font-black uppercase mb-2">
                {WORLD_LORE.civilizationClash.fruitCivilization.name}
              </h3>
              <p className="font-sans-body text-sm text-neutral-300 dark:text-neutral-300 leading-relaxed mb-4">
                {WORLD_LORE.civilizationClash.fruitCivilization.concept}
              </p>
              <div className="p-3 border text-xs font-mono bg-neutral-900/60 border-neutral-800 text-neutral-400">
                <strong>Manifestations:</strong> Tiger ferocity, relativistic Light, dimensional Portals, volatile Gas, living Art constructs.
              </div>
            </div>

            {/* Swordsman Civilization */}
            <div
              className={`p-6 border-2 relative overflow-hidden ${
                isDarkMode
                  ? 'border-neutral-800 bg-neutral-950/80'
                  : 'border-neutral-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3 border-b pb-2 border-neutral-700/50">
                <span className="font-japanese text-lg font-bold text-neutral-400">
                  {WORLD_LORE.civilizationClash.swordsmanCivilization.japanese}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-neutral-700">
                  DISCIPLINE & STEEL
                </span>
              </div>
              <h3 className="font-manga-title text-2xl font-black uppercase mb-2">
                {WORLD_LORE.civilizationClash.swordsmanCivilization.name}
              </h3>
              <p className="font-sans-body text-sm text-neutral-300 dark:text-neutral-300 leading-relaxed mb-4">
                {WORLD_LORE.civilizationClash.swordsmanCivilization.concept}
              </p>
              <div className="p-3 border text-xs font-mono bg-neutral-900/60 border-neutral-800 text-neutral-400">
                <strong>Philosophy:</strong> Absolute rejection of consumed supernatural fruit. The blade is an extension of pure uncorrupted human willpower.
              </div>
            </div>

            {/* The Historical Riots Context */}
            <div
              className={`md:col-span-2 p-5 border ${
                isDarkMode ? 'border-neutral-800 bg-neutral-950/60' : 'border-neutral-300 bg-neutral-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 mt-0.5 text-neutral-400 shrink-0" />
                <div>
                  <h4 className="font-mono text-sm font-bold uppercase tracking-wider mb-1">
                    HISTORICAL CONFLICT: THE CENTURY OF RIOTS
                  </h4>
                  <p className="font-sans-body text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    This was not a noble tournament or friendly rivalry. Uncontrolled riots, ideological bloodshed, and territorial purges raged for generations as both civilizations fought for sovereignty. The scars of those riots remain etched into ancient ruins—and are about to repeat among modern students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 02: The Shattered Blade Law */}
        {activeTab === 'fusion' && (
          <div
            className={`p-6 sm:p-8 border-2 ${
              isDarkMode
                ? 'border-neutral-700 bg-neutral-950 text-neutral-200'
                : 'border-neutral-400 bg-white text-neutral-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3 mb-4">
              <div>
                <span className="font-japanese text-xl font-bold text-neutral-400 block">
                  {WORLD_LORE.forbiddenFusionRule.japanese}
                </span>
                <h3 className="font-manga-title text-2xl sm:text-3xl font-black uppercase">
                  {WORLD_LORE.forbiddenFusionRule.ruleName}
                </h3>
              </div>
              <span className="px-3 py-1 font-mono text-xs uppercase tracking-widest border border-current font-bold self-start sm:self-auto">
                {WORLD_LORE.forbiddenFusionRule.lorePercent}
              </span>
            </div>

            <p className="font-sans-body text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
              {WORLD_LORE.forbiddenFusionRule.description}
            </p>

            {/* Manga Style Graphic Panel Representation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-left">
              <div className="p-4 border border-neutral-800 bg-neutral-900/50">
                <span className="text-[10px] text-neutral-500 uppercase block mb-1">STEP 01 // CONTACT</span>
                <strong className="block text-sm text-white mb-1">Fruit Power Meets Steel</strong>
                <p className="text-neutral-400 font-sans-body text-xs">
                  A fruit user attempts to grasp a consecrated sword or coat the edge in elemental energy.
                </p>
              </div>

              <div className="p-4 border border-neutral-800 bg-neutral-900/50">
                <span className="text-[10px] text-neutral-500 uppercase block mb-1">STEP 02 // REJECTION</span>
                <strong className="block text-sm text-white mb-1">Violent Resonance</strong>
                <p className="text-neutral-400 font-sans-body text-xs">
                  The cold forged steel violently rejects the alien biological fruit aura, ringing with high-pitch screeching.
                </p>
              </div>

              <div className="p-4 border border-neutral-700 bg-neutral-900/90 shadow-[2px_2px_0px_0px_currentColor]">
                <span className="text-[10px] text-neutral-400 uppercase block mb-1">STEP 03 // CATASTROPHE</span>
                <strong className="block text-sm text-white mb-1">The Blade Shatters</strong>
                <p className="text-neutral-300 font-sans-body text-xs">
                  The sword fractures from tip to hilt, exploding into harmless brittle glass-like dust. Fusion is impossible.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 03: Classified Secret of the Twin Blades */}
        {activeTab === 'secret' && (
          <div
            className={`p-6 sm:p-8 border-2 border-dashed relative ${
              isDarkMode
                ? 'border-neutral-600 bg-neutral-950 text-neutral-200'
                : 'border-neutral-400 bg-white text-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-neutral-800 text-white dark:bg-white dark:text-black uppercase">
                  {WORLD_LORE.classifiedSecret.badge}
                </span>
                <span className="font-japanese text-sm text-neutral-400">
                  {WORLD_LORE.classifiedSecret.japanese}
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">
                CONFIDENTIAL DOSSIER
              </span>
            </div>

            <h3 className="font-manga-title text-2xl sm:text-3xl font-black uppercase mb-3 flex items-center gap-2">
              <Swords className="w-6 h-6 text-neutral-400" />
              <span>{WORLD_LORE.classifiedSecret.title}</span>
            </h3>

            <p className="font-sans-body text-sm sm:text-base leading-relaxed max-w-3xl mb-5">
              {WORLD_LORE.classifiedSecret.description}
            </p>

            <div
              className={`p-4 border text-xs font-mono leading-relaxed ${
                isDarkMode ? 'border-neutral-800 bg-neutral-900/80' : 'border-neutral-300 bg-neutral-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <strong className="text-neutral-200 uppercase">
                  {revealedSecret ? 'DECRYPTED INTEL: THE SWORD INHERITORS' : 'CLASSIFIED: 2 STUDENTS CHOSEN'}
                </strong>
                <button
                  type="button"
                  onClick={() => setRevealedSecret(!revealedSecret)}
                  className="underline text-[11px] hover:text-white"
                >
                  {revealedSecret ? '[Re-hide Clue]' : '[Click to Unseal Clue]'}
                </button>
              </div>
              {revealedSecret ? (
                <p className="text-neutral-300 font-sans-body">
                  "While the classroom is marveling at claws, blinding rays, and dimensional gates, two quiet students carried no physical aura after exiting the portal. In their lockers, two ancient sheaths await awakening. If the fruit users discover what these blades mean, the ancient civil riots could reignite inside school walls."
                </p>
              ) : (
                <p className="text-neutral-500 font-sans-body italic">
                  [CLASSIFIED REDACTION: Two students in the core group carry the lineage of the Swordsmen. Click to unseal the rumor.]
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tab 04: The Tiny Dragon Hint */}
        {activeTab === 'dragon' && (
          <div
            className={`p-6 sm:p-8 border-2 relative overflow-hidden ${
              isDarkMode
                ? 'border-neutral-800 bg-neutral-950 text-neutral-300'
                : 'border-neutral-300 bg-white text-neutral-800'
            }`}
          >
            <div className="absolute right-4 top-4 font-japanese text-7xl font-black text-neutral-800/20 dark:text-neutral-800/40 pointer-events-none select-none">
              龍
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-neutral-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                MYTHOLOGICAL WHISPER
              </span>
              <span className="font-japanese text-xs text-neutral-500">
                {WORLD_LORE.dragonWhisper.japanese}
              </span>
            </div>

            <h3 className="font-manga-title text-2xl sm:text-3xl font-black uppercase mb-3">
              THE SLUMBERING SOVEREIGN
            </h3>

            <blockquote className="border-l-2 border-neutral-500 pl-4 py-1 italic font-sans-body text-sm sm:text-base leading-relaxed text-neutral-300 dark:text-neutral-200 max-w-2xl">
              {WORLD_LORE.dragonWhisper.hint}
            </blockquote>

            <p className="text-xs font-mono text-neutral-500 mt-4">
              <em>Note:</em> Neither the fruit masters nor the blade lords know who awakened the subterranean colossus... or why the portal opened directly above it.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
