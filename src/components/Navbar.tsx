import React from 'react';
import { ViewTab } from '../types';
import { BookOpen, Home, ListOrdered, ShoppingBag, Info, Moon, Sun, Bookmark } from 'lucide-react';

interface NavbarProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isReaderModeActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  isDarkMode,
  onToggleDarkMode,
  isReaderModeActive = false,
}) => {
  const navItems: { id: ViewTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'read', label: 'Read', icon: <BookOpen className="w-4 h-4" />, badge: 'CH.1' },
    { id: 'chapters', label: 'Chapters', icon: <ListOrdered className="w-4 h-4" /> },
    { id: 'order', label: 'Order', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top Desktop / Tablet Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-150 border-b ${
          isDarkMode
            ? 'bg-[#0c0c0e]/95 border-neutral-800 text-neutral-100'
            : 'bg-[#ffffff]/95 border-neutral-300 text-neutral-900'
        } backdrop-blur-md`}
        id="main-navbar"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand & Kanji Logo */}
          <button
            type="button"
            onClick={() => onTabChange('home')}
            className="flex items-center gap-3 group text-left"
            id="nav-brand-logo"
          >
            {/* Japanese Seal / Stamp style badge */}
            <div
              className={`w-9 h-9 border-2 flex items-center justify-center font-japanese font-black text-sm tracking-tighter transition-transform group-hover:scale-105 ${
                isDarkMode
                  ? 'border-neutral-200 bg-neutral-900 text-white'
                  : 'border-black bg-white text-black'
              }`}
            >
              力
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-manga-title text-xl sm:text-2xl tracking-wide font-black leading-none block">
                  XPLORATION OF POWERS
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                <span className="font-japanese font-semibold">力の探求</span>
                <span>•</span>
                <span>ORIGINAL STUDENT MANGA</span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`relative px-3.5 py-2 text-xs font-mono tracking-wider font-semibold uppercase transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? isDarkMode
                        ? 'bg-neutral-100 text-black shadow-sm'
                        : 'bg-black text-white shadow-sm'
                      : isDarkMode
                      ? 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded-none font-bold ${
                        isActive
                          ? isDarkMode
                            ? 'bg-black text-white'
                            : 'bg-white text-black'
                          : isDarkMode
                          ? 'bg-neutral-800 text-neutral-300'
                          : 'bg-neutral-200 text-neutral-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle & Quick Read Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onToggleDarkMode}
              className={`p-2 border transition-colors ${
                isDarkMode
                  ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700'
                  : 'border-neutral-300 bg-neutral-50 text-neutral-700 hover:text-black hover:border-neutral-400'
              }`}
              title={isDarkMode ? 'Switch to Paper White Mode' : 'Switch to Ink Black Mode'}
              aria-label="Toggle Manga Canvas Contrast"
              id="btn-toggle-theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {currentTab !== 'read' && (
              <button
                type="button"
                onClick={() => onTabChange('read')}
                className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase font-bold tracking-wider border-2 transition-all ${
                  isDarkMode
                    ? 'border-white bg-white text-black hover:bg-neutral-200'
                    : 'border-black bg-black text-white hover:bg-neutral-800'
                } shadow-[2px_2px_0px_0px_currentColor]`}
                id="btn-header-read-action"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Read Ch. 01</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar for natural phone thumb reach */}
      {!isReaderModeActive && (
        <nav
          className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t transition-colors ${
            isDarkMode
              ? 'bg-[#0c0c0e]/98 border-neutral-800 text-neutral-300'
              : 'bg-[#ffffff]/98 border-neutral-300 text-neutral-800'
          } backdrop-blur-lg px-2 py-1`}
          id="mobile-bottom-nav"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`flex flex-col items-center justify-center py-1.5 px-3 text-[10px] font-mono tracking-wider transition-colors relative ${
                    isActive
                      ? isDarkMode
                        ? 'text-white font-bold'
                        : 'text-black font-bold'
                      : 'text-neutral-500 hover:text-neutral-400'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  <div className="relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-1.5 -right-3 text-[8px] bg-neutral-900 text-white dark:bg-white dark:text-black font-mono font-bold px-1 py-0.2 scale-90">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="mt-1">{item.label}</span>
                  {isActive && (
                    <span
                      className={`absolute bottom-0 w-6 h-0.5 ${
                        isDarkMode ? 'bg-white' : 'bg-black'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};
