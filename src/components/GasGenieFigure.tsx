import React from 'react';

interface GasGenieFigureProps {
  /** Size variant of the small-medium figure */
  size?: 'sm' | 'md' | 'lg';
  /** Optional custom class names */
  className?: string;
  /** Whether the sword swing animation loops continuously as a trait (default: true) */
  autoSwing?: boolean;
}

export const GasGenieFigure: React.FC<GasGenieFigureProps> = ({
  size = 'md',
  className = '',
  autoSwing = true,
}) => {
  // Dimensions for small/medium/large
  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-32 h-32 sm:w-40 sm:h-40',
    lg: 'w-44 h-44 sm:w-52 sm:h-52',
  }[size];

  const swordAnimation = autoSwing ? 'genieTraitSwordSwingLoop 3s ease-in-out infinite' : undefined;
  const slashWaveAnimation = autoSwing ? 'slashWaveLoop 3s ease-out infinite' : undefined;

  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${sizeClasses} ${className}`}
      style={{ animation: 'genieFloatHover 3.5s ease-in-out infinite' }}
      aria-label="Gas Genie automatically swinging energy sword with blue, violet, and cyan flames from mouth"
    >
      {/* Background Soft Vapor & Flame Aura Halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-3/4 h-3/4 rounded-full bg-radial from-cyan-400/25 via-violet-600/20 to-transparent blur-md animate-pulse" />
      </div>

      {/* The Small-to-Medium Gas Genie Figure SVG */}
      <svg
        className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.45)]"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Flame Gradients: Cyan, Electric Blue, and Deep Violet */}
          <linearGradient id="coolMouthFlamePrimary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" /> {/* Deep Royal Blue */}
            <stop offset="40%" stopColor="#8b5cf6" /> {/* Electric Violet */}
            <stop offset="75%" stopColor="#06b6d4" /> {/* Cool Cyan */}
            <stop offset="100%" stopColor="#e0f2fe" /> {/* White-hot Core */}
          </linearGradient>

          <linearGradient id="coolMouthFlameSecondary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" /> {/* Violet */}
            <stop offset="50%" stopColor="#3b82f6" /> {/* Blue */}
            <stop offset="100%" stopColor="#22d3ee" /> {/* Cyan */}
          </linearGradient>

          {/* Vapor Genie Body Gradient */}
          <linearGradient id="genieBodyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#2563eb" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.1" />
          </linearGradient>

          {/* Chestplate Armor Gradient */}
          <linearGradient id="genieArmorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Glowing Energy Sword Blade Gradient */}
          <linearGradient id="energySwordGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#67e8f9" />
            <stop offset="70%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="flameGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Swirling Vapor Lower Body Tail */}
        <path
          d="M 80 152 C 60 142, 45 125, 52 108 C 58 95, 68 88, 76 85 C 84 88, 98 95, 104 108 C 112 125, 96 142, 80 152 Z"
          fill="url(#genieBodyGrad)"
          opacity="0.85"
        />
        {/* Tail internal vapor swirls */}
        <path
          d="M 76 142 C 65 130, 62 115, 72 105 C 78 98, 86 102, 84 112 C 82 122, 90 128, 80 142"
          stroke="#67e8f9"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* 2. Muscular Vapor Torso & Shoulders */}
        <path
          d="M 44 68 C 36 78, 42 94, 58 98 C 68 100, 92 100, 102 98 C 118 94, 124 78, 116 68 C 106 58, 94 54, 80 54 C 66 54, 54 58, 44 68 Z"
          fill="url(#genieBodyGrad)"
        />

        {/* 3. Dark Chestplate Armor with Cyan Swirl Crests */}
        <path
          d="M 58 74 C 54 82, 60 92, 72 95 C 78 96, 82 96, 88 95 C 100 92, 106 82, 102 74 C 95 70, 85 68, 80 68 C 75 68, 65 70, 58 74 Z"
          fill="url(#genieArmorGrad)"
          stroke="#06b6d4"
          strokeWidth="1.2"
        />
        {/* Ancient Swirl Carvings on Armor */}
        <path
          d="M 72 82 C 76 80, 80 84, 80 88 C 80 91, 77 92, 75 90"
          stroke="#22d3ee"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 88 82 C 84 80, 80 84, 80 88 C 80 91, 83 92, 85 90"
          stroke="#a855f7"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* 4. Genie Head & Fiery Cyan/Blue Crest */}
        <path
          d="M 66 42 C 60 28, 70 16, 80 18 C 90 16, 100 28, 94 42 C 92 48, 68 48, 66 42 Z"
          fill="url(#genieBodyGrad)"
        />
        {/* Horn-like fire wisps curling up from head */}
        <path
          d="M 72 20 C 64 10, 50 14, 54 26 C 56 32, 64 36, 68 38"
          stroke="#38bdf8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 88 20 C 96 10, 110 14, 106 26 C 104 32, 96 36, 92 38"
          stroke="#818cf8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Glowing Piercing Cyan/White Eyes */}
        <ellipse cx="73" cy="34" rx="2.5" ry="1.5" fill="#ffffff" filter="url(#flameGlowFilter)" />
        <ellipse cx="87" cy="34" rx="2.5" ry="1.5" fill="#ffffff" filter="url(#flameGlowFilter)" />
        <ellipse cx="73" cy="34" rx="1.2" ry="0.8" fill="#a5f3fc" />
        <ellipse cx="87" cy="34" rx="1.2" ry="0.8" fill="#a5f3fc" />

        {/* =========================================================================
            5. COOL BLUE, VIOLET, AND CYAN FLAMES COMING OUT OF MOUTH
            Animated organically with mouthFlamesFlicker and mouthFlamesSecondary
            ========================================================================= */}
        <g id="genie-mouth-and-flames">
          {/* Mouth Cavity */}
          <path
            d="M 75 44 C 77 48, 83 48, 85 44 C 83 46, 77 46, 75 44 Z"
            fill="#030712"
            stroke="#2563eb"
            strokeWidth="0.8"
          />

          {/* Deep Violet & Royal Blue Base Flame Jet */}
          <g style={{ animation: 'mouthFlamesSecondary 2.2s ease-in-out infinite', transformOrigin: '80px 45px' }}>
            <path
              d="M 80 44 C 74 46, 66 50, 68 56 C 70 62, 82 65, 86 70 C 88 74, 95 72, 94 65 C 93 58, 86 52, 80 44 Z"
              fill="url(#coolMouthFlameSecondary)"
              opacity="0.85"
              filter="url(#flameGlowFilter)"
            />
          </g>

          {/* Bright Electric Cyan, Blue & Violet Billowing Mouth Flames */}
          <g style={{ animation: 'mouthFlamesFlicker 1.8s ease-in-out infinite', transformOrigin: '80px 45px' }}>
            {/* Main Center Flame Tongue expanding downward & outward */}
            <path
              d="M 80 44 C 72 48, 62 55, 65 64 C 67 72, 80 76, 78 84 C 76 90, 84 94, 88 86 C 92 78, 84 72, 88 64 C 92 56, 88 48, 80 44 Z"
              fill="url(#coolMouthFlamePrimary)"
              filter="url(#flameGlowFilter)"
            />

            {/* Leftward curling violet/blue flame lick */}
            <path
              d="M 77 46 C 70 48, 56 52, 54 60 C 52 68, 64 70, 60 76 C 58 79, 64 80, 67 75 C 70 70, 74 62, 77 46 Z"
              fill="#8b5cf6"
              opacity="0.9"
            />

            {/* Rightward curling neon cyan flame lick */}
            <path
              d="M 83 46 C 90 48, 102 52, 104 60 C 106 68, 94 70, 98 76 C 100 79, 94 80, 91 75 C 88 70, 84 62, 83 46 Z"
              fill="#22d3ee"
              opacity="0.95"
            />

            {/* White-hot Core Flame Tip */}
            <path
              d="M 79 45 C 76 48, 74 54, 76 58 C 78 62, 82 62, 84 58 C 86 54, 84 48, 81 45 Z"
              fill="#f0fdfa"
              opacity="0.95"
            />
          </g>
        </g>

        {/* =========================================================================
            6. ARM HOLDING SWORD: AUTOMATICALLY SWINGS HIS SWORD LIKE A TRAIT
            Animated continuously with genieTraitSwordSwingLoop
            ========================================================================= */}
        <g
          id="genie-sword-arm-trait"
          style={{
            animation: swordAnimation,
            transformOrigin: '98px 70px',
          }}
        >
          {/* Muscular Vapor Arm */}
          <path
            d="M 98 70 C 112 68, 122 62, 126 50 C 128 46, 124 42, 118 45"
            stroke="url(#genieBodyGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Dark Gauntlet on Wrist */}
          <rect x="120" y="44" width="8" height="5" rx="1.5" fill="#0f172a" stroke="#06b6d4" strokeWidth="0.8" transform="rotate(-30 120 44)" />

          {/* Energy Sword Hilt & Tsuba */}
          <rect x="122" y="42" width="12" height="3" rx="1" fill="#ec4899" transform="rotate(-40 122 42)" />
          <rect x="125" y="46" width="5" height="10" rx="1" fill="#1e293b" stroke="#38bdf8" strokeWidth="0.8" transform="rotate(-40 125 46)" />

          {/* Glowing Spectral Energy Blade */}
          <path
            d="M 125 40 L 152 4 C 154 2, 158 5, 156 9 L 132 44 Z"
            fill="url(#energySwordGrad)"
            stroke="#ffffff"
            strokeWidth="1.2"
            filter="url(#flameGlowFilter)"
          />
          {/* Blade Spine Glimmer */}
          <line x1="126" y1="39" x2="154" y2="4" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* 7. Slashing Shockwave Arc (Cycles automatically with the sword slash) */}
        <g id="genie-slash-shockwave" style={{ animation: slashWaveAnimation }}>
          {/* Cyan/Violet Crescent Wave */}
          <path
            d="M 30 50 C 70 20, 130 35, 155 85"
            stroke="#22d3ee"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            filter="url(#flameGlowFilter)"
            style={{ strokeDasharray: 120, strokeDashoffset: 120 }}
          />
          <path
            d="M 34 52 C 72 22, 128 37, 153 83"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            style={{ strokeDasharray: 120, strokeDashoffset: 120 }}
          />
          <path
            d="M 36 55 C 74 25, 126 40, 150 88"
            stroke="#a855f7"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
            style={{ strokeDasharray: 120, strokeDashoffset: 120 }}
          />
        </g>
      </svg>
    </div>
  );
};
