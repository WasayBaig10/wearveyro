"use client";

import { useState } from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import AdminTable from "@/components/admin/AdminTable";
import AdminCreateProductForm from "@/components/admin/AdminCreateProductForm";
import OrdersTable from "@/components/admin/OrdersTable";
import CustomersTable from "@/components/admin/CustomersTable";

type AdminTab = "products" | "orders" | "customers";

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  function handleTabChange(tab: AdminTab) {
    setActiveTab(tab);
    setShowForm(false);
  }

  function handleAddProduct() {
    setActiveTab("products");
    setShowForm(true);
  }

  function renderActiveTable() {
    switch (activeTab) {
      case "orders":
        return <OrdersTable />;
      case "customers":
        return <CustomersTable />;
      default:
        return <AdminTable />;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-white/15 bg-surface-container">
        <div className="max-w-[1600px] mx-auto px-container-margin py-4 flex justify-between items-center">
          <span className="font-headline-md text-headline-md tracking-tighter text-primary select-none">
            wearveyro
          </span>
          <nav className="flex items-center gap-6 font-label-bold text-[10px] uppercase tracking-[0.2em]">
            {(["products", "orders", "customers"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`transition-colors ${
                  activeTab === tab
                    ? "text-primary-fixed border-b-2 border-primary-fixed pb-1"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto pt-12 pb-24 px-container-margin">
        {showForm ? (
          <AdminCreateProductForm
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            <AdminHeader
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onAddProduct={handleAddProduct}
            />
            {renderActiveTable()}
          </>
        )}
      </main>
    </div>
  );
}
