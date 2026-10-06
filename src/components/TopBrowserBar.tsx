import React, { useState } from 'react';
import {
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Download,
  Plus,
  Layers,
  Lock,
  Search,
} from 'lucide-react';

interface TopBrowserBarProps {
  onToggleSidebar?: () => void;
  onRefresh?: () => void;
  onOpenDownloads?: () => void;
  onNewTab?: () => void;
  onOpenTabs?: () => void;
  sidebarOpen?: boolean;
}

export const TopBrowserBar: React.FC<TopBrowserBarProps> = ({
  onToggleSidebar,
  onRefresh,
  onOpenDownloads,
  onNewTab,
  onOpenTabs,
  sidebarOpen = true,
}) => {
  const [address, setAddress] = useState('https://stream.glass/home');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <header className="w-full mb-4 px-2 sm:px-0">
      <div className="w-full glass-panel-subtle rounded-2xl px-3 py-2.5 flex items-center justify-between gap-3 text-neutral-300">
        {/* Left navigation controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onToggleSidebar}
            title={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
            className="w-8 h-8 glass-button-circle text-neutral-300 hover:text-white"
            aria-label="Toggle sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>

          <button
            title="Go back"
            className="w-8 h-8 glass-button-circle text-neutral-400 hover:text-white transition"
            aria-label="Go back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            title="Go forward"
            className="w-8 h-8 glass-button-circle text-neutral-400 hover:text-white transition"
            aria-label="Go forward"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center long search / address field */}
        <div className="flex-1 max-w-2xl mx-1 sm:mx-4">
          <div className="glass-input rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs sm:text-sm text-neutral-300 border border-white/10 group focus-within:border-white/25">
            <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="text-neutral-500 hidden sm:inline select-none">https://</span>
            <input
              type="text"
              value={address.replace('https://', '')}
              onChange={(e) => setAddress('https://' + e.target.value.replace('https://', ''))}
              className="bg-transparent border-none outline-none text-neutral-200 w-full placeholder:text-neutral-500 font-mono text-xs sm:text-sm"
              placeholder="stream.glass/home"
            />
            <button
              onClick={handleRefreshClick}
              title="Refresh"
              className="p-1 text-neutral-400 hover:text-white transition shrink-0"
              aria-label="Refresh address"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenDownloads}
            title="Downloads"
            className="w-8 h-8 glass-button-circle text-neutral-300 hover:text-white"
            aria-label="Downloads"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={onNewTab}
            title="New Window / Tab"
            className="w-8 h-8 glass-button-circle text-neutral-300 hover:text-white"
            aria-label="New Tab"
          >
            <Plus className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenTabs}
            title="Window & Tabs manager"
            className="w-8 h-8 glass-button-circle text-neutral-300 hover:text-white"
            aria-label="Tabs"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
