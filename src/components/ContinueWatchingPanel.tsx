import React from 'react';
import { Play } from 'lucide-react';
import { ContinueWatchingItem } from '../types';

interface ContinueWatchingPanelProps {
  items: ContinueWatchingItem[];
  onResume: (item: ContinueWatchingItem) => void;
}

export const ContinueWatchingPanel: React.FC<ContinueWatchingPanelProps> = ({
  items,
  onResume,
}) => {
  return (
    <section className="glass-panel-subtle rounded-3xl p-4 sm:p-5 flex flex-col gap-3.5 border border-white/[0.09] shadow-xl">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white tracking-wide">
          Continue Watching
        </h2>
        <span className="text-xs text-neutral-400 font-mono">
          {items.length} items
        </span>
      </div>

      {/* Vertical list of items */}
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onResume(item)}
            className="group flex items-center justify-between gap-3 p-2 rounded-2xl glass-card cursor-pointer"
          >
            {/* Left: Small rectangular thumbnail */}
            <div className="w-16 h-12 rounded-xl overflow-hidden relative shrink-0 border border-white/10 bg-neutral-900">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20" />
              {/* Progress Bar along bottom of thumbnail */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Center: Title and episode information */}
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-neutral-100">
                {item.title}
              </span>
              <span className="text-[11px] text-neutral-400 truncate">
                {item.episodeInfo}
              </span>
            </div>

            {/* Right: Circular play button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onResume(item);
              }}
              title={`Resume ${item.title}`}
              className="w-8 h-8 rounded-full glass-button-circle shrink-0 group-hover:bg-white/25 text-white"
              aria-label={`Play ${item.title}`}
            >
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
