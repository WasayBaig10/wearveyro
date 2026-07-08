import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "WEARVEYRO | Terms of Service",
  description: "Wearveyro terms and conditions — governing use of our store.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[800px] mx-auto pt-28 md:pt-32 pb-24 px-container-margin">
        <h1 className="font-display-xl text-[36px] md:text-display-xl uppercase tracking-tighter leading-none mb-2">
          Terms of Service
        </h1>
        <p className="font-label-bold text-[11px] text-secondary uppercase tracking-widest mb-12">
          Last updated — January 2025
        </p>

        <div className="space-y-8 text-secondary text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              1. General
            </h2>
            <p>
              By accessing or purchasing from Wearveyro, you agree to be bound by
              these Terms of Service. If you do not agree, please do not use our
              store. We reserve the right to update these terms at any time;
              changes will be posted on this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              2. Products &amp; Pricing
            </h2>
            <p>
              All prices are listed in Pakistani Rupees (PKR) and include all
              applicable taxes unless stated otherwise. We make every effort to
              display accurate product information and pricing, but we reserve the
              right to correct errors and update prices without prior notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              3. Orders &amp; Payment
            </h2>
            <p>
              When you place an order, you agree to provide accurate and complete
              information. Payment is processed through our secure third-party
              payment gateway. Your order is confirmed once payment is successfully
              authorised and you receive an order confirmation email. We reserve
              the right to cancel any order for reasons including suspected fraud
              or stock unavailability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              4. Shipping &amp; Delivery
            </h2>
            <p>
              Shipping times and costs are outlined in our
              <Link href="/shipping" className="text-primary-fixed hover:underline mx-1">
                Shipping Policy
              </Link>
              . Risk of loss passes to you upon delivery. Delays caused by
              third-party carriers are beyond our control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              5. Returns &amp; Exchanges
            </h2>
            <p>
              We accept returns on unworn, unwashed items within 14 days of
              delivery. The customer is responsible for return shipping costs
              unless the item is defective. Refunds are processed to the original
              payment method within 5–10 business days after we receive the
              returned item.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              6. Limitation of Liability
            </h2>
            <p>
              Wearveyro shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of our products or
              services. Our total liability is limited to the amount paid by you
              for the product in question.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              7. Contact
            </h2>
            <p>
              For questions about these terms, reach us at
              <a
                href="mailto:contact@wearveyro.com"
                className="text-primary-fixed hover:underline ml-1"
              >
                contact@wearveyro.com
              </a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
