export default function ProductMarquee() {
  return (
    <div className="bg-surface border-b border-white/15 py-2 overflow-hidden select-none">
      <div className="inline-flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="font-headline-md text-headline-md italic opacity-20 mx-6 tracking-tight"
          >
            VORTEX GRAIL TEE — LIMITED DROP —
          </span>
        ))}
      </div>
    </div>
  );
}
