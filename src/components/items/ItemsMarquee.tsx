export default function ItemsMarquee() {
  return (
    <div className="overflow-hidden mb-8 md:mb-12 border-y border-white/10 py-3 select-none">
      <div className="inline-flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="font-display-xl text-[32px] md:text-[40px] opacity-20 italic mx-4 tracking-tight"
          >
            RESTOCK COMING SOON — ARCHIVE DROP 04 — LIMITED QUANTITIES ONLY — WEARVEYRO GLOBAL —
          </span>
        ))}
      </div>
    </div>
  );
}
