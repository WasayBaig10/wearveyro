"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter min-h-[80dvh] md:h-[819px] pt-10">
      {/* Left Column - Info & CTA */}
      <div className="flex flex-col justify-center border border-white/15 p-8 md:p-12 bg-surface-container-lowest">
        <p className="font-label-bold text-primary-fixed mb-4 tracking-widest text-[13px]">
          SEASONAL RELEASE // 2024
        </p>
        <h2 className="font-display-xl text-[60px] md:text-display-xl uppercase leading-[0.9] mb-8 select-none">
          New <br /> Drop <br /> <span className="text-outline">Vol. 04</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button className="bg-primary-fixed text-on-primary-fixed px-8 md:px-10 py-4 font-label-bold text-label-bold hover:bg-black hover:text-white border border-transparent hover:border-white transition-all active:scale-95 cursor-pointer text-center">
            SHOP NOW
          </button>
          <button className="border border-white text-primary px-8 md:px-10 py-4 font-label-bold text-label-bold hover:bg-white hover:text-black transition-all active:scale-95 cursor-pointer text-center">
            VIEW LOOKBOOK
          </button>
        </div>
      </div>

      {/* Right Column - Asymmetrical Image */}
      <div className="lg:col-span-2 relative h-[50dvh] md:h-full overflow-hidden group border border-white/15">
        <div 
          className="w-full h-full relative"
          style={{
            transform: `translateY(${scrollOffset * 0.05}px) scale(${1 + scrollOffset * 0.0001})`,
            transition: "transform 100ms ease-out"
          }}
        >
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtkqDl4BKY1qZ08t7kA15BgdMuWQkbL6ejnzlwgvqKabkf4O70c2Nx3TGmyi7AvT_qXUM0xmniTTlEyGvYYJDouKj1bUJ6d5aJY9hWCSNPmN2_7CBGUVcu4TNinxz7mXWd3mo2BHl1Cu1gODE13a60yxvm4UtHVJBh5eAbIP_aYMvNPm0JePXsLGWi6TA1BbXH02gSyvh3-8GJAqiMQT2WsvYHrJPNmgDtuINT3Cf3F5LIQdVejwGFb_fc4XwmWfW_G0mty6Ex8Akt"
            alt="A high-fashion editorial portrait of a model in avant-garde black streetwear, posing against a minimalist concrete architectural background. The lighting is dramatic and high-contrast."
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-4">
          <div className="bg-primary-fixed/20 backdrop-blur-md px-4 py-2 border border-primary-fixed/30 text-primary-fixed font-label-bold text-[12px] tracking-wider select-none">
            EST. TIME: 10:45 PM
          </div>
        </div>
      </div>
    </section>
  );
}
