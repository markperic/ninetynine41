/**
 * Minimal social glyphs — lucide-react 1.x dropped brand/logo icons from
 * its core set, so Facebook/Instagram aren't available from `lucide-react`
 * anymore. Hand-rolled outline SVGs, sized and stroked to match lucide's
 * `h-4 w-4` / `currentColor` convention so they drop into the same spots.
 */
export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.5-1.5H16.5V4.3C16.2 4.26 15.3 4.2 14.3 4.2c-2.1 0-3.5 1.28-3.5 3.63V10.5H8.3v3H10.8V21h2.7Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
