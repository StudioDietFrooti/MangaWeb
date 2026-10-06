import React, { useState } from 'react';
import {
  User,
  Mail,
  Shield,
  CheckCircle2,
  Tv,
  Volume2,
  Subtitles,
  History,
  HardDrive,
  LogOut,
  Edit2,
  Save,
  Check,
  Sparkles,
  Camera,
} from 'lucide-react';
import { UserProfile } from '../types';
import { getGoogleAvatar } from '../utils/auth';

interface AccountSettingsViewProps {
  user: UserProfile | null;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onSignOut: () => void;
  onOpenSignIn: () => void;
}

export const AccountSettingsView: React.FC<AccountSettingsViewProps> = ({
  user,
  onUpdateUser,
  onSignOut,
  onOpenSignIn,
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [customAvatar, setCustomAvatar] = useState(user?.avatarUrl || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fallback / guest state
  if (!user) {
    return (
      <div className="w-full max-w-2xl mx-auto py-8 flex flex-col items-center text-center gap-6 animate-in fade-in">
        <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center text-neutral-400">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Guest Account</h2>
          <p className="text-sm text-neutral-400 max-w-md">
            You are currently browsing as a guest. Sign in with your Google account to sync your watchlist, resume movies on any device, and customize playback settings.
          </p>
        </div>
        <button
          onClick={onOpenSignIn}
          className="bg-white hover:bg-neutral-100 text-neutral-900 font-semibold px-8 py-3 rounded-full text-sm shadow-xl transition-all duration-200"
        >
          Sign In with Google
        </button>
      </div>
    );
  }

  const handleSaveProfile = () => {
    const updated: UserProfile = {
      ...user,
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      avatarUrl: customAvatar.trim() || getGoogleAvatar(email || user.email, name || user.name),
    };
    onUpdateUser(updated);
    setIsEditingProfile(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePreferenceChange = <K extends keyof UserProfile['preferences']>(
    key: K,
    value: UserProfile['preferences'][K]
  ) => {
    const updated: UserProfile = {
      ...user,
      preferences: {
        ...user.preferences,
        [key]: value,
      },
    };
    onUpdateUser(updated);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 py-2 animate-in fade-in">
      {/* Page Title */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Account & Settings</h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Manage your Google profile, playback preferences, and streaming quality.
          </p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 glass-pill px-3 py-1 bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Settings saved</span>
          </div>
        )}
      </div>

      {/* 1. Profile Card */}
      <div className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 border border-white/10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Gmail Profile Picture */}
          <div className="relative group/avatar shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/25 shadow-xl bg-gradient-to-tr from-neutral-800 to-neutral-700">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initial avatar
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {/* Google Badge Overlay */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md p-1 border border-black/10">
              <svg className="w-full h-full" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
          </div>

          {/* User Details */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <span className="glass-pill px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                Verified
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono">{user.email}</p>
            <p className="text-xs text-neutral-500">
              Connected via Google • Joined {user.joinedDate}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (isEditingProfile) {
                handleSaveProfile();
              } else {
                setName(user.name);
                setEmail(user.email);
                setCustomAvatar(user.avatarUrl);
                setIsEditingProfile(true);
              }
            }}
            className="glass-pill px-4 py-2 text-xs font-medium text-white hover:bg-white/15 flex items-center gap-2 border border-white/20"
          >
            {isEditingProfile ? (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </>
            ) : (
              <>
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Edit Form Modal/Drawer */}
      {isEditingProfile && (
        <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4 border border-white/20 animate-in fade-in">
          <h4 className="text-sm font-semibold text-white">Edit Profile Details</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass-input text-xs text-white rounded-xl px-3 py-2 border border-white/10"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Google Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input text-xs text-white rounded-xl px-3 py-2 border border-white/10"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-neutral-400 block mb-1">
                Profile Picture URL (Leave empty to use automatic Google avatar)
              </label>
              <input
                type="url"
                value={customAvatar}
                onChange={(e) => setCustomAvatar(e.target.value)}
                placeholder="https://..."
                className="w-full glass-input text-xs text-white rounded-xl px-3 py-2 border border-white/10"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="glass-pill px-4 py-1.5 text-xs text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="bg-white text-black font-semibold px-5 py-1.5 rounded-full text-xs hover:bg-neutral-200"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* 2. Playback & Video Quality Preferences */}
      <div className="glass-card rounded-3xl p-6 flex flex-col gap-5 border border-white/10">
        <h4 className="text-sm uppercase font-semibold text-neutral-400 tracking-wider flex items-center gap-2">
          <Tv className="w-4 h-4 text-neutral-300" />
          <span>Playback & Video Quality</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Streaming Quality */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2">
            <label className="text-xs font-semibold text-white">Default Video Resolution</label>
            <select
              value={user.preferences.streamQuality}
              onChange={(e) =>
                handlePreferenceChange(
                  'streamQuality',
                  e.target.value as UserProfile['preferences']['streamQuality']
                )
              }
              className="glass-input text-xs text-neutral-200 rounded-xl px-3 py-2 bg-neutral-900/80 border border-white/10"
            >
              <option value="Auto (4K UHD)">Auto (4K UHD) • Recommended</option>
              <option value="1080p FHD">1080p Full HD</option>
              <option value="720p HD">720p HD</option>
              <option value="Data Saver">Data Saver (Mobile)</option>
            </select>
            <span className="text-[11px] text-neutral-500">
              Adjusts dynamically based on network bandwidth.
            </span>
          </div>

          {/* Subtitles Preference */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col gap-2">
            <label className="text-xs font-semibold text-white">Subtitles & Captions</label>
            <select
              value={user.preferences.subtitles}
              onChange={(e) =>
                handlePreferenceChange(
                  'subtitles',
                  e.target.value as UserProfile['preferences']['subtitles']
                )
              }
              className="glass-input text-xs text-neutral-200 rounded-xl px-3 py-2 bg-neutral-900/80 border border-white/10"
            >
              <option value="Off">Off</option>
              <option value="English">English</option>
              <option value="English [CC]">English [CC] (Closed Captions)</option>
              <option value="Auto">Auto-detect based on video</option>
            </select>
            <span className="text-[11px] text-neutral-500">
              Subtitles appear automatically during cinema playback.
            </span>
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-3 pt-2">
          {/* Spatial Audio Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.02] transition">
            <div className="flex items-center gap-3">
              <Volume2 className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-white">Dolby Atmos & Spatial Audio</p>
                <p className="text-[11px] text-neutral-400">Enable 3D audio on supported headphones and soundbars</p>
              </div>
            </div>
            <button
              onClick={() => handlePreferenceChange('spatialAudio', !user.preferences.spatialAudio)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                user.preferences.spatialAudio ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-neutral-900 transition-transform ${
                  user.preferences.spatialAudio ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Autoplay Next Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.02] transition">
            <div className="flex items-center gap-3">
              <Tv className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-white">Autoplay Next Episode</p>
                <p className="text-[11px] text-neutral-400">Automatically start the next episode in TV series</p>
              </div>
            </div>
            <button
              onClick={() => handlePreferenceChange('autoplayNext', !user.preferences.autoplayNext)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                user.preferences.autoplayNext ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-neutral-900 transition-transform ${
                  user.preferences.autoplayNext ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Watch History Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.02] transition">
            <div className="flex items-center gap-3">
              <History className="w-4 h-4 text-neutral-400" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-white">Save Watch History</p>
                <p className="text-[11px] text-neutral-400">Keep progress saved in Continue Watching across sessions</p>
              </div>
            </div>
            <button
              onClick={() => handlePreferenceChange('saveWatchHistory', !user.preferences.saveWatchHistory)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                user.preferences.saveWatchHistory ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-neutral-900 transition-transform ${
                  user.preferences.saveWatchHistory ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Account Actions & Sign Out */}
      <div className="glass-card rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-neutral-400" />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-white">Google Security & Session</p>
            <p className="text-[11px] text-neutral-400">Signed in as {user.email}</p>
          </div>
        </div>

        <button
          onClick={onSignOut}
          className="glass-pill px-5 py-2 text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-2 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
