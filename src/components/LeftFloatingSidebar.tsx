import React from 'react';
import { Home, Heart, Download, User, Settings } from 'lucide-react';
import { SidebarTab } from '../types';

interface LeftFloatingSidebarProps {
  activeTab: SidebarTab;
  onSelectTab: (tab: SidebarTab) => void;
  favoritesCount?: number;
  downloadsCount?: number;
}

export const LeftFloatingSidebar: React.FC<LeftFloatingSidebarProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount = 0,
  downloadsCount = 0,
}) => {
  const navItems: { id: SidebarTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'Home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'Favorites',
      label: 'Favorites',
      icon: <Heart className="w-5 h-5" />,
      badge: favoritesCount > 0 ? favoritesCount : undefined,
    },
    {
      id: 'Downloads',
      label: 'Downloads',
      icon: <Download className="w-5 h-5" />,
      badge: downloadsCount > 0 ? downloadsCount : undefined,
    },
    {
      id: 'Profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <aside
      className="glass-panel-subtle rounded-full py-4 px-2.5 flex flex-col items-center gap-4 shrink-0 shadow-2xl relative z-20"
      aria-label="Floating Navigation Sidebar"
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <div key={item.id} className="relative group">
            <button
              onClick={() => onSelectTab(item.id)}
              title={item.label}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 relative ${
                isActive
                  ? 'bg-white/20 text-white border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.18)]'
                  : 'glass-button-circle text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
              aria-label={item.label}
            >
              {item.icon}

              {item.badge !== undefined && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center border border-black/40">
                  {item.badge}
                </span>
              )}
            </button>

            {/* Hover Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center z-50 pointer-events-none">
              <div className="glass-pill px-2.5 py-1 text-xs text-white whitespace-nowrap shadow-xl border border-white/15">
                {item.label}
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
};
