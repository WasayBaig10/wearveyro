"use client";

import type { ShippingInfo } from "@/lib/checkout";

interface ShippingFormProps {
  values: ShippingInfo;
  onChange: (field: keyof ShippingInfo, value: string) => void;
}

const inputClass =
  "w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors";

export default function ShippingForm({ values, onChange }: ShippingFormProps) {
  return (
    <section className="space-y-6">
      <h2 className="font-headline-md text-headline-md uppercase text-primary">
        Shipping
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Full Name
          </label>
          <input
            type="text"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Email
          </label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Phone
          </label>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+92 300 0000000"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Address
          </label>
          <input
            type="text"
            value={values.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="123 Street Name"
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            City
          </label>
          <input
            type="text"
            value={values.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Karachi"
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Postal Code
          </label>
          <input
            type="text"
            value={values.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            placeholder="75000"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}
