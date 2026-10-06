import React, { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Settings as SettingsIcon,
  Heart,
  ShieldCheck,
  LogIn,
  BookOpen,
} from 'lucide-react';
import { UserProfile } from '../types';

interface TopContainerNavProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  user: UserProfile | null;
  onOpenMoreManga: () => void;
  onOpenSignIn: () => void;
  onOpenSettings: () => void;
  onSignOut: () => void;
  onOpenFavorites: () => void;
  onOpenNotifications?: () => void;
}

export const TopContainerNav: React.FC<TopContainerNavProps> = ({
  searchQuery,
  onSearchChange,
  user,
  onOpenMoreManga,
  onOpenSignIn,
  onOpenSettings,
  onSignOut,
  onOpenFavorites,
  onOpenNotifications,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <nav className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-20">
      {/* LEFT: Search field */}
      <div className="w-full md:w-64 lg:w-72 relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search titles, manga..."
            className="w-full glass-input text-neutral-200 placeholder:text-neutral-500 text-sm rounded-full pl-10 pr-4 py-2 focus:ring-1 focus:ring-white/20 transition border border-white/10"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-xs text-neutral-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* CENTER: Replaced all animation, movie, more series options with just "More manga" */}
      <div className="flex items-center justify-center">
        <button
          onClick={onOpenMoreManga}
          className="px-5 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-[0_2px_12px_rgba(255,255,255,0.08)] transform hover:scale-[1.03] active:scale-[0.98]"
          title="Explore original manga catalog"
        >
          <BookOpen className="w-4 h-4 text-neutral-300" />
          <span>More manga</span>
        </button>
      </div>

      {/* RIGHT: Notifications & User Account Section */}
      <div className="flex items-center gap-3 self-end md:self-auto relative">
        {/* Notification Bell with tiny green dot */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            title="Notifications"
            className="w-9 h-9 glass-button-circle text-neutral-300 hover:text-white relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#171920]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 glass-panel rounded-2xl p-3 shadow-2xl z-50 border border-white/15 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="text-xs font-semibold text-white">Stream Notifications</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full">New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] transition">
                  <p className="text-white font-medium">Xploration of Powers Ch. 02</p>
                  <p className="text-neutral-400 text-[11px]">New original manga chapter released</p>
                  <span className="text-[10px] text-neutral-500">10m ago</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] transition">
                  <p className="text-white font-medium">Download Ready</p>
                  <p className="text-neutral-400 text-[11px]">Severance Episode 4 completed</p>
                  <span className="text-[10px] text-neutral-500">1h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Account Controls */}
        {user ? (
          /* Signed In View: Shows real Gmail / Google Profile Pic, User's Name and Email */
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 py-1 px-2.5 rounded-full hover:bg-white/[0.07] transition text-left group border border-white/10"
              aria-label="User account menu"
            >
              {/* Genuine Google / Gmail profile picture */}
              <div className="w-9 h-9 rounded-full overflow-hidden border border-white/25 bg-neutral-800 shrink-0 shadow-sm relative">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Username and Gmail address */}
              <div className="hidden sm:flex flex-col leading-tight max-w-[130px]">
                <span className="text-sm font-semibold text-white tracking-tight truncate group-hover:text-neutral-100">
                  {user.name}
                </span>
                <span className="text-[11px] text-neutral-400 group-hover:text-neutral-300 truncate font-mono">
                  {user.email.split('@')[0]}
                </span>
              </div>

              {/* Dropdown Arrow */}
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 group-hover:text-white transition-transform ${
                  profileDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 glass-panel rounded-2xl p-2.5 shadow-2xl z-50 border border-white/20 animate-in fade-in">
                {/* Header with full info */}
                <div className="px-3 py-2.5 border-b border-white/10 mb-1.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col truncate">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-neutral-400 truncate font-mono">{user.email}</p>
                    <span className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Google Account
                    </span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenSettings();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-200 hover:text-white hover:bg-white/10 rounded-xl transition text-left"
                  >
                    <SettingsIcon className="w-3.5 h-3.5 text-neutral-400" />
                    Account & Settings
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenFavorites();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-neutral-200 hover:text-white hover:bg-white/10 rounded-xl transition text-left"
                  >
                    <Heart className="w-3.5 h-3.5 text-neutral-400" />
                    My Watchlist & Favorites
                  </button>

                  <div className="pt-1 mt-1 border-t border-white/[0.08]">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:text-white hover:bg-rose-500/20 rounded-xl transition text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Signed Out (Viewer / Guest) View: Professional Sign In Button */
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSignIn}
              className="bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-4 py-2 rounded-full text-xs flex items-center gap-2 shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
