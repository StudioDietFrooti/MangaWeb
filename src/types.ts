export interface MovieItem {
  id: string;
  title: string;
  year: number;
  genres: string[];
  rating: number; // e.g. 8.8
  duration: string; // e.g. "2h 46m"
  description: string;
  backdropUrl: string;
  posterUrl: string;
  trailerUrl?: string;
  videoUrl?: string;
  isTrending?: boolean;
  featuredBadges?: string[];
  director?: string;
  cast?: string[];
}

export interface TrailerItem {
  id: string;
  title: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl?: string;
  genre: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
  coverUrl?: string;
}

export interface ContinueWatchingItem {
  id: string;
  title: string;
  episodeInfo: string;
  progressPercent: number; // 0 - 100
  thumbnailUrl: string;
  remainingTime: string;
}

export type NavCategory = 'Movies' | 'TV Series' | 'Animation' | 'Mystery' | 'More';

export type SidebarTab = 'Home' | 'Favorites' | 'Downloads' | 'Profile' | 'Settings';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google' | 'email' | 'guest';
  isMember: boolean;
  tier: string;
  joinedDate: string;
  preferences: {
    streamQuality: 'Auto (4K UHD)' | '1080p FHD' | '720p HD' | 'Data Saver';
    spatialAudio: boolean;
    subtitles: 'Off' | 'English' | 'English [CC]' | 'Spanish' | 'Auto';
    autoplayNext: boolean;
    saveWatchHistory: boolean;
  };
}
