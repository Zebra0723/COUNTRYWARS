// Emoji-free inline SVG icons. All inherit currentColor.

export function StarIcon({ filled = false, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L12 3.5z" />
    </svg>
  );
}

export function SunIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export function MoonIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z" />
    </svg>
  );
}

export function RiseIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 15l5-5 4 4 6-7" />
      <path d="M20 11V7h-4" />
    </svg>
  );
}

export function FallIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 9l5 5 4-4 6 7" />
      <path d="M20 13v4h-4" />
    </svg>
  );
}

// Sleek line illustration for the masthead: a tennis ball with seam and a
// sweeping motion arc. Purely decorative.
export function CourtMark({ size = 64 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="46" cy="34" r="18" stroke="var(--accent)" strokeWidth="2.4" />
      <path
        d="M32 22c6 4 9 10 9 18M60 22c-6 4-9 10-9 18"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M6 66c14-4 22-10 30-22"
        stroke="var(--accent-soft)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <path
        d="M12 70c16-3 27-10 36-24"
        stroke="var(--accent-soft)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="1 7"
        opacity="0.6"
      />
    </svg>
  );
}
