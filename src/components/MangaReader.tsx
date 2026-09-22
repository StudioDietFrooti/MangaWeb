import React, { useState, useEffect, useRef } from 'react';
import { MangaChapter, ReaderMode, ReaderBackground, MangaPage } from '../types';
import { generatePlaceholderPageSvg } from '../data/mangaData';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
  Columns,
  BookOpen,
  ArrowLeft,
  Settings,
  Upload,
  RefreshCw,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff
} from 'lucide-react';

interface MangaReaderProps {
  chapters: MangaChapter[];
  currentChapterId: string;
  onSelectChapter: (id: string) => void;
  onBackToChapters: () => void;
  onUpdateChapterPage: (chapterId: string, pageIndex: number, imageUrl?: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const MangaReader: React.FC<MangaReaderProps> = ({
  chapters,
  currentChapterId,
  onSelectChapter,
  onBackToChapters,
  onUpdateChapterPage,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const currentChapter = chapters.find((c) => c.id === currentChapterId) || chapters[0];
  const pages = currentChapter.pages;

  // Reader States
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [readerMode, setReaderMode] = useState<ReaderMode>('vertical');
  const [minimalUi, setMinimalUi] = useState<boolean>(false);
  const [readerBg, setReaderBg] = useState<ReaderBackground>(isDarkMode ? 'ink' : 'paper');
  const [zoomLevel, setZoomLevel] = useState<number>(100); // 100%, 120%, 80%
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showPageUploadModal, setShowPageUploadModal] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sync readerBg with global dark mode if needed
  useEffect(() => {
    setReaderBg(isDarkMode ? 'ink' : 'paper');
  }, [isDarkMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      } else if (e.key === 'z' || e.key === 'Z') {
        setMinimalUi((prev) => !prev);
      } else if (e.key === 'Escape') {
        setMinimalUi(false);
        setShowSettings(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, pages.length, readerMode]);

  // Scroll listener for vertical mode to update current page number
  useEffect(() => {
    if (readerMode !== 'vertical') return;

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      pageRefs.current.forEach((el, index) => {
        if (!el) return;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY <= bottom) {
          setCurrentPageIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [readerMode, pages.length]);

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      const targetIndex = currentPageIndex - 1;
      setCurrentPageIndex(targetIndex);
      if (readerMode === 'vertical') {
        pageRefs.current[targetIndex]?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const goToNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      const targetIndex = currentPageIndex + 1;
      setCurrentPageIndex(targetIndex);
      if (readerMode === 'vertical') {
        pageRefs.current[targetIndex]?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const jumpToPage = (index: number) => {
    setCurrentPageIndex(index);
    if (readerMode === 'vertical') {
      pageRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageUpload = (pageIdx: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      onUpdateChapterPage(currentChapter.id, pageIdx, reader.result as string);
      setShowPageUploadModal(null);
    };
    reader.readAsDataURL(file);
  };

  const handleResetPage = (pageIdx: number) => {
    onUpdateChapterPage(currentChapter.id, pageIdx, undefined);
    setShowPageUploadModal(null);
  };

  // Background color calculation
  const getBgClasses = () => {
    if (readerBg === 'ink') return 'bg-[#09090b] text-[#eeeeee]';
    if (readerBg === 'paper') return 'bg-[#f4f4f5] text-[#111111]';
    return 'bg-[#1e1e24] text-[#e0e0e0]';
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen transition-colors duration-150 ${getBgClasses()} flex flex-col relative`}
      id="manga-reader-root"
    >
      {/* Top Reader Navigation Bar (Minimal & Auto-Hideable) */}
      <header
        className={`sticky top-0 z-30 transition-all duration-200 border-b ${
          readerBg === 'paper'
            ? 'bg-white/95 border-neutral-300 text-neutral-900 shadow-sm'
            : 'bg-neutral-950/95 border-neutral-800 text-neutral-100 shadow-md'
        } backdrop-blur-md px-3 sm:px-6 py-2.5 ${
          minimalUi ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
        id="reader-header-bar"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          
          {/* Back & Chapter Information */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onBackToChapters}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 border text-xs font-mono font-bold flex items-center gap-1 transition-colors ${
                readerBg === 'paper'
                  ? 'border-neutral-400 bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                  : 'border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800'
              }`}
              id="btn-back-to-chapters"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Chapters</span>
            </button>

            {/* Chapter Selector Dropdown */}
            <div className="relative">
              <select
                value={currentChapter.id}
                onChange={(e) => onSelectChapter(e.target.value)}
                className={`text-xs font-mono font-bold py-1.5 px-2.5 border appearance-none pr-7 cursor-pointer uppercase ${
                  readerBg === 'paper'
                    ? 'border-neutral-400 bg-white text-black'
                    : 'border-neutral-700 bg-neutral-900 text-white'
                }`}
                id="reader-chapter-selector"
              >
                {chapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    CH. {ch.number.toString().padStart(2, '0')}: {ch.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                ▼
              </div>
            </div>
          </div>

          {/* Center: Page Counter */}
          <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-bold tracking-wider">
            <span className="text-neutral-500 hidden sm:inline">Page</span>
            <span className="px-2 py-0.5 border border-current">
              {currentPageIndex + 1}
            </span>
            <span className="text-neutral-500">/</span>
            <span>{pages.length}</span>
          </div>

          {/* Right: Layout Switchers & Zen Mode */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Mode Switcher: Vertical Continuous vs Single Page vs Grid */}
            <div
              className={`flex items-center border p-0.5 ${
                readerBg === 'paper' ? 'border-neutral-300 bg-neutral-100' : 'border-neutral-800 bg-neutral-900'
              }`}
            >
              <button
                type="button"
                onClick={() => setReaderMode('vertical')}
                className={`p-1.5 text-xs font-mono flex items-center gap-1 ${
                  readerMode === 'vertical'
                    ? readerBg === 'paper'
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Continuous Vertical Scroll (Webtoon / Mobile Phone Friendly)"
                id="btn-mode-vertical"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Vertical</span>
              </button>

              <button
                type="button"
                onClick={() => setReaderMode('single')}
                className={`p-1.5 text-xs font-mono flex items-center gap-1 ${
                  readerMode === 'single'
                    ? readerBg === 'paper'
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Single Page Mode (Classic Manga Page Flip)"
                id="btn-mode-single"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Single</span>
              </button>

              <button
                type="button"
                onClick={() => setReaderMode('grid')}
                className={`p-1.5 text-xs font-mono flex items-center gap-1 ${
                  readerMode === 'grid'
                    ? readerBg === 'paper'
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Page Grid Overview"
                id="btn-mode-grid"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Grid</span>
              </button>
            </div>

            {/* Reader Settings Toggle */}
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className={`p-1.5 border transition-colors ${
                readerBg === 'paper'
                  ? 'border-neutral-300 hover:bg-neutral-100'
                  : 'border-neutral-800 hover:bg-neutral-900'
              }`}
              title="Reader Settings"
              id="btn-reader-settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Minimal UI / Zen Mode Toggle */}
            <button
              type="button"
              onClick={() => setMinimalUi(true)}
              className={`p-1.5 border transition-colors ${
                readerBg === 'paper'
                  ? 'border-neutral-300 hover:bg-neutral-100'
                  : 'border-neutral-800 hover:bg-neutral-900'
              }`}
              title="Enter Zen Minimal UI (Press 'Z' to toggle)"
              id="btn-zen-mode"
            >
              <EyeOff className="w-4 h-4" />
            </button>

          </div>
        </div>

        {/* Reader Settings Flyout */}
        {showSettings && (
          <div
            className={`mt-2.5 pt-2.5 border-t max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
              readerBg === 'paper' ? 'border-neutral-300' : 'border-neutral-800'
            }`}
          >
            {/* Background Theme */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Backdrop:</span>
              <button
                type="button"
                onClick={() => setReaderBg('ink')}
                className={`px-2 py-0.5 border ${
                  readerBg === 'ink' ? 'bg-white text-black font-bold border-white' : 'border-neutral-700'
                }`}
              >
                Ink Black
              </button>
              <button
                type="button"
                onClick={() => setReaderBg('paper')}
                className={`px-2 py-0.5 border ${
                  readerBg === 'paper' ? 'bg-black text-white font-bold border-black' : 'border-neutral-400'
                }`}
              >
                Paper White
              </button>
              <button
                type="button"
                onClick={() => setReaderBg('gray')}
                className={`px-2 py-0.5 border ${
                  readerBg === 'gray' ? 'bg-neutral-700 text-white font-bold' : 'border-neutral-700'
                }`}
              >
                Dark Slate
              </button>
            </div>

            {/* Zoom / Width Scale */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Scale:</span>
              <button
                type="button"
                onClick={() => setZoomLevel(Math.max(70, zoomLevel - 15))}
                className="p-1 border border-current"
                title="Scale Down"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="w-12 text-center">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel(Math.min(130, zoomLevel + 15))}
                className="p-1 border border-current"
                title="Scale Up"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Helper info */}
            <div className="text-neutral-400 text-[11px]">
              Tap page anytime or press <strong>Z</strong> to toggle minimal reading mode
            </div>
          </div>
        )}
      </header>

      {/* Floating Exit Minimal UI Button when Minimal UI is enabled */}
      {minimalUi && (
        <button
          type="button"
          onClick={() => setMinimalUi(false)}
          className="fixed top-3 right-3 z-50 p-2 bg-black/80 text-white border border-white/40 hover:bg-black transition-all flex items-center gap-1.5 text-xs font-mono backdrop-blur-md"
          title="Exit Minimal UI (Z)"
          id="btn-exit-minimal-ui"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Show Controls</span>
        </button>
      )}

      {/* READER CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col items-center justify-start w-full py-4 sm:py-8 px-2 sm:px-4">
        
        {/* MODE 1: VERTICAL CONTINUOUS STRIP (Webtoon style, optimal for phones) */}
        {readerMode === 'vertical' && (
          <div
            className="w-full flex flex-col items-center gap-4 sm:gap-6"
            style={{ maxWidth: `${Math.round(760 * (zoomLevel / 100))}px` }}
            id="vertical-pages-container"
          >
            {pages.map((page, index) => {
              const svgDataUrl = generatePlaceholderPageSvg(
                page.pageNumber,
                pages.length,
                currentChapter.title,
                index
              );
              const displaySrc = page.imageUrl || svgDataUrl;

              return (
                <div
                  key={page.id}
                  ref={(el) => {
                    pageRefs.current[index] = el;
                  }}
                  className="w-full relative group border border-neutral-800 shadow-xl bg-neutral-900"
                  id={`page-wrapper-${page.pageNumber}`}
                >
                  {/* Aspect Ratio Preservation: Standard Manga B5 / 1:1.414 ratio, strictly zero distortion or cropping */}
                  <div className="w-full relative aspect-[420/600] overflow-hidden">
                    <img
                      src={displaySrc}
                      alt={`Page ${page.pageNumber}`}
                      className="w-full h-full object-contain select-none block"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      id={`page-img-${page.pageNumber}`}
                    />
                  </div>

                  {/* Page upload & quick edit badge */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPageUploadModal(index)}
                      className="px-2 py-1 bg-black/90 text-white text-[10px] font-mono border border-neutral-700 hover:bg-white hover:text-black transition-colors flex items-center gap-1"
                      title="Upload scanned student drawing for this page"
                    >
                      <Upload className="w-3 h-3" />
                      <span>{page.imageUrl ? 'Replace Art' : 'Upload Page Art'}</span>
                    </button>
                    {page.imageUrl && (
                      <button
                        type="button"
                        onClick={() => handleResetPage(index)}
                        className="p-1 bg-black/90 text-white text-[10px] font-mono border border-neutral-700 hover:bg-red-900"
                        title="Revert to placeholder"
                      >
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Page indicator tag */}
                  <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-0.5 text-[10px] font-mono border border-neutral-700">
                    Page {page.pageNumber} / {pages.length}
                  </div>
                </div>
              );
            })}

            {/* End of Chapter notice and navigation */}
            <div
              className={`w-full p-6 sm:p-8 text-center border-2 my-8 ${
                readerBg === 'paper'
                  ? 'border-black bg-white text-black shadow-[4px_4px_0px_0px_#000]'
                  : 'border-neutral-700 bg-neutral-900 text-white shadow-[4px_4px_0px_0px_#222]'
              }`}
            >
              <span className="font-japanese text-2xl font-bold block mb-1">
                第一話 読了
              </span>
              <h3 className="font-manga-title text-3xl font-black uppercase tracking-wider mb-2">
                END OF CHAPTER 01: THE BEGINNING
              </h3>
              <p className="font-sans-body text-sm text-neutral-400 max-w-md mx-auto mb-6">
                You have reached the end of the available pages for Chapter 01. Stay tuned for Chapter 02 or submit an order request for the physical school printed booklet.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => jumpToPage(0)}
                  className="px-4 py-2 border border-current font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-500/20"
                >
                  Read Again from Page 1
                </button>
                <button
                  type="button"
                  onClick={onBackToChapters}
                  className="px-4 py-2 bg-neutral-100 text-black dark:bg-white font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90"
                >
                  View Chapter Library
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: SINGLE PAGE FLIP (Classic Manga Reader) */}
        {readerMode === 'single' && (
          <div
            className="w-full flex flex-col items-center"
            style={{ maxWidth: `${Math.round(620 * (zoomLevel / 100))}px` }}
            id="single-page-reader-container"
          >
            {/* Main Single Page Frame */}
            {pages[currentPageIndex] && (
              <div className="w-full relative border-2 border-neutral-800 shadow-2xl bg-neutral-900 group">
                <div
                  className="w-full aspect-[420/600] relative cursor-pointer overflow-hidden"
                  onClick={(e) => {
                    // Clicking right side advances page, left side goes back
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    if (clickX > rect.width / 2) {
                      goToNextPage();
                    } else {
                      goToPrevPage();
                    }
                  }}
                >
                  <img
                    src={
                      pages[currentPageIndex].imageUrl ||
                      generatePlaceholderPageSvg(
                        pages[currentPageIndex].pageNumber,
                        pages.length,
                        currentChapter.title,
                        currentPageIndex
                      )
                    }
                    alt={`Page ${pages[currentPageIndex].pageNumber}`}
                    className="w-full h-full object-contain select-none block"
                    id={`single-page-img-${currentPageIndex + 1}`}
                  />
                </div>

                {/* Single Page Actions overlay */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowPageUploadModal(currentPageIndex)}
                    className="px-2.5 py-1 bg-black/90 text-white text-xs font-mono border border-neutral-700 hover:bg-white hover:text-black flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Page {currentPageIndex + 1}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Controls under Single Page */}
            <div
              className={`w-full mt-4 p-3 border flex items-center justify-between gap-2 font-mono text-xs ${
                readerBg === 'paper'
                  ? 'border-neutral-300 bg-white text-neutral-900'
                  : 'border-neutral-800 bg-neutral-950 text-neutral-100'
              }`}
              id="single-page-controls"
            >
              <button
                type="button"
                onClick={goToPrevPage}
                disabled={currentPageIndex === 0}
                className="px-4 py-2 border border-current font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-500/20"
                id="btn-prev-page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Page</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-bold">
                  Page {currentPageIndex + 1} of {pages.length}
                </span>
                <span className="text-neutral-500 text-[11px] hidden sm:inline">
                  (Use ← / → keys or tap left/right)
                </span>
              </div>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPageIndex === pages.length - 1}
                className="px-4 py-2 border border-current font-bold uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none hover:bg-neutral-500/20"
                id="btn-next-page"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* MODE 3: RESPONSIVE GRID OVERVIEW (Thumbnail Jumper) */}
        {readerMode === 'grid' && (
          <div className="w-full max-w-5xl mx-auto py-2" id="grid-page-overview">
            <div className="flex items-center justify-between mb-4 border-b border-neutral-700 pb-2">
              <h3 className="font-manga-title text-2xl font-bold tracking-wider">
                CHAPTER 01 PAGES OVERVIEW ({pages.length} PAGES)
              </h3>
              <span className="text-xs font-mono text-neutral-400">
                Click any page to read
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {pages.map((page, index) => {
                const displaySrc =
                  page.imageUrl ||
                  generatePlaceholderPageSvg(
                    page.pageNumber,
                    pages.length,
                    currentChapter.title,
                    index
                  );

                return (
                  <div
                    key={page.id}
                    onClick={() => {
                      setCurrentPageIndex(index);
                      setReaderMode('single');
                    }}
                    className={`cursor-pointer border-2 transition-transform hover:-translate-y-1 group relative ${
                      currentPageIndex === index
                        ? 'border-white ring-2 ring-neutral-400'
                        : 'border-neutral-700 hover:border-neutral-300'
                    }`}
                  >
                    <div className="aspect-[420/600] w-full overflow-hidden bg-neutral-900">
                      <img
                        src={displaySrc}
                        alt={`Thumbnail Page ${page.pageNumber}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-1.5 bg-black/90 text-white flex items-center justify-between text-[11px] font-mono">
                      <span>P. {page.pageNumber}</span>
                      {page.imageUrl ? (
                        <span className="text-[9px] text-green-400">Custom</span>
                      ) : (
                        <span className="text-[9px] text-neutral-500">Draft</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* MODAL: Upload Real Manga Page Drawing */}
      {showPageUploadModal !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          id="modal-upload-page"
        >
          <div className="w-full max-w-md bg-neutral-950 border-2 border-white text-white p-6 font-mono text-xs">
            <h3 className="font-manga-title text-2xl font-bold uppercase mb-2">
              UPLOAD MANGA ARTWORK — PAGE {showPageUploadModal + 1}
            </h3>
            <p className="text-neutral-400 mb-4 font-sans-body leading-relaxed text-sm">
              Upload your scanned ink drawing, pencil sketch, or digital manga export for Page {showPageUploadModal + 1}. The image aspect ratio will be naturally preserved without stretching.
            </p>

            <div className="border-2 border-dashed border-neutral-600 p-6 text-center mb-4">
              <input
                type="file"
                id="page-file-input"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePageUpload(showPageUploadModal, file);
                }}
                className="hidden"
              />
              <label
                htmlFor="page-file-input"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200"
              >
                <Upload className="w-4 h-4" />
                <span>Choose Image File</span>
              </label>
              <span className="block text-[10px] text-neutral-500 mt-2">
                PNG, JPG, or WEBP supported
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setShowPageUploadModal(null)}
                className="px-4 py-2 border border-neutral-700 text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
