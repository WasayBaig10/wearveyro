import Image from "next/image";

interface ProductImageGalleryProps {
  imageUrl?: string;
  imageSecondaryUrl?: string;
}

export default function ProductImageGallery({
  imageUrl,
  imageSecondaryUrl,
}: ProductImageGalleryProps) {
  const mainSrc =
    imageUrl ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBCdlWXZgKEw3FryVbQNghSSYQTeL-K3Gz8lLSDSdl7w5fAPBXnxCk-mLIZDZpLBDZj9Ix9abyQub4wsKK-w6Ezn4b3XYp1jrBW8GQnnYylFUywxezygs-QjHOXfYtpsDEBbUqMN3Sn4w3PuERKQpUbxYVC5Kbz3cb3V6Mo9Kuis_6RYjH9Lc6ot1sTqTM3ILgzsmr9eDfOMvmNe89tqmGwKjk24NNKmnyG7RxZxHQdH4ijramGpir_2Y7HXqWbjyx2Yr1a8Mut42Kc";
  const thumbSrc =
    imageSecondaryUrl ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA-Amf6QsW0n8215QUjcbVqWtwL9Dx7lysVakiCPiwvvZ4OfInGz0GryIxQRX3OI2GHH952JDyFzjG_tWCsElIt2PWuwnyQdHp1RpC8zTSLs4UNILIXDh0qo5PaaZB-K2KDWFp3omDWkQ0WAXf_dadDOCwM7p9nmtGWrtbKY-3J9gXjhaP-M6CsHOosIQVQ7wVtsUmzbDXL_MBmrSRsjEn7lwPg8OKdNVnuX-ZEhaTOsei6033ftK-QDyJWEJBXEYvCq1_3dmIYaGCb";

  return (
    // <section className="flex flex-col overflow-hidden">
    //   <div className="aspect-square w-full bg-surface-container-lowest overflow-hidden group">
    //     <Image
    //       src={mainSrc}
    //       alt="Product main view"
    //       width={1200}
    //       height={1200}
    //       priority
    //       sizes="(max-width: 768px) 100vw, 50vw"
    //       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    //     />
    //     <img src={mainSrc} alt="Product main view" className="w-full h-auto" />
    //   </div>
    //   <div className="grid grid-cols-2 border-t border-white/15">
    //     <div className="aspect-square overflow-hidden group border-r border-white/15">
    //       <Image
    //         src={thumbSrc}
    //         alt="Product detail view"
    //         width={500}
    //         height={500}
    //         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    //       />
    //     </div>
    //     <div className="aspect-square overflow-hidden group">
    //       <Image
    //         src={mainSrc}
    //         alt="Product alternate view"
    //         width={500}
    //         height={500}
    //         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    //       />
    //     </div>
    //   </div>
    // </section>
    <section className="flex flex-col overflow-hidden">
      <div className="aspect-square w-full bg-surface-container-lowest overflow-hidden group">
        <img src={mainSrc} alt="Product main view" className="w-full h-full object-cover" />
      </div>
      <div className="grid grid-cols-2 border-t border-white/15">
        <div className="aspect-square overflow-hidden group border-r border-white/15">
          <img 
            src={thumbSrc} 
            alt="Product detail view" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        </div>
        <div className="aspect-square overflow-hidden group">
          <img 
            src={mainSrc} 
            alt="Product alternate view" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        </div>
      </div>
    </section>
  );
}
