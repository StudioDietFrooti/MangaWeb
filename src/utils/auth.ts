import { UserProfile } from '../types';

const STORAGE_KEY = 'streamglass_user_session';

export function getGoogleAvatar(email: string, name?: string): string {
  // If email is provided, generate a crisp Google-style avatar or Google unavatar
  if (email && email.includes('@')) {
    const username = email.split('@')[0];
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || username)}&backgroundColor=1a73e8,ea4335,fbbc04,34a853&textColor=ffffff&fontSize=42&fontWeight=600`;
  }
  return '';
}

export const DEFAULT_GUEST_USER: UserProfile | null = null;

export const INITIAL_GOOGLE_USER: UserProfile = {
  id: 'usr-google-samsung',
  name: 'Samsung Galazy',
  email: 'samsunggalazy9954@gmail.com',
  avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=Samsung%20Galazy&backgroundColor=1a73e8&textColor=ffffff&fontSize=42&fontWeight=600`,
  provider: 'google',
  isMember: true,
  tier: 'Google Account',
  joinedDate: 'October 2024',
  preferences: {
    streamQuality: 'Auto (4K UHD)',
    spatialAudio: true,
    subtitles: 'English',
    autoplayNext: true,
    saveWatchHistory: true,
  },
};

export function loadStoredUser(): UserProfile | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as UserProfile;
    }
  } catch (e) {
    console.error('Failed to load user session', e);
  }
  return null;
}

export function saveStoredUser(user: UserProfile | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error('Failed to save user session', e);
  }
}
