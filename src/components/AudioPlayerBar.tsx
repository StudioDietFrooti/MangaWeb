import React from 'react';
import { Play, Pause, X, Music, Volume2 } from 'lucide-react';
import { SongItem } from '../types';

interface AudioPlayerBarProps {
  currentSong: SongItem | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg glass-panel rounded-full px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/20 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center shrink-0 border border-white/20">
          {currentSong.coverUrl ? (
            <img src={currentSong.coverUrl} alt={currentSong.title} className="w-full h-full object-cover" />
          ) : (
            <Music className="w-4 h-4 text-white" />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <p className="text-xs sm:text-sm font-bold text-white truncate">{currentSong.title}</p>
          <p className="text-[11px] text-neutral-400 truncate">{currentSong.artist}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onTogglePlay}
          className="w-9 h-9 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:bg-neutral-200 transition shadow"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full glass-button-circle text-neutral-400 hover:text-white"
          aria-label="Close player"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
