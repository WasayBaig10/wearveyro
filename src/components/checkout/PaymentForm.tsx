export default function PaymentForm() {
  return (
    <section className="space-y-6">
      <h2 className="font-headline-md text-headline-md uppercase text-primary">
        Payment
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Card Number
          </label>
          <input
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Expiry
          </label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            CVV
          </label>
          <input
            type="text"
            placeholder="XXX"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
      </div>
    </section>
  );
}
