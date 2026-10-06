import React, { useState } from 'react';
import {
  X,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface PartInfo {
  number: number;
  title: string;
  name: string;
  status: 'Available';
  pages: number;
  badge: string;
}

const PARTS: PartInfo[] = [
  {
    number: 1,
    title: 'Part 1',
    name: 'The beginning',
    status: 'Available',
    pages: 11,
    badge: '1.1 Manga Pages',
  },
];

interface MoreMangaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoreMangaModal: React.FC<MoreMangaModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reader' | 'characters'>('overview');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  if (!isOpen) return null;

  const currentPartObj = PARTS[0];
  const totalPages = currentPartObj.pages;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl flex flex-col bg-[#111319]/95 max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl glass-button-circle text-white bg-white/10 border border-white/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  XPLORATION OF POWERS
                </h2>
                <span className="glass-pill px-2.5 py-0.5 text-[10px] font-semibold text-white bg-white/10 border border-white/20">
                  Part 1: The beginning • 1.1 Manga Pages
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Official DietFrooti Studio • Created by JIGYAS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View switcher */}
            <div className="hidden sm:flex items-center glass-pill p-1 border border-white/10">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  activeTab === 'overview' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('reader')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  activeTab === 'reader' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Read 1.1 Manga Pages
              </button>
              <button
                onClick={() => setActiveTab('characters')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  activeTab === 'characters' ? 'bg-white/20 text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Characters
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full glass-button-circle text-neutral-400 hover:text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-6 animate-in fade-in">
              {/* Hero Showcase Card */}
              <div className="glass-card rounded-3xl p-6 flex flex-col md:flex-row gap-6 border border-white/10">
                {/* Manga Cover Area */}
                <div className="w-full md:w-56 aspect-square rounded-2xl overflow-hidden relative shrink-0 border border-white/20 bg-neutral-900 shadow-xl group">
                  <img
                    src="/assets/xploration_cover.jpg"
                    alt="Xploration of Powers Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-300">
                      DietFrooti Original
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      Part 1: The beginning
                    </h3>
                    <span className="text-[10px] text-emerald-400 font-mono mt-0.5">
                      1.1 Manga Pages
                    </span>
                  </div>
                </div>

                {/* Manga Information */}
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="glass-pill px-3 py-0.5 text-xs font-semibold text-white bg-white/10 border border-white/20">
                        DIETFROOTI
                      </span>
                      <span className="glass-pill px-3 py-0.5 text-xs text-neutral-300">
                        Creator: JIGYAS
                      </span>
                      <span className="glass-pill px-3 py-0.5 text-xs text-emerald-400 border border-emerald-500/20">
                        1.1 Manga Pages Available
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      XPLORATION OF POWERS
                    </h1>

                    <p className="text-sm text-neutral-300 font-medium italic mt-2">
                      “An independent story about power, people, and the choices between them.”
                    </p>

                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-3">
                      Follow the students awakening extraordinary abilities beyond the ordinary realm.
                      When dormant forces of Tiger, Light, Portal, Gas, Art, and Fire emerge, each carrier must navigate their choices, bonds, and the true cost of mastery.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setCurrentPage(1);
                        setActiveTab('reader');
                      }}
                      className="bg-white hover:bg-neutral-100 text-neutral-900 font-bold px-6 py-2.5 rounded-full text-xs sm:text-sm flex items-center gap-2 shadow-xl transition"
                    >
                      <BookOpen className="w-4 h-4 fill-neutral-900" />
                      <span>Read Part 1: The beginning (1.1 Manga Pages)</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('characters')}
                      className="glass-pill px-5 py-2.5 text-xs sm:text-sm text-neutral-300 hover:text-white border border-white/20 transition"
                    >
                      Character Archive
                    </button>
                  </div>
                </div>
              </div>

              {/* Release Card */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    Official Manga Release
                  </h3>
                  <span className="text-xs text-emerald-400 font-mono">
                    Part 1 • 1.1 Manga Pages
                  </span>
                </div>

                <div
                  className="rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border glass-card border-white/25 hover:border-white/40 cursor-pointer bg-white/[0.04] transition"
                  onClick={() => {
                    setCurrentPage(1);
                    setActiveTab('reader');
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl glass-button-circle text-white bg-white/10 border border-white/20 shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">
                          Part 1: The beginning
                        </span>
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          1.1 Manga Pages
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Official debut release by StudioDietFrooti • Created by JIGYAS
                      </p>
                    </div>
                  </div>

                  <button className="glass-pill px-5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 flex items-center gap-1.5 transition border border-white/20 shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open 1.1 Reader</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reader' && (
            <div className="flex flex-col gap-4 animate-in fade-in">
              {/* Reader Controls Toolbar */}
              <div className="glass-card rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 border border-white/15">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    Part 1: The beginning
                  </span>
                  <span className="glass-pill px-2 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/20">
                    1.1 Manga Pages
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    • Page {currentPage} of {totalPages}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                    className="w-8 h-8 rounded-full glass-button-circle text-neutral-300 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono text-neutral-400 w-12 text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                    className="w-8 h-8 rounded-full glass-button-circle text-neutral-300 hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  <div className="h-4 w-px bg-white/15 mx-1" />

                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="glass-pill px-3 py-1 text-xs text-white disabled:opacity-40 flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="glass-pill px-3 py-1 text-xs text-white disabled:opacity-40 flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Reader Canvas Area */}
              <div className="relative w-full rounded-2xl bg-[#090a0d] border border-white/10 flex flex-col items-center justify-center p-4 sm:p-8 min-h-[550px] overflow-hidden select-none">
                <div
                  className="transition-all duration-300 max-w-xl w-full aspect-[1/1.42] rounded-xl bg-[#0f1117] border border-white/10 shadow-2xl flex flex-col items-center justify-between p-6 relative overflow-hidden text-center"
                  style={{ transform: `scale(${zoomLevel / 100})` }}
                >
                  {/* Subtle screentone pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
                      backgroundSize: '8px 8px',
                    }}
                  />

                  {/* Top Page Header */}
                  <div className="w-full flex items-center justify-between text-[11px] text-neutral-500 font-mono border-b border-white/10 pb-2">
                    <span>XPLORATION OF POWERS</span>
                    <span>1.1 MANGA PAGES</span>
                  </div>

                  {/* Center Content: Page 1 shows original manga cover, other pages show panels */}
                  {currentPage === 1 ? (
                    <div className="flex-1 w-full h-full flex flex-col items-center justify-center p-2">
                      <div className="w-full max-w-md aspect-square rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                        <img
                          src="/assets/xploration_cover.jpg"
                          alt="Xploration of Powers Cover Page"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 mt-3">
                        Official Cover • 1.1 Manga Pages
                      </span>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 p-4">
                      <div className="w-16 h-16 rounded-2xl border border-white/20 bg-white/5 flex items-center justify-center text-neutral-300">
                        <BookOpen className="w-8 h-8" />
                      </div>
                      <span className="text-xs uppercase font-mono tracking-widest text-emerald-400">
                        Part 1: The beginning • 1.1 Manga Pages
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        Page {currentPage} of {totalPages}
                      </h3>
                      <p className="text-xs text-neutral-400 max-w-xs">
                        Official DietFrooti Release • Created by JIGYAS
                      </p>
                    </div>
                  )}

                  {/* Bottom Page Number */}
                  <div className="w-full flex items-center justify-between text-[11px] text-neutral-500 font-mono border-t border-white/10 pt-2">
                    <span>Creator: JIGYAS</span>
                    <span>1.1 Manga Pages</span>
                  </div>
                </div>

                {/* Left / Right Click Nav Overlays */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-button-circle text-white disabled:opacity-0 transition"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-button-circle text-white disabled:opacity-0 transition"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'characters' && (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Main Characters Archive
                </h3>
                <p className="text-xs text-neutral-400">
                  Six carriers awakening elemental and conceptual powers in Xploration of Powers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { id: '01', name: 'Renji Kurogane', power: 'Tiger', color: 'from-amber-500/20' },
                  { id: '02', name: 'Kaizen Vex', power: 'Light', color: 'from-yellow-400/20' },
                  { id: '03', name: 'Aya Morikawa', power: 'Portal', color: 'from-purple-500/20' },
                  { id: '04', name: 'Mikage Sora', power: 'Gas', color: 'from-emerald-500/20' },
                  { id: '05', name: 'Akira Sol', power: 'Art', color: 'from-blue-500/20' },
                  { id: '06', name: 'Ren Aoki', power: 'Fire', color: 'from-rose-500/20' },
                ].map((char) => (
                  <div
                    key={char.id}
                    className={`rounded-2xl p-4 glass-card border border-white/10 bg-gradient-to-br ${char.color} to-transparent flex flex-col justify-between gap-3`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-neutral-400">#{char.id}</span>
                      <span className="glass-pill px-2.5 py-0.5 text-[10px] font-bold text-white border border-white/20">
                        Power: {char.power}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {char.name}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Xploration of Powers Main Cast
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-500">
                      <span>DietFrooti Original</span>
                      <span>1.1 Manga Pages</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
