import React from 'react';
import { Play, Heart, Plus } from 'lucide-react';
import { MovieItem } from '../types';

interface RecommendationSectionProps {
  movies: MovieItem[];
  onPlayMovie: (movie: MovieItem) => void;
  onToggleFavorite: (movieId: string) => void;
  favorites: string[];
  onSeeAll?: () => void;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  movies,
  onPlayMovie,
  onToggleFavorite,
  favorites,
  onSeeAll,
}) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            You might like: Xploration of Powers
          </h2>
          <p className="text-xs text-neutral-400">
            Serialized chapters and releases from StudioDietFrooti
          </p>
        </div>
        {/* 'See all' pill button on far right */}
        <button
          onClick={onSeeAll}
          className="glass-pill px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white transition flex items-center gap-1.5"
        >
          See all
        </button>
      </div>

      {/* Horizontal row of FOUR movie cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {movies.slice(0, 4).map((movie) => {
          const isFav = favorites.includes(movie.id);

          return (
            <div
              key={movie.id}
              className="glass-card rounded-2xl p-3 flex flex-col justify-between gap-3 group relative overflow-hidden"
            >
              {/* Poster Image Container */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Small genre badge at top left of image */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="glass-pill px-2.5 py-0.5 text-[11px] font-semibold text-white tracking-wide border border-white/20">
                    {movie.genres[0] || 'Feature'}
                  </span>
                </div>

                {/* Favorite heart button at top right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(movie.id);
                  }}
                  title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                  className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition ${
                    isFav
                      ? 'bg-rose-500/80 text-white shadow-md'
                      : 'glass-button-circle text-neutral-300 hover:text-white'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-col gap-1.5 flex-1 justify-between">
                <div>
                  {/* Movie Title */}
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-neutral-100 transition truncate">
                    {movie.title}
                  </h3>

                  {/* Release year and genre information */}
                  <p className="text-xs text-neutral-400 font-medium">
                    {movie.year} • {movie.genres.join(', ')}
                  </p>

                  {/* Short description */}
                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                    {movie.description}
                  </p>
                </div>

                {/* Bottom Row: Specs and Circular Play Button at bottom-right */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] mt-1">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-300">
                    <span className="glass-pill px-2 py-0.5 text-[10px] text-neutral-300 border border-white/10 font-mono">4K UHD</span>
                    <span className="text-neutral-400 text-[11px] font-mono">{movie.duration}</span>
                  </div>

                  {/* Circular play button at the bottom-right */}
                  <button
                    onClick={() => onPlayMovie(movie)}
                    className="w-9 h-9 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-200 shadow-md transition-all duration-200 transform group-hover:scale-110"
                    title={`Play ${movie.title}`}
                    aria-label={`Play ${movie.title}`}
                  >
                    <Play className="w-4 h-4 fill-neutral-900 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
