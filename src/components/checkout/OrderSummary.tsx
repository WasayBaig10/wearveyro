import Image from "next/image";

const cartItems = [
  {
    name: "VORTEX GRAIL TEE",
    size: "M",
    price: "Rs. 4,800",
    qty: 1,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCdlWXZgKEw3FryVbQNghSSYQTeL-K3Gz8lLSDSdl7w5fAPBXnxCk-mLIZDZpLBDZj9Ix9abyQub4wsKK-w6Ezn4b3XYp1jrBW8GQnnYylFUywxezygs-QjHOXfYtpsDEBbUqMN3Sn4w3PuERKQpUbxYVC5Kbz3cb3V6Mo9Kuis_6RYjH9Lc6ot1sTqTM3ILgzsmr9eDfOMvmNe89tqmGwKjk24NNKmnyG7RxZxHQdH4ijramGpir_2Y7HXqWbjyx2Yr1a8Mut42Kc",
  },
  {
    name: "STATIC BEANIE",
    size: "OS",
    price: "Rs. 2,200",
    qty: 2,
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDynRrqQd_X_2bpjYzxpGS5hqqViIef7yscWHeJz7hdUp6M7WVshox_sb4oU-wQHD1abyXOM2KWnzy1MhdLV_6QDF1aaCeXKAKNhC_qfGb7--4wv93Gzz-cF-3aJLD4Bb0CW09qyd6hNYKLysdyVXxpJiwgnrkw234GHE0MMToxhsWbEKk09q5ugm4xltDCrW9tRWEqxXQCctmCC6Awl26YK1VKT05Zb_Vx5FJz8BvVo0KfVFJZ8pzsdxqdfxsHftXvJPBnE4QBN8at",
  },
];

export default function OrderSummary() {
  const subtotal = 4800 + 2200 * 2;
  const shipping = 350;
  const total = subtotal + shipping;

  return (
    <aside className="bg-surface-container-lowest border border-white/15 p-6 md:p-8 md:sticky md:top-24 space-y-6">
      <h2 className="font-headline-md text-headline-md uppercase text-primary">
        Order Summary
      </h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.name} className="flex gap-4 border-b border-white/10 pb-4">
            <div className="relative w-16 h-20 bg-surface-container shrink-0 overflow-hidden">
              <Image src={item.src} alt={item.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-label-bold text-sm text-primary truncate uppercase tracking-wide">
                {item.name}
              </h4>
              <p className="font-label-sm text-[11px] text-secondary tracking-wider">
                Size: {item.size} / Qty: {item.qty}
              </p>
              <span className="font-label-bold text-primary-fixed text-sm">{item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex justify-between font-label-bold text-sm text-secondary tracking-wider">
          <span>Subtotal</span>
          <span className="text-primary">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-label-bold text-sm text-secondary tracking-wider">
          <span>Shipping</span>
          <span className="text-primary">Rs. {shipping.toLocaleString()}</span>
        </div>
        <div className="border-t border-white/15 pt-3 flex justify-between font-headline-md text-headline-md">
          <span className="text-primary uppercase">Total</span>
          <span className="text-primary-fixed">Rs. {total.toLocaleString()}</span>
        </div>
      </div>

      <button className="w-full h-14 bg-primary-fixed text-on-primary-fixed font-label-bold text-lg tracking-widest uppercase hover:bg-black hover:text-white border border-transparent hover:border-white transition-all active:scale-[0.98] cursor-pointer neon-glow">
        Place Order
      </button>

      <p className="font-label-sm text-[10px] text-secondary/50 text-center uppercase tracking-wider">
        Your order is secured via encrypted checkout
      </p>
    </aside>
  );
}
