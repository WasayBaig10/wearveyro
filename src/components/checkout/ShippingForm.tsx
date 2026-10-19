"use client";

import { useState } from "react";
import type { ShippingInfo } from "@/lib/checkout";
import { PK_CITIES, validateEmail } from "@/lib/checkout";

interface ShippingFormProps {
  values: ShippingInfo;
  onChange: (field: keyof ShippingInfo, value: string) => void;
}

const inputClass =
  "w-full bg-transparent border border-black/15 px-4 py-3 font-body-md text-primary placeholder:text-black/20 focus:border-primary-fixed focus:outline-none transition-colors";

const requiredLabelClass =
  "font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary";

export default function ShippingForm({ values, onChange }: ShippingFormProps) {
  const [emailBlurred, setEmailBlurred] = useState(false);

  const emailError = emailBlurred ? validateEmail(values.email) : null;

  return (
    <section className="space-y-6">
      <h2 className="font-headline-md text-headline-md uppercase text-primary">
        Shipping
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-2">
          <label
            htmlFor="shipping-name"
            className={`${requiredLabelClass} after:content-['*'] after:ml-1 after:text-red-600`}
          >
            Full Name
          </label>
          <input
            id="shipping-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="John Doe"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <label
            htmlFor="shipping-email"
            className={`${requiredLabelClass} after:content-['*'] after:ml-1 after:text-red-600`}
          >
            Email
          </label>
          <input
            id="shipping-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            onBlur={() => setEmailBlurred(true)}
            placeholder="john@gmail.com"
            aria-invalid={emailError ? true : undefined}
            className={`${inputClass} ${
              emailError ? "border-red-600" : ""
            }`}
          />
          {emailError && (
            <p role="alert" className="text-red-600 font-label-bold text-[11px] tracking-wider">
              {emailError}
            </p>
          )}
        </div>
        <div className="sm:col-span-2 space-y-2">
          <label
            htmlFor="shipping-phone"
            className={`${requiredLabelClass} after:content-['*'] after:ml-1 after:text-red-600`}
          >
            Phone
          </label>
          <input
            id="shipping-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+92 300 0000000"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <label
            htmlFor="shipping-address"
            className={`${requiredLabelClass} after:content-['*'] after:ml-1 after:text-red-600`}
          >
            Complete Address
          </label>
          <input
            id="shipping-address"
            name="address"
            type="text"
            required
            autoComplete="street-address"
            value={values.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="123 Street Name, Area"
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="shipping-city"
            className={`${requiredLabelClass} after:content-['*'] after:ml-1 after:text-red-600`}
          >
            City
          </label>
          <select
            id="shipping-city"
            name="city"
            required
            value={values.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="">Select City</option>
            {PK_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="shipping-postal" className={requiredLabelClass}>
            Postal Code{" "}
            <span className="normal-case tracking-normal text-secondary/60">
              (optional)
            </span>
          </label>
          <input
            id="shipping-postal"
            name="postalCode"
            type="text"
            required={false}
            autoComplete="postal-code"
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
