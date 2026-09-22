import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Volume1,
  Play,
  Pause,
  Music,
  Upload,
  Sliders,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface BackgroundAudioProps {
  isDarkMode: boolean;
  isReaderModeActive?: boolean;
}

const DB_NAME = 'xop_audio_cache';
const STORE_NAME = 'audio_files';
const MAX_VOLUME = 0.10; // Maximum volume capped at 10%
const DEFAULT_VOLUME = 0.05; // 5% default volume

function getAudioDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveCustomSong(file: File): Promise<void> {
  try {
    const db = await getAudioDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(file, 'custom_theme_song');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('Could not cache song in IndexedDB', err);
  }
}

async function loadCustomSong(): Promise<Blob | null> {
  try {
    const db = await getAudioDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get('custom_theme_song');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  isDarkMode,
  isReaderModeActive = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Starts muted so browsers permit background autoplay
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // Default soft volume (5%, max capped at 10%)
  const [volume, setVolume] = useState<number>(DEFAULT_VOLUME);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<string>('/assets/theme.mp3');
  const [trackName, setTrackName] = useState<string>('Xploration of Powers (Original Theme)');
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isCustomLoaded, setIsCustomLoaded] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  // Initialize, load cached song if available, and start muted autoplay
  useEffect(() => {
    let active = true;

    const initAudio = async () => {
      // Check for user-uploaded custom song in IndexedDB
      const cachedBlob = await loadCustomSong();
      if (cachedBlob && active) {
        const objectUrl = URL.createObjectURL(cachedBlob);
        setAudioSource(objectUrl);
        setIsCustomLoaded(true);
        setTrackName('Xploration of Powers (Your Original Song)');
      }

      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = Math.min(volume, MAX_VOLUME);
      audio.muted = true;

      // Autoplay attempt (muted is permitted by standard browser policies)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (active) setIsPlaying(true);
          })
          .catch(() => {
            if (active) setIsPlaying(false);
          });
      }
    };

    initAudio();

    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      if (audio) {
        setIsMuted(audio.muted);
        setVolume(Math.min(audio.volume, MAX_VOLUME));
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      active = false;
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  // Update volume smoothly, strictly capped between 0 and MAX_VOLUME (10%)
  const handleVolumeChange = (newVolume: number) => {
    const clamped = Math.max(0, Math.min(MAX_VOLUME, newVolume));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
      if (clamped > 0.001 && audioRef.current.muted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else if (clamped <= 0.001) {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      const targetVol = volume > 0.001 ? Math.min(volume, MAX_VOLUME) : DEFAULT_VOLUME;
      audio.volume = targetVol;
      setVolume(targetVol);
      setIsMuted(false);
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = isMuted;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Load custom song file (from file input or drag-and-drop)
  const applyAudioFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    setAudioSource(url);
    setTrackName(file.name.replace(/\.[^/.]+$/, ''));
    setIsCustomLoaded(true);
    setHasInteracted(true);

    // Persist in IndexedDB so it remains available across page refreshes
    await saveCustomSong(file);

    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.muted = false;
      const targetVol = volume > 0.001 ? Math.min(volume, MAX_VOLUME) : DEFAULT_VOLUME;
      audioRef.current.volume = targetVol;
      setVolume(targetVol);
      setIsMuted(false);
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      applyAudioFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      applyAudioFile(file);
    }
  };

  return (
    <>
      {/* HTML <audio> Tag with autoplay, loop, muted start */}
      <audio
        ref={audioRef}
        src={audioSource}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        id="bgm-audio-element"
      >
        <source src="/assets/theme.mp3" type="audio/mpeg" />
        <source src="/theme.mp3" type="audio/mpeg" />
        <source src="/assets/bgm.mp3" type="audio/mpeg" />
        <source src="/bgm.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Hidden file input to upload / replace audio */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Clean, Unobtrusive Bottom Corner Floating Audio Control */}
      <div
        className={`fixed z-40 transition-all duration-300 ${
          isReaderModeActive
            ? 'bottom-20 right-3 sm:bottom-6 sm:right-6'
            : 'bottom-4 right-4 sm:bottom-6 sm:right-6'
        }`}
        id="bgm-floating-control"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
      >
        {/* Expanded Volume / Settings Drawer */}
        {showControls && (
          <div
            className={`mb-2 p-3 border-2 w-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] font-mono text-xs ${
              isDarkMode
                ? 'bg-neutral-950 border-neutral-700 text-neutral-200'
                : 'bg-white border-neutral-900 text-neutral-900'
            } ${isDraggingOver ? 'ring-2 ring-white' : ''}`}
          >
            <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-neutral-800">
              <div className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-bold uppercase tracking-wider text-[11px]">
                  BGM PLAYER
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowControls(false)}
                className="text-neutral-400 hover:text-white text-xs px-1"
                title="Close settings"
              >
                ✕
              </button>
            </div>

            {/* Track Info */}
            <div className="mb-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 uppercase">
                  Track
                </span>
                {isCustomLoaded && (
                  <span className="text-[9px] uppercase px-1 border border-neutral-700 text-neutral-300">
                    Custom
                  </span>
                )}
              </div>
              <p className="truncate font-semibold text-[11px] mt-0.5 text-neutral-300" title={trackName}>
                {trackName}
              </p>
            </div>

            {/* Volume Slider Control (Max 10%, Least for 0%, Maxx for 10%) */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center justify-between text-[10px] uppercase font-mono">
                <span className="text-neutral-500">Volume</span>
                <span className="font-bold text-neutral-200 px-1.5 py-0.5 border border-neutral-700 bg-neutral-900">
                  {isMuted || volume <= 0.001
                    ? 'Least'
                    : volume >= MAX_VOLUME - 0.001
                    ? 'Maxx'
                    : `${Math.round(volume * 100)}%`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={MAX_VOLUME}
                step="0.005"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 appearance-none cursor-pointer accent-neutral-200"
                id="bgm-volume-slider"
                aria-label="Volume slider"
              />
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-0.5">
                <button
                  type="button"
                  onClick={() => handleVolumeChange(0)}
                  className={`hover:text-white transition-colors ${
                    isMuted || volume <= 0.001 ? 'text-white font-bold underline' : ''
                  }`}
                >
                  Least
                </button>
                <button
                  type="button"
                  onClick={() => handleVolumeChange(0.05)}
                  className={`hover:text-white transition-colors ${
                    !isMuted && volume > 0.03 && volume < 0.08 ? 'text-white font-bold underline' : ''
                  }`}
                >
                  5%
                </button>
                <button
                  type="button"
                  onClick={() => handleVolumeChange(MAX_VOLUME)}
                  className={`hover:text-white transition-colors ${
                    !isMuted && volume >= MAX_VOLUME - 0.001 ? 'text-white font-bold underline' : ''
                  }`}
                >
                  Maxx
                </button>
              </div>
            </div>

            {/* Play/Pause & Upload Buttons */}
            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={togglePlay}
                className={`py-1.5 px-2 border flex items-center justify-center gap-1 text-[10px] uppercase font-bold tracking-wider ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
                    : 'border-neutral-400 bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Play</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`py-1.5 px-2 border flex items-center justify-center gap-1 text-[10px] uppercase font-bold tracking-wider ${
                  isDarkMode
                    ? 'border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
                    : 'border-neutral-400 bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                }`}
                title="Select your original song file"
              >
                <Upload className="w-3 h-3" />
                <span>Upload</span>
              </button>
            </div>
          </div>
        )}

        {/* Small, Quiet Floating Button in Corner */}
        <div
          className={`flex items-center gap-1 p-1 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] transition-all ${
            isDarkMode
              ? 'bg-neutral-950 border-neutral-700 text-white'
              : 'bg-white border-neutral-900 text-black'
          } ${isDraggingOver ? 'ring-2 ring-white' : ''}`}
        >
          {/* Main Mute / Unmute Toggle Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
            className={`flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono font-bold uppercase transition-colors ${
              isMuted
                ? isDarkMode
                  ? 'text-neutral-400 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
                : isDarkMode
                ? 'text-white'
                : 'text-black'
            }`}
            id="bgm-mute-toggle-btn"
          >
            {isMuted || volume <= 0.001 ? (
              <>
                <VolumeX className="w-4 h-4 text-neutral-400" />
                <span className="hidden sm:inline text-[11px] tracking-wider">
                  Least
                </span>
              </>
            ) : (
              <>
                {volume >= MAX_VOLUME - 0.001 ? (
                  <Volume2 className="w-4 h-4 text-neutral-200" />
                ) : (
                  <Volume1 className="w-4 h-4 text-neutral-300" />
                )}
                <span className="hidden sm:inline text-[11px] tracking-wider">
                  {volume >= MAX_VOLUME - 0.001
                    ? 'Maxx'
                    : `${Math.round(volume * 100)}%`}
                </span>
              </>
            )}
          </button>

          {/* Settings & Volume Drawer Toggle Button */}
          <button
            type="button"
            onClick={() => setShowControls(!showControls)}
            aria-label="Audio controls and volume"
            className={`p-1.5 border-l border-neutral-800 transition-colors ${
              showControls
                ? isDarkMode
                  ? 'text-white bg-neutral-800'
                  : 'text-black bg-neutral-200'
                : 'text-neutral-400 hover:text-white'
            }`}
            id="bgm-settings-toggle-btn"
            title="Adjust volume and controls"
          >
            {showControls ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <Sliders className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
