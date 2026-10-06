import React, { useState, useEffect } from 'react';
import { TopBrowserBar } from './components/TopBrowserBar';
import { LeftFloatingSidebar } from './components/LeftFloatingSidebar';
import { TopContainerNav } from './components/TopContainerNav';
import { SongsPanel } from './components/SongsPanel';
import { ContinueWatchingPanel } from './components/ContinueWatchingPanel';
import { MainHeroBanner } from './components/MainHeroBanner';
import { RecommendationSection } from './components/RecommendationSection';
import { SignInModal } from './components/SignInModal';
import { MoreMangaModal } from './components/MoreMangaModal';
import { AccountSettingsView } from './components/AccountSettingsView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import {
  HERO_MOVIES,
  SONGS_LIST,
  CONTINUE_WATCHING_LIST,
  YOU_MIGHT_LIKE_MOVIES,
  ALL_MOVIES,
} from './data/streamingData';
import { MovieItem, ContinueWatchingItem, SidebarTab, UserProfile, SongItem } from './types';
import { loadStoredUser, saveStoredUser, INITIAL_GOOGLE_USER } from './utils/auth';
import { playAudioUrl, playSynthMelody, stopCurrentAudio } from './utils/audioPlayer';
import { loadUserSongs, saveUserSong, deleteUserSong, updateSongTitle } from './utils/songStorage';
import { Heart, Download } from 'lucide-react';

