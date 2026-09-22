import React from 'react';
import { GasGenieFigure } from './GasGenieFigure';

export type AbilityEffectType = 'tiger' | 'light' | 'portal' | 'gas' | 'art';

interface AbilityEffectOverlayProps {
  effect: AbilityEffectType | null;
  triggerKey?: number | string;
  isCompact?: boolean;
}

export const AbilityEffectOverlay: React.FC<AbilityEffectOverlayProps> = ({
  effect,
  triggerKey = 0,
  isCompact = false,
}) => {
  if (!effect) return null;

  return (
    <div
      key={`${effect}-${triggerKey}`}
      className="absolute inset-0 z-30 pointer-events-none overflow-hidden rounded-inherit flex items-center justify-center"
      aria-hidden="true"
    >
      {/* =========================================================================
          1. TIGER (虎の力): 3 Rapid Orange Diagonal Claw Slashes
          ========================================================================= */}
      {effect === 'tiger' && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-600/10 to-transparent transition-opacity"
            style={{ animation: 'fadePulse 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
          />

          <svg
            className="w-full h-full object-cover"
            viewBox="0 0 200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="tigerClawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="25%" stopColor="#ffedd5" />
                <stop offset="60%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
              <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation={isCompact ? '2' : '3.5'} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Claw Streak 1 (Top Left to Bottom Right) */}
            <g
              filter="url(#orangeGlow)"
              style={{
                strokeDasharray: 320,
                strokeDashoffset: 320,
                animation: 'tigerSlash1 1.25s cubic-bezier(0.12, 0.9, 0.25, 1) forwards',
              }}
            >
              <path
                d="M 25 10 C 65 35, 125 70, 175 105"
                stroke="url(#tigerClawGrad)"
                strokeWidth={isCompact ? '3.5' : '5.5'}
                strokeLinecap="round"
              />
              <path
                d="M 27 12 C 67 36, 124 69, 172 103"
                stroke="#ffffff"
                strokeWidth={isCompact ? '1.2' : '2'}
                strokeLinecap="round"
                opacity="0.9"
              />
            </g>

            {/* Claw Streak 2 (Center Diagonal Streak, Offset) */}
            <g
              filter="url(#orangeGlow)"
              style={{
                strokeDasharray: 320,
                strokeDashoffset: 320,
                animation: 'tigerSlash2 1.25s cubic-bezier(0.12, 0.9, 0.25, 1) forwards',
              }}
            >
              <path
                d="M 45 5 C 85 30, 140 62, 190 95"
                stroke="url(#tigerClawGrad)"
                strokeWidth={isCompact ? '4' : '6'}
                strokeLinecap="round"
              />
              <path
                d="M 47 7 C 86 31, 138 61, 187 93"
                stroke="#ffffff"
                strokeWidth={isCompact ? '1.5' : '2.2'}
                strokeLinecap="round"
                opacity="0.95"
              />
            </g>

            {/* Claw Streak 3 (Bottom Diagonal Streak) */}
            <g
              filter="url(#orangeGlow)"
              style={{
                strokeDasharray: 320,
                strokeDashoffset: 320,
                animation: 'tigerSlash3 1.25s cubic-bezier(0.12, 0.9, 0.25, 1) forwards',
              }}
            >
              <path
                d="M 10 22 C 55 48, 110 80, 160 115"
                stroke="url(#tigerClawGrad)"
                strokeWidth={isCompact ? '3.5' : '5'}
                strokeLinecap="round"
              />
              <path
                d="M 12 24 C 56 49, 108 79, 157 113"
                stroke="#ffffff"
                strokeWidth={isCompact ? '1.2' : '1.8'}
                strokeLinecap="round"
                opacity="0.85"
              />
            </g>

            {/* Kinetic Sparks / Ember Splatters along the cuts */}
            <g style={{ animation: 'clawSparks 1.2s ease-out forwards' }}>
              <circle cx="110" cy="55" r="2.5" fill="#fef08a" filter="url(#orangeGlow)" />
              <circle cx="130" cy="72" r="1.8" fill="#fb923c" />
              <circle cx="95" cy="40" r="2" fill="#fed7aa" />
              <circle cx="150" cy="85" r="2.2" fill="#ea580c" />
              <circle cx="70" cy="30" r="1.5" fill="#fef08a" />
            </g>
          </svg>
        </div>
      )}

      {/* =========================================================================
          2. LIGHT (光): Yellow Asteroid Flying Across at Full Speed (No Impact)
          ========================================================================= */}
      {effect === 'light' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {/* Asteroid and its glowing trailing tail flying corner to corner */}
          <div
            className="absolute top-0 left-0 w-32 h-16 origin-center pointer-events-none"
            style={{
              animation: 'yellowAsteroidFlyAcross 0.8s cubic-bezier(0.2, 0.6, 0.35, 1) forwards',
            }}
          >
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 130 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glowing tail gradient */}
                <linearGradient id="asteroidTailGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="25%" stopColor="#fef08a" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#facc15" stopOpacity="0.5" />
                  <stop offset="90%" stopColor="#f97316" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
                </linearGradient>

                {/* Asteroid core radial burst */}
                <radialGradient id="asteroidCoreGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#fef08a" />
                  <stop offset="75%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#eab308" />
                </radialGradient>

                <filter id="yellowAsteroidGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation={isCompact ? '2' : '3.5'} result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Tapered Glowing Tail behind the asteroid */}
              <polygon
                points="105,25 0,16 10,25 0,34"
                fill="url(#asteroidTailGrad)"
                filter="url(#yellowAsteroidGlow)"
              />

              {/* Fine speed streaks inside the tail */}
              <line
                x1="20"
                y1="23"
                x2="105"
                y2="23"
                stroke="#ffffff"
                strokeWidth="1.2"
                opacity="0.9"
              />
              <line
                x1="10"
                y1="25"
                x2="106"
                y2="25"
                stroke="#ffffff"
                strokeWidth="1.6"
                opacity="0.95"
              />
              <line
                x1="30"
                y1="27"
                x2="105"
                y2="27"
                stroke="#fef08a"
                strokeWidth="1.2"
                opacity="0.85"
              />

              {/* Glowing Yellow Asteroid Head */}
              <g filter="url(#yellowAsteroidGlow)">
                {/* Outer luminous corona */}
                <circle cx="106" cy="25" r="9" fill="#facc15" opacity="0.6" />

                {/* Asteroid rocky core */}
                <polygon
                  points="114,25 111,19 104,18 99,22 101,28 107,31 113,28"
                  fill="url(#asteroidCoreGrad)"
                  stroke="#ffffff"
                  strokeWidth="1"
                />

                {/* Blazing white incandescent nucleus */}
                <circle cx="106" cy="25" r="3.5" fill="#ffffff" />
              </g>

              {/* Sparks shedding behind asteroid */}
              <circle cx="85" cy="22" r="1.5" fill="#fef08a" opacity="0.8" />
              <circle cx="70" cy="28" r="1.2" fill="#fde047" opacity="0.7" />
              <circle cx="50" cy="24" r="1" fill="#fef08a" opacity="0.6" />
              <circle cx="35" cy="20" r="0.8" fill="#ffffff" opacity="0.5" />
            </svg>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. PORTAL (門): Swirling Mysterious Vortex Opening in Center & Closing Back
          ========================================================================= */}
      {effect === 'portal' && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          {/* Deep Void Ambient Glow */}
          <div
            className="absolute w-40 h-40 rounded-full bg-radial from-indigo-500/30 via-purple-800/20 to-transparent blur-lg"
            style={{ animation: 'portalSparksOrbit 1.7s linear forwards' }}
          />

          {/* Swirling Portal Event Horizon */}
          <div
            className="relative flex items-center justify-center"
            style={{
              animation: 'portalVortexOpenClose 1.7s cubic-bezier(0.2, 0.85, 0.25, 1) forwards',
            }}
          >
            <svg
              className={isCompact ? 'w-24 h-24' : 'w-36 h-36'}
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="portalCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="35%" stopColor="#1e1b4b" />
                  <stop offset="70%" stopColor="#6366f1" />
                  <stop offset="90%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#c084fc" />
                </radialGradient>
                <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <filter id="portalGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer Swirling Ring */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#spiralGrad)"
                strokeWidth="2.5"
                strokeDasharray="16 8 32 6"
                filter="url(#portalGlow)"
              />

              {/* Spiraling Inflow Arm 1 */}
              <path
                d="M 60 12 C 85 12, 108 35, 108 60 C 108 85, 85 105, 60 105 C 40 105, 25 88, 25 68 C 25 52, 38 40, 52 40 C 64 40, 72 48, 72 58 C 72 65, 66 70, 60 70"
                stroke="url(#spiralGrad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* Spiraling Inflow Arm 2 (Opposite Helix) */}
              <path
                d="M 60 108 C 35 108, 12 85, 12 60 C 12 35, 35 15, 60 15 C 80 15, 95 32, 95 52 C 95 68, 82 80, 68 80 C 56 80, 48 72, 48 62 C 48 55, 54 50, 60 50"
                stroke="#38bdf8"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />

              {/* Black Hole Singularity Eye */}
              <circle cx="60" cy="60" r="22" fill="url(#portalCore)" />
              <circle cx="60" cy="60" r="14" fill="#030712" stroke="#67e8f9" strokeWidth="1" />

              {/* Dimensional Orbiting Specks */}
              <circle cx="60" cy="24" r="2" fill="#e0e7ff" />
              <circle cx="96" cy="60" r="1.5" fill="#a5f3fc" />
              <circle cx="60" cy="96" r="2" fill="#c084fc" />
              <circle cx="24" cy="60" r="1.5" fill="#e0e7ff" />
            </svg>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. GAS (気): Small-Medium Gas Genie Figure with Cool Blue, Violet & Cyan Mouth Flames Automatically Swinging Sword
          ========================================================================= */}
      {effect === 'gas' && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Swirling Smoke/Vapor Vortex Base with Neon Violet & Cyan Radiance */}
          <div
            className="absolute flex items-center justify-center"
            style={{ animation: 'vaporSwirlPuff 1.85s ease-out forwards' }}
          >
            <div className="w-32 h-32 rounded-full bg-radial from-cyan-400/30 via-violet-600/20 to-transparent blur-md" />
            <svg
              className={isCompact ? 'w-24 h-24' : 'w-36 h-36'}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#67e8f9"
                strokeWidth="1.5"
                strokeDasharray="18 10 28 12"
                opacity="0.8"
              />
              <path
                d="M 50 15 C 70 15, 85 30, 85 50 C 85 70, 70 85, 50 85 C 30 85, 20 70, 25 50"
                stroke="#a855f7"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
            </svg>
          </div>

          {/* Small/Medium Gas Genie Figure with Flames Exhaling from Mouth, Automatically Swinging Sword */}
          <div
            className="relative flex flex-col items-center justify-center"
            style={{
              animation: 'genieFormRise 1.85s cubic-bezier(0.2, 0.9, 0.3, 1) forwards',
            }}
          >
            <GasGenieFigure
              size={isCompact ? 'sm' : 'md'}
              autoSwing={true}
              className="drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          5. ART (画): Traditional Japanese Calligraphy Brush Pen Drawing a Black Cross Mark
          ========================================================================= */}
      {effect === 'art' && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Authentic Black Japanese Calligraphy Cross Mark (黒の十字) */}
          <svg
            className="w-full h-full object-cover absolute inset-0"
            viewBox="0 0 200 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Rich Pitch-Black Sumi Ink Gradient */}
              <linearGradient id="shodoSumiInkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#09090b" />
                <stop offset="50%" stopColor="#050507" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>

              {/* Authentic Ink Drop Shadow onto Paper */}
              <filter id="shodoPaperInkShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Stroke 1: Slashing from Top-Left (62, 34) to Bottom-Right (138, 96) */}
            <g filter="url(#shodoPaperInkShadow)">
              {/* Primary Solid Sumi Ink Stroke */}
              <path
                d="M 62 34 Q 98 64 138 96"
                stroke="url(#shodoSumiInkGrad)"
                strokeWidth={isCompact ? '6.5' : '9.5'}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: 120,
                  animation: 'shodoCrossStrokeOne 2.2s cubic-bezier(0.25, 0.85, 0.35, 1) forwards',
                }}
              />

              {/* Authentic Dry-Brush Feathering (飛白 - Hihaku) */}
              <path
                d="M 63 36 Q 99 65 139 97"
                stroke="#18181b"
                strokeWidth={isCompact ? '2' : '3'}
                strokeLinecap="round"
                strokeDasharray="12 4 18 6 10 3"
                opacity="0.85"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: 120,
                  animation: 'shodoCrossStrokeOne 2.2s cubic-bezier(0.25, 0.85, 0.35, 1) forwards',
                }}
              />

              {/* Wet Ink Center Gloss */}
              <path
                d="M 64 35 Q 98 64 136 95"
                stroke="#ffffff"
                strokeWidth={isCompact ? '1' : '1.5'}
                strokeLinecap="round"
                opacity="0.25"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: 120,
                  animation: 'shodoCrossStrokeOne 2.2s cubic-bezier(0.25, 0.85, 0.35, 1) forwards',
                }}
              />
            </g>

            {/* Stroke 2: Crossing from Top-Right (138, 34) to Bottom-Left (62, 96) */}
            <g filter="url(#shodoPaperInkShadow)">
              {/* Primary Solid Sumi Ink Stroke */}
              <path
                d="M 138 34 Q 102 64 62 96"
                stroke="url(#shodoSumiInkGrad)"
                strokeWidth={isCompact ? '7' : '10'}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: 120,
                  animation: 'shodoCrossStrokeTwo 2.2s cubic-bezier(0.25, 0.85, 0.35, 1) forwards',
                }}
              />

              {/* Authentic Dry-Brush Feathering (飛白) */}
              <path
                d="M 137 35 Q 101 65 61 97"
                stroke="#18181b"
                strokeWidth={isCompact ? '2.2' : '3.2'}
                strokeLinecap="round"
                strokeDasharray="14 5 16 4 8 3"
                opacity="0.85"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: 120,
                  animation: 'shodoCrossStrokeTwo 2.2s cubic-bezier(0.25, 0.85, 0.35, 1) forwards',
                }}
              />

              {/* Wet Ink Center Gloss */}
              <path
                d="M 136 35 Q 102 64 64 95"
                stroke="#ffffff"
                strokeWidth={isCompact ? '1' : '1.5'}
                strokeLinecap="round"
                opacity="0.25"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: 120,
                  animation: 'shodoCrossStrokeTwo 2.2s cubic-bezier(0.25, 0.85, 0.35, 1) forwards',
                }}
              />
            </g>

            {/* Saturated Intersection pooling & Authentic Calligraphy Ink Splatters */}
            <g style={{ animation: 'shodoInkSplatterReveal 2.2s ease-out forwards' }}>
              {/* Deep pooling at cross center */}
              <circle cx="100" cy="65" r="4.5" fill="#000000" />
              <circle cx="100" cy="65" r="2" fill="#27272a" opacity="0.4" />

              {/* Realistic Ink Micro-Flicks at flick endpoints */}
              <circle cx="142" cy="99" r="1.5" fill="#09090b" />
              <circle cx="145" cy="103" r="1" fill="#09090b" />
              <circle cx="58" cy="99" r="1.5" fill="#09090b" />
              <circle cx="55" cy="103" r="1.2" fill="#09090b" />
              <circle cx="60" cy="31" r="1.2" fill="#09090b" />
              <circle cx="140" cy="31" r="1.2" fill="#09090b" />
            </g>
          </svg>

          {/* Traditional Japanese Calligraphy Brush Pen (和筆 / 書道筆) */}
          <div
            className="absolute top-0 left-0 pointer-events-none z-30"
            style={{
              animation: 'shodoBrushCrossMotion 2.2s cubic-bezier(0.25, 0.85, 0.35, 1) forwards',
              transformOrigin: '0 0',
            }}
          >
            <svg
              className={isCompact ? 'w-16 h-24' : 'w-20 h-28'}
              viewBox="-30 -80 60 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Bamboo Shaft Grain Gradient */}
                <linearGradient id="shodoBambooGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="35%" stopColor="#f59e0b" />
                  <stop offset="65%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>

                {/* Dark Buffalo Horn Ferrule */}
                <linearGradient id="shodoHornGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="50%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>

                {/* Traditional Calligraphy Bristles: Natural ivory hair to jet-black Sumi ink */}
                <linearGradient id="shodoBristlesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f4f4f5" />
                  <stop offset="30%" stopColor="#e4e4e7" />
                  <stop offset="55%" stopColor="#52525b" />
                  <stop offset="85%" stopColor="#18181b" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>

                <filter id="shodoBrushShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="3" dy="6" stdDeviation="3" floodColor="#000000" floodOpacity="0.55" />
                </filter>
              </defs>

              <g filter="url(#shodoBrushShadow)">
                {/* 1. Hanging Silk Loop at Top of Bamboo Shaft */}
                <path
                  d="M -16 -75 C -18 -82, -14 -84, -12 -75"
                  stroke="#dc2626"
                  strokeWidth="1.2"
                  fill="none"
                />
                <circle cx="-14" cy="-75" r="1.5" fill="#ca8a04" />

                {/* 2. Slender Bamboo Handle (Shaft) */}
                <path
                  d="M -16 -75 L -11 -75 L -6 -16 L -11 -16 Z"
                  fill="url(#shodoBambooGrad)"
                  stroke="#451a03"
                  strokeWidth="0.8"
                />
                {/* Bamboo Node Rings (竹の節) */}
                <line x1="-15" y1="-55" x2="-10" y2="-55" stroke="#78350f" strokeWidth="1.2" />
                <line x1="-13" y1="-35" x2="-8" y2="-35" stroke="#78350f" strokeWidth="1.2" />

                {/* Gold Inlaid Maker's Mark Kanji 「墨」 on Shaft */}
                <text
                  x="-11"
                  y="-42"
                  fill="#fde047"
                  fontSize="5"
                  fontFamily="serif"
                  fontWeight="bold"
                  opacity="0.85"
                >
                  墨
                </text>

                {/* 3. Buffalo Horn Ferrule Collar */}
                <polygon
                  points="-11,-16 -6,-16 -5,-8 -10,-8"
                  fill="url(#shodoHornGrad)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                {/* Gold Trim Bands */}
                <line x1="-11" y1="-16" x2="-6" y2="-16" stroke="#fbbf24" strokeWidth="1" />
                <line x1="-10" y1="-8" x2="-5" y2="-8" stroke="#fbbf24" strokeWidth="0.8" />

                {/* 4. Real Calligraphy Bristles (Cream to Deep Wet Sumi Ink) */}
                <polygon
                  points="-10,-8 -5,-8 -3,-3 0,0 -7,-3"
                  fill="url(#shodoBristlesGrad)"
                />
                {/* Fine individual bristle lines */}
                <path
                  d="M -9 -8 L -4 -3 L 0 0"
                  stroke="#d4d4d8"
                  strokeWidth="0.4"
                  fill="none"
                  opacity="0.7"
                />
                <path
                  d="M -6 -8 L -2 -3 L 0 0"
                  stroke="#71717a"
                  strokeWidth="0.4"
                  fill="none"
                  opacity="0.6"
                />

                {/* Wet Jet-Black Ink Drop at Fine Tip Touching Paper */}
                <circle cx="0" cy="0" r="1.5" fill="#000000" />
              </g>

              {/* Contact Shadow Under Tip */}
              <ellipse cx="2" cy="3" rx="4" ry="2" fill="#000000" opacity="0.35" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
