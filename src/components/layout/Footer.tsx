import Link from "next/link";

const legalLinks = [
  { label: "PRIVACY POLICY", href: "/privacy" },
  { label: "TERMS OF SERVICE", href: "/terms" },
  { label: "SHIPPING POLICY", href: "/shipping" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-surface">
      <div className="max-w-[1600px] mx-auto px-container-margin py-12 md:py-16">
        <div className="flex flex-col items-center gap-12 mb-12 text-center">
          <span className="font-wordmark font-bold text-[clamp(2rem,6.5vw,5rem)] uppercase leading-[1.05] text-primary select-none">
            wearw<span className="text-primary-fixed">/</span>veyro
          </span>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-label-bold text-[12px] text-secondary hover:text-primary-fixed hover:line-through transition-all tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-4 text-center md:text-left">
          <p className="font-label-bold text-[10px] text-secondary tracking-widest uppercase select-none">
            ©2024 WEARVEYRO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">
              VISA / MASTERCARD / JAZZCASH / EASYPAISA
            </span>
          </div>
          <p className="font-label-bold text-[10px] text-primary-fixed tracking-widest uppercase select-none">
            CURRENCY: PKR (Rs.)
          </p>
        </div>
      </div>
    </footer>
  );
}
