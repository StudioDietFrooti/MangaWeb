import React, { useState } from 'react';
import { X, Mail, Shield, Check, Lock, Sparkles, ArrowRight, User } from 'lucide-react';
import { UserProfile } from '../types';
import { getGoogleAvatar } from '../utils/auth';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (user: UserProfile) => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSignInSuccess,
}) => {
  const [email, setEmail] = useState('samsunggalazy9954@gmail.com');
  const [name, setName] = useState('Samsung Galazy');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isManualInput, setIsManualInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const generatedAvatar =
        avatarUrl.trim() ||
        getGoogleAvatar(email, name);

      const googleUser: UserProfile = {
        id: 'usr-' + Date.now(),
        name: name.trim() || 'Google User',
        email: email.trim() || 'user@gmail.com',
        avatarUrl: generatedAvatar,
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

      setIsLoading(false);
      onSignInSuccess(googleUser);
      onClose();
    }, 600);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleGoogleSignIn();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 bg-[#161820]/95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full glass-button-circle text-neutral-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2 pt-2">
          <div className="w-12 h-12 rounded-2xl glass-button-circle text-white mb-1 shadow-lg bg-white/10 border border-white/20">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Sign In to StreamGlass
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xs">
            Connect with your Google account to sync your watchlist, resume across devices, and unlock 4K HDR.
          </p>
        </div>

        {/* Google Sign In Button */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white hover:bg-neutral-100 text-neutral-900 font-semibold py-3 px-4 rounded-2xl flex items-center justify-center gap-3 text-sm shadow-xl transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] border border-white/40 group"
          >
            {/* Official Google 'G' SVG Logo */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
            <span className="font-medium text-neutral-800">
              {isLoading ? 'Signing in with Google...' : 'Continue with Google'}
            </span>
          </button>

          {/* Quick Account Preview */}
          <div className="p-3 rounded-2xl glass-card flex items-center justify-between gap-3 text-xs border border-white/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0 border border-white/20">
                {name.charAt(0) || 'G'}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-white font-medium truncate">{name}</span>
                <span className="text-neutral-400 text-[11px] truncate">{email}</span>
              </div>
            </div>
            <button
              onClick={() => setIsManualInput(!isManualInput)}
              className="text-[11px] text-neutral-300 hover:text-white underline shrink-0"
            >
              {isManualInput ? 'Hide' : 'Edit details'}
            </button>
          </div>
        </div>

        {/* Optional Manual Edit Fields */}
        {isManualInput && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3 pt-1 border-t border-white/10 animate-in fade-in">
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full glass-input text-neutral-200 text-xs rounded-xl px-3 py-2 border border-white/10"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Gmail / Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                className="w-full glass-input text-neutral-200 text-xs rounded-xl px-3 py-2 border border-white/10"
              />
            </div>
            <div>
              <label className="text-xs text-neutral-400 block mb-1">Custom Profile Picture URL (Optional)</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://... (or leave blank for Google avatar)"
                className="w-full glass-input text-neutral-200 text-xs rounded-xl px-3 py-2 border border-white/10"
              />
            </div>
            <button
              type="submit"
              className="glass-pill py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 mt-1"
            >
              Save & Sign In
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/[0.08]">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-neutral-500" /> Secure SSL Connection
          </span>
          <button
            onClick={onClose}
            className="hover:text-white transition"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};
