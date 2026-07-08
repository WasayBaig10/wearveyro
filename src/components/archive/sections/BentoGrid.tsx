"use client";

import Image from "next/image";

export default function BentoGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-7xl mx-auto px-4">
      {/* Item 1 - THE TEES (Large vertical grid cell) */}
      <div className="border border-white/15 group relative aspect-[3/4] overflow-hidden bg-surface-container-lowest md:col-span-2 md:row-span-2">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBysFIsCqPPYMj8Ol4LYjzRz1OHy8XNuEGhTLNj5cLoqf-LM1YPESJhtJiZ6RKqZvv23bxkIqVpZgpjU9fVi_l1QqKK-5BrOfPL7HHWZ8aWl_ptwlbD_HrCTGCdBLh_wNN6pOzzathAvzJ-g9KGPmk-7JoG_bUv6rYBONOhg6SkERF51LHXIZwh34PHLZh1jntvYxHdCfDlVbA3MXb1emcFn6X4n0n9uffZV9F_s89CjzG2zE9EjPELGn2Jbwo9wc07weODq3L3Kxf"
          alt="An artistic close-up of high-quality textile textures, folded streetwear materials."
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent">
          <p className="font-label-bold text-primary-fixed text-[12px] tracking-wider mb-1">ESSENTIALS</p>
          <h3 className="font-headline-lg text-headline-lg uppercase text-primary">THE TEES</h3>
        </div>
      </div>

      {/* Item 2 - OUTERWEAR (Horizontal grid cell) */}
      <div className="border border-white/15 group relative aspect-[3/2] overflow-hidden bg-surface-container-lowest md:col-span-1 md:row-span-1">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZpKaG7f3rVumL3rslU4fOe5TMLm8GPXGN4riKLurZsG_wGMDibCx32knOPWUgszIZCKbVALeWGetEUSiRKJbAWIKlphqCLhOWRgfhQ1kGO_L0GiBiOP3fG3rmrH-W2bs8vL8c7tF2IigB3DxqcasdUNI6vJILBuToVadmW15Pi1-emgEMl9cnXswWfY9xJNLwMKBVg_Jfyxdh8WqO3ghGOwksTFDLL20zqTPziYyZs-wZ7bvh8y6y4Fvtvo92zFvoHk5ocyzYY65M"
          alt="Cinematic shot of a leather biker jacket hanging on a wall."
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="absolute inset-0 object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="font-headline-md text-headline-md uppercase text-primary">OUTERWEAR</h3>
        </div>
      </div>

      {/* Item 3 - ARCHIVE (Text Rotated card) */}
      <div className="border border-white/15 group relative aspect-[3/2] overflow-hidden bg-surface-container-high flex items-center justify-center md:col-span-1 md:row-span-1">
        <div className="absolute inset-0 bg-surface-container-high flex items-center justify-center transition-transform duration-500 group-hover:scale-95">
          <span className="text-outline font-headline-lg text-headline-lg rotate-90 select-none block tracking-widest">
            ARCHIVE
          </span>
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80">
          <button className="font-label-bold text-primary-fixed flex items-center gap-2 cursor-pointer text-[12px] tracking-wider">
            EXPLORE <span className="material-symbols-outlined text-[16px]">north_east</span>
          </button>
        </div>
      </div>

      {/* Item 4 - OBJECTS (Single bento card) */}
      <div className="border border-white/15 group relative aspect-[3/2] overflow-hidden bg-surface-container-lowest md:col-span-2 md:row-span-1">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz151qyP9tBxp6iIc621sOy2TTwQN3nqrlBsQ3WOxaQC1MqVOzucFaVZT2OataGgsURtLQxEyDX50vpF13d-BN-2Oq8QZ6EQEJd03iar5M8615pMTtusoKisnJk5AXAiZK5IF3O8nHCwESB4Gg8KFKJtHshgHu0KoziMSgKtQhRey3DwlpTdcu7mw2vnM1658_ijRydwqRoL2U6fh6bxfbZb-kF27XjkcySRLL4xCAk5NIlUBHrDR9lwRMBKc8I2iO6JO2Z30JkRco"
          alt="Sleek, futuristic black sneakers on a mirror-like surface."
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="absolute inset-0 object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="font-headline-md text-headline-md uppercase text-primary">OBJECTS</h3>
        </div>
      </div>
    </section>
  );
}
