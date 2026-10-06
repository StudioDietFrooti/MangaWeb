import { MovieItem, TrailerItem, ContinueWatchingItem, SongItem } from '../types';

export const HERO_MOVIES: MovieItem[] = [
  {
    id: 'hero-xploration-1',
    title: 'XPLORATION OF POWERS',
    year: 2024,
    genres: ['DietFrooti Original', 'Part 1: The beginning'],
    featuredBadges: ['DIETFROOTI', 'Part 1: 1.1 Manga Pages'],
    rating: 0,
    duration: 'Part 1: The beginning • 1.1 Manga Pages',
    description: 'An independent story about power, people, and the choices between them. Follow students awakening extraordinary forces of Tiger, Light, Portal, Gas, Art, and Fire beyond the school threshold.',
    backdropUrl: '/assets/xploration_cover.jpg',
    posterUrl: '/assets/xploration_cover.jpg',
    director: 'JIGYAS',
    cast: [
      'Renji Kurogane (Tiger)',
      'Kaizen Vex (Light)',
      'Aya Morikawa (Portal)',
      'Mikage Sora (Gas)',
      'Akira Sol (Art)',
      'Ren Aoki (Fire)'
    ],
  }
];

// User songs will use the original cover art
export const SONGS_LIST: SongItem[] = [];

export const CONTINUE_WATCHING_LIST: ContinueWatchingItem[] = [
  {
    id: 'cw-xpo-1',
    title: 'Xploration of Powers • Part 1',
    episodeInfo: 'The beginning • 1.1 Manga Pages',
    progressPercent: 72,
    remainingTime: '1.1 Manga Pages',
    thumbnailUrl: '/assets/xploration_cover.jpg'
  },
  {
    id: 'cw-xpo-2',
    title: 'Xploration of Powers: Six Carriers',
    episodeInfo: 'Official Lore Archive',
    progressPercent: 100,
    remainingTime: 'Reviewed',
    thumbnailUrl: '/assets/xploration_cover.jpg'
  }
];

export const YOU_MIGHT_LIKE_MOVIES: MovieItem[] = [
  {
    id: 'xpo-part-1',
    title: 'Part 1: The beginning',
    year: 2024,
    genres: ['Manga', 'Supernatural', '1.1 Manga Pages'],
    featuredBadges: ['1.1 Manga Pages', 'Available to Read'],
    rating: 0,
    duration: '1.1 Manga Pages',
    description: 'The awakening begins. Students discover mysterious resonant forces emerging beyond the school threshold. Official 1.1 manga release of Xploration of Powers.',
    posterUrl: '/assets/xploration_cover.jpg',
    backdropUrl: '/assets/xploration_cover.jpg',
    director: 'JIGYAS',
    cast: ['Renji Kurogane', 'Kaizen Vex', 'Aya Morikawa', 'Mikage Sora', 'Akira Sol', 'Ren Aoki']
  }
];

export const ALL_MOVIES: MovieItem[] = [
  ...HERO_MOVIES,
  ...YOU_MIGHT_LIKE_MOVIES
];
