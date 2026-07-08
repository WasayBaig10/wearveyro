interface AdminHeaderProps {
  activeTab: "products" | "orders" | "customers";
  onTabChange: (tab: "products" | "orders" | "customers") => void;
  onAddProduct?: () => void;
}

const copy = {
  products: {
    title: "Product Vault",
    subtitle: "Manage inventory, pricing & stock levels",
  },
  orders: {
    title: "Order Ledger",
    subtitle: "Track fulfillment, delivery and status updates",
  },
  customers: {
    title: "Customer Index",
    subtitle: "Monitor spend and recency across accounts",
  },
} as const;

export default function AdminHeader({ activeTab, onTabChange, onAddProduct }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="font-display-xl text-[32px] md:text-[48px] uppercase tracking-tighter leading-none text-primary">
          {copy[activeTab].title}
        </h1>
        <p className="font-label-bold text-[10px] text-secondary uppercase tracking-[0.2em] mt-2">
          {copy[activeTab].subtitle}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {(["products", "orders", "customers"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 border font-label-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer ${
              activeTab === tab
                ? "border-primary-fixed text-primary-fixed bg-primary-fixed/10"
                : "border-white/15 text-secondary hover:border-primary-fixed hover:text-primary-fixed"
            }`}
          >
            {tab}
          </button>
        ))}
        {activeTab === "products" && onAddProduct && (
          <button
            onClick={onAddProduct}
            className="bg-primary-fixed text-on-primary-fixed px-6 py-3 font-label-bold text-label-bold tracking-widest uppercase hover:bg-black hover:text-white border border-transparent hover:border-white transition-all cursor-pointer"
          >
            + Add Product
          </button>
        )}
      </div>
    </div>
  );
}
