export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 3c.3 2.2 1.6 3.8 3.9 4.1v2.9c-1.5 0-2.9-.5-3.9-1.3v6a5.6 5.6 0 1 1-5.6-5.6c.3 0 .7 0 1 .1v3.1a2.6 2.6 0 1 0 1.7 2.4V3h2.9z" />
    </svg>
  );
}
