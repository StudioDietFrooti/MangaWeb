import React, { useRef, useState } from 'react';
import { Play, Pause, Music, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { SongItem } from '../types';

interface SongsPanelProps {
  songs: SongItem[];
  currentSong: SongItem | null;
  isPlaying: boolean;
  onPlaySong: (song: SongItem) => void;
  onPauseSong: () => void;
  onAttachSong: (newSong: SongItem, file?: File) => void;
  onRenameSong?: (songId: string, newTitle: string) => void;
  onDeleteSong?: (songId: string) => void;
}

export const SongsPanel: React.FC<SongsPanelProps> = ({
  songs,
  currentSong,
  isPlaying,
  onPlaySong,
  onPauseSong,
  onAttachSong,
  onRenameSong,
  onDeleteSong,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingSongId, setEditingSongId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  const defaultNames = ['Fairy tail', 'Something undone', 'Until the Hikari'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    // Suggest the next name in line if available
    const suggestedTitle = defaultNames[songs.length] || file.name.replace(/\.[^/.]+$/, '');

    const customSong: SongItem = {
      id: 'song-usr-' + Date.now(),
      title: suggestedTitle,
      artist: 'StudioDietFrooti • Xploration of Powers',
      duration: 'Original Audio',
      audioUrl: objectUrl,
      coverUrl: '/assets/xploration_cover.jpg',
    };

    onAttachSong(customSong, file);
    onPlaySong(customSong);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStartRename = (song: SongItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSongId(song.id);
    setEditTitle(song.title);
  };

  const handleSaveRename = (songId: string, e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.stopPropagation();
    if (editTitle.trim() && onRenameSong) {
      onRenameSong(songId, editTitle.trim());
    }
    setEditingSongId(null);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSongId(null);
  };

  return (
    <section className="glass-panel-subtle rounded-3xl p-4 sm:p-5 flex flex-col gap-3.5 border border-white/[0.09] shadow-xl">
      {/* Header: 🎵 Songs and Attach Song button */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-1.5">
          <span>🎵</span> Songs
        </h2>

        {/* Hidden File Input for Attaching Audio */}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Attach Song Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Attach an audio file from your device"
          className="glass-pill px-3 py-1 text-xs font-semibold text-white hover:bg-white/20 transition flex items-center gap-1.5 border border-white/20"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Attach Song</span>
        </button>
      </div>

      {songs.length === 0 ? (
        /* Empty State when no songs are attached: prompts user to attach their song */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-5 rounded-2xl glass-card border border-dashed border-white/20 hover:border-white/40 cursor-pointer flex flex-col items-center justify-center text-center gap-2.5 transition group"
        >
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-lg bg-neutral-900 group-hover:scale-105 transition">
            <img
              src="/assets/xploration_cover.jpg"
              alt="Xploration Artwork"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-white">
              Attach Existing Audio
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5 max-w-[200px]">
              Tap here to attach your song (.mp3, .wav, .m4a).
            </p>
          </div>
          <span className="glass-pill px-3 py-1 text-[11px] text-neutral-300 group-hover:text-white border border-white/20">
            + Choose Audio File
          </span>
        </div>
      ) : (
        /* Display ONLY the user's existing attached songs */
        <div className="flex flex-col gap-2.5">
          {songs.map((song) => {
            const isThisPlaying = currentSong?.id === song.id && isPlaying;
            const isEditing = editingSongId === song.id;

            return (
              <div
                key={song.id}
                onClick={() => {
                  if (isEditing) return;
                  if (isThisPlaying) {
                    onPauseSong();
                  } else {
                    onPlaySong(song);
                  }
                }}
                className={`group flex items-center justify-between gap-3 p-3 rounded-2xl glass-card cursor-pointer border transition-all duration-300 ${
                  isThisPlaying
                    ? 'bg-white/[0.12] border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                    : 'hover:border-white/20 border-white/[0.08]'
                }`}
              >
                {/* Left: Thumbnail with Play/Equalizer indicator */}
                <div className="w-12 h-12 rounded-xl overflow-hidden relative shrink-0 border border-white/10 bg-neutral-900 flex items-center justify-center">
                  <img
                    src={song.coverUrl || '/assets/xploration_cover.jpg'}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    {isThisPlaying ? (
                      <div className="flex items-end gap-0.5 h-4">
                        <span className="w-1 bg-white h-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1 bg-white h-2/3 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1 bg-white h-4/5 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <Play className="w-4 h-4 fill-white text-white opacity-80 group-hover:opacity-100 transition" />
                    )}
                  </div>
                </div>

                {/* Center: Song details or Inline Rename Input */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  {isEditing ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveRename(song.id, e);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                        className="w-full px-2 py-1 rounded-lg bg-neutral-900 border border-white/30 text-white text-xs focus:outline-none focus:border-white"
                        placeholder="Song name"
                      />
                      <button
                        type="button"
                        onClick={(e) => handleSaveRename(song.id, e)}
                        className="w-6 h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition shrink-0"
                        title="Save name"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelRename}
                        className="w-6 h-6 rounded-md bg-white/10 text-neutral-300 flex items-center justify-center hover:bg-white/20 transition shrink-0"
                        title="Cancel"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-xs sm:text-sm font-semibold truncate ${
                            isThisPlaying ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                          }`}
                        >
                          {song.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400 truncate">
                        {song.artist}
                      </span>
                    </>
                  )}
                </div>

                {/* Right: Actions (Play/Pause, Rename Pencil, Delete) */}
                <div className="flex items-center gap-1 shrink-0">
                  {!isEditing && (
                    <button
                      onClick={(e) => handleStartRename(song, e)}
                      className="w-7 h-7 rounded-full glass-button-circle text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition"
                      title="Rename song"
                      aria-label="Rename song"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isThisPlaying) {
                        onPauseSong();
                      } else {
                        onPlaySong(song);
                      }
                    }}
                    className={`w-8 h-8 rounded-full glass-button-circle transition ${
                      isThisPlaying
                        ? 'bg-white text-neutral-950 hover:bg-neutral-200'
                        : 'text-white hover:bg-white/20'
                    }`}
                    aria-label={isThisPlaying ? 'Pause song' : 'Play song'}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>

                  {onDeleteSong && !isEditing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSong(song.id);
                      }}
                      className="w-7 h-7 rounded-full glass-button-circle text-neutral-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition"
                      title="Remove song"
                      aria-label="Remove song"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