export function App() {
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = loadStoredUser();
    return saved !== null ? saved : INITIAL_GOOGLE_USER;
  });
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMoreMangaOpen, setIsMoreMangaOpen] = useState(false);

  // Audio / Song Player State - only user's existing songs
  const [songs, setSongs] = useState<SongItem[]>([]);
  const [currentSong, setCurrentSong] = useState<SongItem | null>(null);
  const [isPlayingSong, setIsPlayingSong] = useState<boolean>(false);

  // Names requested by creator for existing songs
  const targetNames = ['Fairy tail', 'Something undone', 'Until the Hikari'];

  // Load user-attached songs from persistent storage on mount
  useEffect(() => {
    loadUserSongs().then((loaded) => {
      if (loaded && loaded.length > 0) {
        // Automatically rename existing songs in order to target names and use the original artwork
        const renamed = loaded.map((song, idx) => {
          const title = idx < targetNames.length ? targetNames[idx] : song.title;
          if (idx < targetNames.length && song.title !== targetNames[idx]) {
            updateSongTitle(song.id, targetNames[idx]);
          }
          return { ...song, title, coverUrl: '/assets/xploration_cover.jpg' };
        });
        setSongs(renamed);
      } else {
        setSongs([]);
      }
    });
  }, []);

  // Navigation & View States
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Hero carousel state
  const [heroIndex, setHeroIndex] = useState(0);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(['xpo-part-1']);

  // Downloaded items state
  const [downloadedItems, setDownloadedItems] = useState<string[]>(['hero-xploration-1']);

  // Song playback handler: plays immediately with NO popups
  const handlePlaySong = (song: SongItem) => {
    setCurrentSong(song);
    setIsPlayingSong(true);

    playAudioUrl(
      song.audioUrl,
      () => {
        setIsPlayingSong(false);
      },
      () => {
        playSynthMelody(song.title);
      }
    );
  };

  const handlePauseSong = () => {
    setIsPlayingSong(false);
    stopCurrentAudio();
  };

  const handleAttachSong = (newSong: SongItem, file?: File) => {
    setSongs((prev) => [newSong, ...prev.filter((s) => s.id !== newSong.id)]);
    saveUserSong(newSong, file);
  };

  const handleRenameSong = (songId: string, newTitle: string) => {
    setSongs((prev) =>
      prev.map((s) => (s.id === songId ? { ...s, title: newTitle } : s))
    );
    if (currentSong?.id === songId) {
      setCurrentSong((prev) => (prev ? { ...prev, title: newTitle } : null));
    }
    updateSongTitle(songId, newTitle);
  };

  const handleDeleteSong = (songId: string) => {
    setSongs((prev) => prev.filter((s) => s.id !== songId));
    deleteUserSong(songId);
    if (currentSong?.id === songId) {
      handlePauseSong();
      setCurrentSong(null);
    }
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    saveStoredUser(updatedUser);
  };

  const handleSignInSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    saveStoredUser(user);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    saveStoredUser(null);
  };

  const handleToggleFavorite = (movieId: string) => {
    if (favorites.includes(movieId)) {
      setFavorites((prev) => prev.filter((id) => id !== movieId));
    } else {
      setFavorites((prev) => [...prev, movieId]);
    }
  };

  const handleDownload = (movie: MovieItem) => {
    if (!downloadedItems.includes(movie.id)) {
      setDownloadedItems((prev) => [...prev, movie.id]);
    }
  };

  const handlePrevHero = () => {
    setHeroIndex((prev) => (prev === 0 ? HERO_MOVIES.length - 1 : prev - 1));
  };

  const handleNextHero = () => {
    setHeroIndex((prev) => (prev === HERO_MOVIES.length - 1 ? 0 : prev + 1));
  };

  const currentHero = HERO_MOVIES[heroIndex];

  // Filter movies based on search
  const filteredRecommendations = YOU_MIGHT_LIKE_MOVIES.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  return (
    <div className="relative min-h-screen w-full bg-[#0a0c10] text-[#eceff4] flex flex-col justify-start items-center p-2 sm:p-4 lg:p-6 overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* BACKGROUND WITH A SOFT BLURRED GREY ATMOSPHERE */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full bg-slate-600/15 blur-[140px]" />
        <div className="absolute top-[35%] -right-[10%] w-[750px] h-[750px] rounded-full bg-neutral-500/10 blur-[160px]" />
        <div className="absolute -bottom-[20%] left-[25%] w-[800px] h-[800px] rounded-full bg-zinc-600/15 blur-[180px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Main Container Wrapper */}
      <div className="relative z-10 w-full max-w-[1560px] flex flex-col items-center">
        {/* TOP BROWSER-STYLE BAR (Zero annoying popups) */}
        <TopBrowserBar
          onToggleSidebar={() => setIsSidebarVisible(!isSidebarVisible)}
          onRefresh={() => {}}
          onOpenDownloads={() => setSidebarTab('Downloads')}
          onNewTab={() => {}}
          onOpenTabs={() => {}}
          sidebarOpen={isSidebarVisible}
        />

        {/* CONTAINER ROW: Left Floating Sidebar + Main Website Container */}
        <div className="w-full flex items-start justify-center gap-3 sm:gap-4 lg:gap-5">
          {/* LEFT FLOATING SIDEBAR */}
          {isSidebarVisible && (
            <div className="hidden sm:block sticky top-6 self-start">
              <LeftFloatingSidebar
                activeTab={sidebarTab}
                onSelectTab={(tab) => setSidebarTab(tab)}
                favoritesCount={favorites.length}
                downloadsCount={downloadedItems.length}
              />
            </div>
          )}

          {/* MAIN WEBSITE CONTAINER */}
          <main className="flex-1 w-full glass-panel rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 lg:p-8 flex flex-col gap-6 relative shadow-[0_20px_70px_rgba(0,0,0,0.65)] min-w-0">
            {/* TOP NAVIGATION */}
            <TopContainerNav
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              user={currentUser}
              onOpenMoreManga={() => setIsMoreMangaOpen(true)}
              onOpenSignIn={() => setIsSignInOpen(true)}
              onOpenSettings={() => setSidebarTab('Profile')}
              onSignOut={handleSignOut}
              onOpenFavorites={() => setSidebarTab('Favorites')}
              onOpenNotifications={() => {}}
            />

            {/* TAB CONTENT: HOME OR OTHER VIEWS */}
            {sidebarTab === 'Home' ? (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                {/* LEFT COLUMN: Approximately 24% width */}
                <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6 w-full order-2 lg:order-1">
                  <SongsPanel
                    songs={songs}
                    currentSong={currentSong}
                    isPlaying={isPlayingSong}
                    onPlaySong={handlePlaySong}
                    onPauseSong={handlePauseSong}
                    onAttachSong={handleAttachSong}
                    onRenameSong={handleRenameSong}
                    onDeleteSong={handleDeleteSong}
                  />

                  <ContinueWatchingPanel
                    items={CONTINUE_WATCHING_LIST}
                    onResume={() => setIsMoreMangaOpen(true)}
                  />
                </div>

                {/* RIGHT COLUMN: Approximately 76% width */}
                <div className="lg:col-span-9 flex flex-col gap-6 w-full order-1 lg:order-2 min-w-0">
                  <MainHeroBanner
                    movie={currentHero}
                    currentIndex={heroIndex}
                    totalCount={HERO_MOVIES.length}
                    onPrev={handlePrevHero}
                    onNext={handleNextHero}
                    onPlay={() => setIsMoreMangaOpen(true)}
                    onDownload={(movie) => handleDownload(movie)}
                    onMore={() => setIsMoreMangaOpen(true)}
                  />

                  <RecommendationSection
                    movies={filteredRecommendations}
                    onPlayMovie={() => setIsMoreMangaOpen(true)}
                    onToggleFavorite={handleToggleFavorite}
                    favorites={favorites}
                    onSeeAll={() => setIsMoreMangaOpen(true)}
                  />
                </div>
              </div>
            ) : sidebarTab === 'Favorites' ? (
              /* FAVORITES VIEW */
              <div className="flex flex-col gap-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <h2 className="text-xl font-bold text-white">Your Saved Collection</h2>
                  </div>
                  <button
                    onClick={() => setSidebarTab('Home')}
                    className="glass-pill px-3 py-1 text-xs text-neutral-300 hover:text-white"
                  >
                    Back to Home
                  </button>
                </div>

                {favorites.length === 0 ? (
                  <div className="p-8 text-center text-neutral-400 glass-card rounded-2xl">
                    No releases saved yet. Click the heart icon on Part 1 to save it here.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {ALL_MOVIES.filter((m) => favorites.includes(m.id)).map((movie) => (
                      <div
                        key={movie.id}
                        className="glass-card rounded-2xl p-3 flex flex-col gap-3 group relative"
                      >
                        <div className="aspect-[16/10] rounded-xl overflow-hidden relative">
                          <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleToggleFavorite(movie.id)}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg"
                          >
                            <Heart className="w-3.5 h-3.5 fill-white" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 pr-2">
                            <h3 className="text-sm font-bold text-white truncate">{movie.title}</h3>
                            <p className="text-xs text-neutral-400">{movie.year} • {movie.genres[0]}</p>
                          </div>
                          <button
                            onClick={() => setIsMoreMangaOpen(true)}
                            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 shrink-0"
                          >
                            ▶
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : sidebarTab === 'Downloads' ? (
              /* DOWNLOADS VIEW */
              <div className="flex flex-col gap-6 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-xl font-bold text-white">Offline Releases</h2>
                  </div>
                  <span className="text-xs text-neutral-400 font-mono">Part 1 Available</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ALL_MOVIES.filter((m) => downloadedItems.includes(m.id)).map((movie) => (
                    <div key={movie.id} className="glass-card rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={movie.posterUrl} alt={movie.title} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h3 className="text-sm font-bold text-white">{movie.title}</h3>
                          <p className="text-xs text-neutral-400">DietFrooti Original</p>
                          <span className="text-[10px] text-emerald-400">Downloaded for offline reading</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsMoreMangaOpen(true)}
                        className="glass-pill px-4 py-1.5 text-xs text-white hover:bg-white/20"
                      >
                        Read
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* PROFILE & ACCOUNT SETTINGS VIEW */
              <AccountSettingsView
                user={currentUser}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
                onOpenSignIn={() => setIsSignInOpen(true)}
              />
            )}
          </main>
        </div>
      </div>

      {/* Floating Audio Player Bar when Song is Playing */}
      <AudioPlayerBar
        currentSong={currentSong}
        isPlaying={isPlayingSong}
        onTogglePlay={() => {
          if (isPlayingSong) {
            handlePauseSong();
          } else if (currentSong) {
            handlePlaySong(currentSong);
          }
        }}
        onClose={() => {
          handlePauseSong();
          setCurrentSong(null);
        }}
      />

      {/* Manga Reader Modal (Part 1: The beginning • 1.1 Manga Pages) */}
      <MoreMangaModal
        isOpen={isMoreMangaOpen}
        onClose={() => setIsMoreMangaOpen(false)}
      />

      {/* Sign-In Modal (Only opened when user explicitly clicks Sign In) */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignInSuccess={handleSignInSuccess}
      />
    </div>
  );
}
export default App;
