export default function Logo({ size = 36, className = "" }) {
  return (
    <svg
      viewBox="0 0 120 100"
      width={size}
      height={(size * 100) / 120}
      className={`shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Soft realistic overlap shadow */}
        <filter id="ribbonOverlapShadow" x="-20%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="-1.5" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
        </filter>

        {/* 1. Solid Black Theme (Platinum Silver Chrome) */}
        <linearGradient id="ribbonDarkBack" x1="40" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#D4D4D8" />
          <stop offset="100%" stopColor="#71717A" />
        </linearGradient>
        <linearGradient id="ribbonDarkTwist" x1="82" y1="18" x2="60" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3F3F46" />
          <stop offset="65%" stopColor="#71717A" />
          <stop offset="100%" stopColor="#A1A1AA" />
        </linearGradient>
        <linearGradient id="ribbonDarkFront" x1="14" y1="62" x2="80" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#E4E4E7" />
          <stop offset="100%" stopColor="#A1A1AA" />
        </linearGradient>

        {/* 2. Frosted Glass Theme (Luminous Ice Crystal) */}
        <linearGradient id="ribbonGlassBack" x1="40" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="ribbonGlassTwist" x1="82" y1="18" x2="60" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="65%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>
        <linearGradient id="ribbonGlassFront" x1="14" y1="62" x2="80" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>

        {/* 3. Warm Ivory Theme (Obsidian Charcoal) */}
        <linearGradient id="ribbonIvoryBack" x1="40" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#33302C" />
          <stop offset="60%" stopColor="#1A1918" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="ribbonIvoryTwist" x1="82" y1="18" x2="60" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0A0A0A" />
          <stop offset="65%" stopColor="#242220" />
          <stop offset="100%" stopColor="#3A3734" />
        </linearGradient>
        <linearGradient id="ribbonIvoryFront" x1="14" y1="62" x2="80" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3A3734" />
          <stop offset="55%" stopColor="#1A1918" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>

      <g strokeLinecap="round" strokeLinejoin="round">
        {/* 1. Back Spine & Bottom Bowl (under-layer) */}
        <path
          className="ribbon-back"
          d="M 64 15 C 44 19 32 37 32 57 C 32 78 47 91 66 91 C 86 91 99 79 99 63"
          stroke="url(#ribbonDarkBack)"
          strokeWidth="13.5"
        />

        {/* 2. Inside fold / twist of the upper loop */}
        <path
          className="ribbon-twist"
          d="M 78 33 C 89 23 81 12 64 15"
          stroke="url(#ribbonDarkTwist)"
          strokeWidth="13"
        />

        {/* 3. Front sweeping crossbar with overlap shadow (over-layer) */}
        <path
          className="ribbon-front"
          d="M 14 62 C 24 63 38 56 78 33"
          stroke="url(#ribbonDarkFront)"
          strokeWidth="13.5"
          filter="url(#ribbonOverlapShadow)"
        />
      </g>
    </svg>
  );
}
