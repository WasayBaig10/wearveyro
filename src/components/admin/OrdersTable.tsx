"use client";

import { useState, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import AdminTableShell from "./AdminTableShell";

const statusStyles: Record<Doc<"orders">["status"], string> = {
  pending: "text-yellow-300 border-yellow-300/60 bg-yellow-300/10",
  shipped: "text-sky-300 border-sky-300/60 bg-sky-300/10",
  delivered: "text-emerald-300 border-emerald-300/60 bg-emerald-300/10",
};

const statusFilters = ["all", "pending", "shipped", "delivered"] as const;
type StatusFilter = (typeof statusFilters)[number];

export default function OrdersTable() {
  const orders = useQuery(api.orders.listOrders);
  const updateOrderStatus = useMutation(api.orders.updateOrderStatus);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter((order) => {
      if (statusFilter !== "all" && order.status !== statusFilter) return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        order.orderId.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q)
      );
    });
  }, [orders, statusFilter, searchQuery]);

  if (orders === undefined) {
    return (
      <AdminTableShell>
        <table className="w-full text-left animate-pulse">
          <thead>
            <tr className="border-b border-white/15 bg-surface-container">
              {[
                "Order ID",
                "Customer",
                "Date",
                "Items",
                "Total",
                "Status",
                "Actions",
              ].map((label) => (
                <th key={label} className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="p-4"><div className="h-4 bg-surface-container w-24" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-32" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-28" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-10" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-20" /></td>
                <td className="p-4"><div className="h-5 bg-surface-container w-20" /></td>
                <td className="p-4"><div className="h-5 bg-surface-container w-36" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTableShell>
    );
  }

  return (
    <AdminTableShell>
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-white/15 bg-surface-container-low">
        <div className="flex gap-1">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 font-label-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer ${
                statusFilter === filter
                  ? "bg-primary-fixed text-on-primary-fixed"
                  : "border border-white/15 text-secondary hover:border-primary-fixed hover:text-primary-fixed"
              }`}
            >
              {filter === "all" ? "All" : filter}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs ml-auto">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-secondary pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID or Customer..."
            className="w-full h-10 pl-10 pr-4 bg-background border border-white/15 text-primary font-label-bold text-sm tracking-wide placeholder:text-white/20 focus:outline-none focus:border-primary-fixed transition-colors"
          />
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="p-12 text-center">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">
            {orders.length === 0
              ? "No orders yet"
              : "No orders match your filters"}
          </p>
        </div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/15 bg-surface-container">
              {[
                "Order ID",
                "Customer",
                "Date",
                "Items",
                "Total",
                "Status",
                "Actions",
              ].map((label) => (
                <th key={label} className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-b border-white/5 hover:bg-surface-container-low transition-colors">
                <td className="p-4 font-label-bold text-sm text-primary whitespace-nowrap uppercase tracking-wide">
                  {order.orderId}
                </td>
                <td className="p-4 font-label-bold text-sm text-primary whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="p-4 text-sm text-secondary whitespace-nowrap">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="p-4 text-sm text-secondary whitespace-nowrap">
                  {order.items.length}
                </td>
                <td className="p-4 font-label-bold text-sm text-primary-fixed whitespace-nowrap">
                  {order.total}
                </td>
                <td className="p-4">
                  <span className={`inline-block px-2 py-0.5 border font-label-bold text-[10px] uppercase tracking-widest ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {(["pending", "shipped", "delivered"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus({ id: order._id, status })}
                        className="px-3 py-1.5 border border-white/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminTableShell>
  );
}
