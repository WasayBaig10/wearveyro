import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "WEARVEYRO | Privacy Policy",
  description: "Wearveyro privacy policy — how we handle your data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[800px] mx-auto pt-28 md:pt-32 pb-24 px-container-margin">
        <h1 className="font-display-xl text-[36px] md:text-display-xl uppercase tracking-tighter leading-none mb-2">
          Privacy Policy
        </h1>
        <p className="font-label-bold text-[11px] text-secondary uppercase tracking-widest mb-12">
          Last updated — January 2025
        </p>

        <div className="space-y-8 text-secondary text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              1. Information We Collect
            </h2>
            <p>
              When you place an order or interact with our store, we collect the personal
              information you provide — including your name, email address, shipping
              address, and payment details. We also collect certain technical data
              automatically (such as IP address and browser type) to improve your
              browsing experience.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              2. How We Use Your Information
            </h2>
            <p>
              Your data is used solely to process and fulfill orders, communicate
              order updates, improve our store, and comply with legal obligations.
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              3. Third-Party Services
            </h2>
            <p>
              We rely on secure third-party providers to operate our store:
              <strong className="text-primary"> Convex</strong> for database and
              backend infrastructure, <strong className="text-primary">Clerk</strong>{" "}
              for authentication, <strong className="text-primary">Resend</strong>{" "}
              for transactional emails, and
              <strong className="text-primary"> Stripe</strong> or similar payment
              processors for payment handling. Each provider is contractually
              obligated to protect your data and may only process it in accordance
              with our instructions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              4. Data Retention
            </h2>
            <p>
              We retain your personal information only as long as necessary to
              fulfill the purposes described in this policy, or as required by
              applicable law. When no longer needed, your data is securely deleted
              or anonymised.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              5. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to access,
              correct, delete, or port your personal data. To exercise any of
              these rights, contact us at
              <a
                href="mailto:contact@wearveyro.com"
                className="text-primary-fixed hover:underline ml-1"
              >
                contact@wearveyro.com
              </a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              6. Contact
            </h2>
            <p>
              Wearveyro<br />
              [Business Address]<br />
              [City, Country]<br />
              <a
                href="mailto:contact@wearveyro.com"
                className="text-primary-fixed hover:underline"
              >
                contact@wearveyro.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
