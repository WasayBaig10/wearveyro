import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "WEARVEYRO | Shipping Policy",
  description: "Wearveyro shipping and delivery information.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[800px] mx-auto pt-28 md:pt-32 pb-24 px-container-margin">
        <h1 className="font-display-xl text-[36px] md:text-display-xl uppercase tracking-tighter leading-none mb-2">
          Shipping Policy
        </h1>
        <p className="font-label-bold text-[11px] text-secondary uppercase tracking-widest mb-12">
          Last updated — January 2025
        </p>

        <div className="space-y-8 text-secondary text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              1. Domestic Shipping (Pakistan)
            </h2>
            <p>
              We ship to all cities across Pakistan via reliable courier partners.
              Estimated delivery time is 3–7 business days after order confirmation.
              Shipping costs are calculated at checkout based on destination and
              order weight.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              2. International Shipping
            </h2>
            <p>
              International orders are shipped via tracked courier services.
              Delivery typically takes 7–14 business days depending on the
              destination and customs processing. The customer is responsible for
              any customs duties, taxes, or import fees levied by the destination
              country.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              3. Order Processing
            </h2>
            <p>
              Orders are processed within 1–2 business days after payment
              confirmation. You will receive a shipping confirmation email with
              tracking details once your order has been dispatched. During
              high-volume periods or limited drops, processing may take
              slightly longer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-label-bold text-primary tracking-wider uppercase text-xs">
              4. Tracking
            </h2>
            <p>
              A tracking link will be included in your shipping confirmation email.
              If you have not received tracking within 3 business days of your
              order confirmation, please contact us at
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
              5. Lost or Damaged Items
            </h2>
            <p>
              If your order arrives damaged or is lost in transit, please
              reach out within 48 hours of delivery (or the estimated delivery
              date) at
              <a
                href="mailto:contact@wearveyro.com"
                className="text-primary-fixed hover:underline ml-1"
              >
                contact@wearveyro.com
              </a>
              . We will investigate and arrange a replacement or refund.
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
