import { InstagramIcon, TikTokIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper px-4 py-8 text-center">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-3">
        <div className="flex items-center gap-4 text-ink">
          <a href="#" aria-label="Instagram"><InstagramIcon className="h-6 w-6" /></a>
          <a href="#" aria-label="TikTok"><TikTokIcon className="h-6 w-6" /></a>
        </div>
        <p className="text-sm text-ink/70">Ikuti cerita Wonland di Instagram dan TikTok.</p>
        <span className="rounded-chip border-2 border-ink bg-pink px-3 py-1 text-xs font-bold uppercase tracking-wide">Prototipe</span>
        <p className="text-xs text-ink/60">© 2026 Wonland</p>
      </div>
    </footer>
  );
}
