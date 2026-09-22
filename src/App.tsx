import React, { useState, useEffect } from 'react';
import { ViewTab, MangaChapter } from './types';
import {
  getStoredChapters,
  saveStoredChapters,
  getCustomCover,
  setCustomCover,
  INITIAL_CHAPTERS,
} from './data/mangaData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MangaReader } from './components/MangaReader';
import { ChapterLibrary } from './components/ChapterLibrary';
import { OrderForm } from './components/OrderForm';
import { AboutSection } from './components/AboutSection';
import { WorldLoreSection } from './components/WorldLoreSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [chapters, setChapters] = useState<MangaChapter[]>(() => getStoredChapters());
  const [currentChapterId, setCurrentChapterId] = useState<string>(() => {
    const initial = getStoredChapters();
    return initial[0]?.id || 'ch-1';
  });
  const [customCover, setCustomCoverState] = useState<string | null>(() => getCustomCover());
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Sync html element class for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0c0c0e';
      document.body.style.color = '#f2f2f2';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#111111';
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleCoverChange = (dataUrl: string | null) => {
    setCustomCover(dataUrl);
    setCustomCoverState(dataUrl);
  };

  const handleUpdateChapterTitle = (chapterId: string, newTitle: string, subtitle?: string) => {
    const updated = chapters.map((ch) =>
      ch.id === chapterId ? { ...ch, title: newTitle, subtitle: subtitle || ch.subtitle } : ch
    );
    setChapters(updated);
    saveStoredChapters(updated);
  };

  const handleAddNewChapter = (title: string, subtitle?: string) => {
    const nextNum = chapters.length + 1;
    const newPages = Array.from({ length: 12 }, (_, i) => ({
      id: `ch${nextNum}-p${i + 1}`,
      pageNumber: i + 1,
      placeholderTitle: `Chapter ${nextNum} - Page ${i + 1}`,
      placeholderNotes: `Story sequence`,
    }));

    const newChapter: MangaChapter = {
      id: `ch-${nextNum}`,
      number: nextNum,
      title,
      subtitle: subtitle || undefined,
      isAvailable: true,
      pages: newPages,
      releaseNote: `Chapter ${nextNum.toString().padStart(2, '0')} added to archive.`,
    };

    const updated = [...chapters, newChapter];
    setChapters(updated);
    saveStoredChapters(updated);
  };

  const handleUpdateChapterPage = (chapterId: string, pageIndex: number, imageUrl?: string) => {
    const updated = chapters.map((ch) => {
      if (ch.id !== chapterId) return ch;
      const newPages = [...ch.pages];
      if (newPages[pageIndex]) {
        newPages[pageIndex] = {
          ...newPages[pageIndex],
          imageUrl,
        };
      }
      return { ...ch, pages: newPages };
    });
    setChapters(updated);
    saveStoredChapters(updated);
  };

  const handleSelectChapterAndRead = (chapterId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentTab('read');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans-body transition-colors duration-150 ${
        isDarkMode ? 'bg-[#0c0c0e] text-[#f2f2f2]' : 'bg-[#ffffff] text-[#111111]'
      }`}
      id="app-root"
    >
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isReaderModeActive={currentTab === 'read'}
      />

      {/* Main View Switcher */}
      <div className="flex-1 pb-16 md:pb-0">
        {currentTab === 'home' && (
          <div>
            <Hero
              onNavigate={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              customCover={customCover}
              onCoverChange={handleCoverChange}
              isDarkMode={isDarkMode}
            />

            {/* Ancient World Lore: Civilizations, Forbidden Sword Fusion, Secret Blades & Dragon */}
            <WorldLoreSection
              isDarkMode={isDarkMode}
              onReadClick={() => handleSelectChapterAndRead('ch-1')}
            />

            {/* Quick Featured Chapter 01 Section on Homepage */}
            <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
              <div className="border-b-2 border-current pb-4 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-neutral-500 tracking-wider block">
                    FEATURED EPISODE
                  </span>
                  <h2 className="font-manga-title text-3xl font-black uppercase">
                    CHAPTER 01: THE BEGINNING
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => handleSelectChapterAndRead('ch-1')}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 ${
                    isDarkMode
                      ? 'border-white bg-white text-black hover:bg-neutral-200'
                      : 'border-black bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  Start Reading →
                </button>
              </div>

              {/* Teaser 3-page panel preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((pageNum) => (
                  <div
                    key={pageNum}
                    onClick={() => handleSelectChapterAndRead('ch-1')}
                    className="border border-neutral-700 bg-neutral-900 p-2 cursor-pointer group hover:border-white transition-colors"
                  >
                    <div className="aspect-[420/600] w-full bg-neutral-950 overflow-hidden relative">
                      <div className="absolute inset-0 screentone-dots opacity-40" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                        <span className="font-japanese text-3xl font-black text-neutral-400 group-hover:text-white transition-colors">
                          {pageNum === 1 ? '始' : pageNum === 2 ? '覚' : '動'}
                        </span>
                        <span className="text-xs font-mono font-bold uppercase text-neutral-300 mt-2">
                          PAGE {pageNum}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 mt-1">
                          Click to open reader
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentTab === 'read' && (
          <MangaReader
            chapters={chapters}
            currentChapterId={currentChapterId}
            onSelectChapter={(id) => setCurrentChapterId(id)}
            onBackToChapters={() => setCurrentTab('chapters')}
            onUpdateChapterPage={handleUpdateChapterPage}
            isDarkMode={isDarkMode}
            onToggleDarkMode={handleToggleDarkMode}
          />
        )}

        {currentTab === 'chapters' && (
          <ChapterLibrary
            chapters={chapters}
            onSelectChapter={handleSelectChapterAndRead}
            onUpdateChapterTitle={handleUpdateChapterTitle}
            onAddNewChapter={handleAddNewChapter}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'order' && <OrderForm isDarkMode={isDarkMode} />}

        {currentTab === 'about' && <AboutSection isDarkMode={isDarkMode} />}
      </div>

      {/* Persistent Monochrome Footer */}
      {currentTab !== 'read' && (
        <Footer
          onNavigate={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
