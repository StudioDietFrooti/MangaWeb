import React from 'react';
import { Play, Download, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieItem } from '../types';

interface MainHeroBannerProps {
  movie: MovieItem;
  currentIndex: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  onPlay: (movie: MovieItem) => void;
  onDownload: (movie: MovieItem) => void;
  onMore: (movie: MovieItem) => void;
}

export const MainHeroBanner: React.FC<MainHeroBannerProps> = ({
  movie,
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  onPlay,
  onDownload,
  onMore,
}) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden min-h-[380px] lg:h-[410px] flex flex-col justify-between p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl group">
      {/* Full-width cinematic background image */}
      <img
        src={movie.backdropUrl}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
      />

      {/* Dark transparent gradient overlay near the text */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015]/95 via-[#0e1015]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e1015]/85 via-[#0e1015]/40 to-transparent" />

      {/* Top row: '🔥 Now Trending' pill and Genre badges */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Small "🔥 Now Trending" pill at the top left */}
        <div className="glass-pill px-3 py-1 text-xs font-semibold text-white flex items-center gap-1.5 shadow-md border border-white/20">
          <span>🔥</span>
          <span>Now Trending</span>
        </div>

        {/* Genre badges such as Adventure and Fantasy */}
        {movie.featuredBadges && movie.featuredBadges.map((badge) => (
          <span
            key={badge}
            className="glass-pill px-3 py-1 text-xs font-medium text-neutral-300 border border-white/10"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Center / Bottom Info & Action Buttons */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mt-auto pt-6">
        <div className="flex flex-col gap-3.5 max-w-xl">
          {/* Large bold white movie title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg leading-tight">
            {movie.title}
          </h1>

          {/* Short description */}
          <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed line-clamp-2 max-w-lg drop-shadow">
            {movie.description}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onPlay(movie)}
              className="bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-6 py-2.5 rounded-full flex items-center gap-2 text-sm shadow-xl hover:shadow-white/20 transition-all duration-200 transform hover:scale-[1.02]"
              aria-label="Read Part 1"
            >
              <Play className="w-4 h-4 fill-neutral-900" />
              <span>Read Part 1</span>
            </button>

            <button
              onClick={() => onDownload(movie)}
              className="glass-pill px-5 py-2.5 text-white font-medium text-sm flex items-center gap-2 hover:bg-white/15 transition-all duration-200 border border-white/20"
              aria-label="Download release"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>

            <button
              onClick={() => onMore(movie)}
              className="w-10 h-10 rounded-full glass-button-circle text-neutral-300 hover:text-white"
              title="More details"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Original Manga Cover Thumbnail showcase in the front */}
        <div
          onClick={() => onPlay(movie)}
          className="hidden sm:flex flex-col items-center gap-2 cursor-pointer group/cover shrink-0"
        >
          <div className="w-32 lg:w-40 aspect-square rounded-2xl overflow-hidden border-2 border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover/cover:scale-105 group-hover/cover:border-white/60 transition-all duration-300 bg-neutral-950">
            <img
              src="/assets/xploration_cover.jpg"
              alt="Original Manga Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
            Original Manga Cover
          </span>
        </div>
      </div>
    </div>
  );
};
