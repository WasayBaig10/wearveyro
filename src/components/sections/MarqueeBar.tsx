export default function MarqueeBar() {
  return (
    <div className="w-full overflow-hidden py-8 border-y border-white/15">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer select-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-display-xl text-[48px] md:text-[64px] text-outline mx-6 md:mx-8 tracking-widest">
              LIMITED EDITION RELEASE
            </span>
            <span className="font-display-xl text-[48px] md:text-[64px] text-primary-fixed mx-6 md:mx-8 select-none leading-none">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
