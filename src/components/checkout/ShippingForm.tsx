export default function ShippingForm() {
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
            placeholder="John Doe"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Email
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
        <div className="sm:col-span-2 space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Address
          </label>
          <input
            type="text"
            placeholder="123 Street Name"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            City
          </label>
          <input
            type="text"
            placeholder="Karachi"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
            Postal Code
          </label>
          <input
            type="text"
            placeholder="75000"
            className="w-full bg-transparent border border-white/15 px-4 py-3 font-body-md text-primary placeholder:text-white/20 focus:border-primary-fixed focus:outline-none transition-colors"
          />
        </div>
      </div>
    </section>
  );
}
