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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-12">
          <div className="space-y-6 w-full md:max-w-sm">
            <h2 className="font-headline-lg text-headline-lg text-primary select-none">
              wearveyro
            </h2>
            <p className="text-secondary text-sm leading-relaxed">
              Join the inner circle. Be the first to know about secret drops and
              archival releases.
            </p>
          </div>

          <nav className="flex flex-col gap-3 items-start md:items-end">
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
