export default function MarqueeBar({ text = "NEW DROP FRIDAY 10PM" }: { text?: string }) {
  return (
    <div className="w-full py-4 bg-primary-fixed overflow-hidden border-y border-white/10">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="flex items-center gap-8 px-4 font-label-bold text-on-primary-fixed uppercase tracking-widest">
          {text}
          <span className="opacity-60 select-none mx-4">✦</span>
          {text}
          <span className="opacity-60 select-none mx-4">✦</span>
          {text}
          <span className="opacity-60 select-none mx-4">✦</span>
          {text}
          <span className="opacity-60 select-none mx-4">✦</span>
          {text}
        </span>
      </div>
    </div>
  );
}
