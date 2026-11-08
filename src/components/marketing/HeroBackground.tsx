export default function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-sky">
      <div className="animate-floaty absolute left-[8%] top-[18%] h-12 w-24 rounded-card border-2 border-ink bg-paper" />
      <div className="animate-floaty absolute right-[12%] top-[24%] h-10 w-20 rounded-card border-2 border-ink bg-paper" style={{ animationDelay: "-3s" }} />
      <div className="animate-floaty absolute left-[70%] top-[10%] h-4 w-4 rotate-45 border-2 border-ink bg-yellow" style={{ animationDelay: "-1.5s" }} />
      <div className="animate-floaty absolute left-[20%] top-[8%] h-3 w-3 rotate-45 border-2 border-ink bg-yellow" style={{ animationDelay: "-5s" }} />
      <div className="animate-floaty absolute right-[30%] bottom-[18%] h-14 w-14 rounded-full border-2 border-ink bg-pink" style={{ animationDelay: "-2s" }} />
      <div className="animate-floaty absolute left-[12%] bottom-[14%] h-10 w-10 rounded-full border-2 border-ink bg-green" style={{ animationDelay: "-4s" }} />
    </div>
  );
}
