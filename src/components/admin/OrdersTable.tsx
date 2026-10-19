"use client";

import { useState, useMemo } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Doc, Id } from "../../../convex/_generated/dataModel";
import AdminTableShell from "./AdminTableShell";
import OrderDetailsModal from "../orders/OrderDetailsModal";

const statusStyles: Record<Doc<"orders">["status"], string> = {
  pending: "text-yellow-300 border-yellow-300/60 bg-yellow-300/10",
  confirmed: "text-emerald-300 border-emerald-300/60 bg-emerald-300/10",
  shipped: "text-sky-300 border-sky-300/60 bg-sky-300/10",
  delivered: "text-black border-black/30 bg-black/10",
};

const statusFilters = ["all", "pending", "confirmed", "shipped", "delivered"] as const;
type StatusFilter = (typeof statusFilters)[number];

const tableHeaders = [
  "Order ID",
  "Customer",
  "Date",
  "Items",
  "Total",
  "Status",
  "Courier",
  "Actions",
] as const;

function courierBadgeStyle(status?: string): string {
  const s = (status ?? "").toLowerCase();
  if (!s || s === "booked") return "text-secondary border-black/15 bg-black/5";
  if (s.includes("deliver")) return "text-emerald-700 border-emerald-700/40 bg-emerald-700/10";
  if (s.includes("return") || s.includes("rto")) return "text-red-700 border-red-700/40 bg-red-700/10";
  if (s.includes("transit") || s.includes("dispatch") || s.includes("pickup") || s.includes("pick")) {
    return "text-sky-700 border-sky-700/40 bg-sky-700/10";
  }
  return "text-primary border-black/20 bg-black/5";
}

export default function OrdersTable() {
  const orders = useQuery(api.orders.listOrders);
  const updateOrderStatus = useMutation(api.orders.updateOrderStatus);
  const bookShipment = useAction(api.leopard.bookOrderShipment);
  const trackShipment = useAction(api.leopard.trackShipment);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<{
    id: Id<"orders">;
    displayId: string;
  } | null>(null);
  const [busyOrder, setBusyOrder] = useState<{
    type: "book" | "track";
    orderId: string;
  } | null>(null);
  const [courierNotices, setCourierNotices] = useState<Record<string, string>>({});

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

  async function handleBook(orderId: string) {
    setBusyOrder({ type: "book", orderId });
    setCourierNotices((prev) => ({ ...prev, [orderId]: "" }));
    try {
      const result = await bookShipment({ orderId });
      if (!result.ok) {
        setCourierNotices((prev) => ({ ...prev, [orderId]: result.error }));
      }
    } catch (err) {
      setCourierNotices((prev) => ({
        ...prev,
        [orderId]: err instanceof Error ? err.message : "Booking failed.",
      }));
    } finally {
      setBusyOrder(null);
    }
  }

  async function handleTrack(orderId: string) {
    setBusyOrder({ type: "track", orderId });
    setCourierNotices((prev) => ({ ...prev, [orderId]: "" }));
    try {
      const result = await trackShipment({ orderId });
      if (!result.ok) {
        setCourierNotices((prev) => ({ ...prev, [orderId]: result.error }));
      }
    } catch (err) {
      setCourierNotices((prev) => ({
        ...prev,
        [orderId]: err instanceof Error ? err.message : "Tracking failed.",
      }));
    } finally {
      setBusyOrder(null);
    }
  }

  function renderCourierCell(order: Doc<"orders">) {
    const isBusy = busyOrder?.orderId === order.orderId;
    const notice = courierNotices[order.orderId];

    return (
      <td className="p-4 min-w-[200px]">
        {order.courierConsignmentId ? (
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() =>
                navigator.clipboard
                  ?.writeText(order.courierConsignmentId as string)
                  .catch(() => undefined)
              }
              title="Copy consignment number"
              className="font-mono text-xs text-primary tracking-wide hover:text-primary-fixed transition-colors cursor-pointer text-left w-fit"
            >
              CN {order.courierConsignmentId}
            </button>
            <span
              className={`inline-block w-fit px-2 py-0.5 border font-label-bold text-[10px] uppercase tracking-widest ${courierBadgeStyle(
                order.courierStatus
              )}`}
            >
              {order.courierStatus || "Booked"}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isBusy}
                onClick={() => handleTrack(order.orderId)}
                className="px-2.5 py-1 border border-black/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBusy && busyOrder?.type === "track" ? "Tracking…" : "Track"}
              </button>
              {order.courierSlipUrl && (
                <a
                  href={order.courierSlipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 border border-black/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors"
                >
                  Slip
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              disabled={isBusy}
              onClick={() => handleBook(order.orderId)}
              className="px-3 py-1.5 border border-primary-fixed font-label-bold text-[10px] uppercase tracking-widest text-primary-fixed hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-fit"
            >
              {isBusy && busyOrder?.type === "book" ? "Booking…" : "Book Shipment"}
            </button>
            <span className="text-[10px] text-secondary/70 tracking-wide">
              {order.courierError ? "" : "Not booked yet"}
            </span>
          </div>
        )}
        {notice ? (
          <p className="mt-1 text-[11px] text-red-600 leading-snug" role="alert">
            {notice}
          </p>
        ) : order.courierError && !order.courierConsignmentId ? (
          <p className="mt-1 text-[11px] text-red-600 leading-snug" role="alert">
            {order.courierError}
          </p>
        ) : null}
      </td>
    );
  }

  if (orders === undefined) {
    return (
      <AdminTableShell>
        <table className="w-full text-left animate-pulse">
          <thead>
            <tr className="border-b border-black/15 bg-surface-container">
              {tableHeaders.map((label) => (
                <th key={label} className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} className="border-b border-black/5">
                {tableHeaders.map((label) => (
                  <td key={label} className="p-4">
                    <div className="h-4 bg-surface-container w-24" />
                  </td>
                ))}
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
      <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-black/15 bg-surface-container-low">
        <div className="flex gap-1">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setStatusFilter(filter)}
              className={`px-4 py-2 font-label-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer ${
                statusFilter === filter
                  ? "bg-primary-fixed text-on-primary-fixed"
                  : "border border-black/15 text-secondary hover:border-primary-fixed hover:text-primary-fixed"
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
            className="w-full h-10 pl-10 pr-4 bg-background border border-black/15 text-primary font-label-bold text-sm tracking-wide placeholder:text-black/20 focus:outline-none focus:border-primary-fixed transition-colors"
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
            <tr className="border-b border-black/15 bg-surface-container">
              {tableHeaders.map((label) => (
                <th key={label} className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-b border-black/5 hover:bg-surface-container-low transition-colors align-top">
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
                {renderCourierCell(order)}
                <td className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() =>
                        setSelectedOrder({ id: order._id, displayId: order.orderId })
                      }
                      className="px-3 py-1.5 border border-primary-fixed font-label-bold text-[10px] uppercase tracking-widest text-primary-fixed hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors cursor-pointer"
                    >
                      View
                    </button>
                    {(["pending", "confirmed", "shipped", "delivered"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus({ id: order._id, status })}
                        className="px-3 py-1.5 border border-black/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors cursor-pointer"
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

      {selectedOrder && (
        <OrderDetailsModal
          orderId={selectedOrder.id}
          displayId={selectedOrder.displayId}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </AdminTableShell>
  );
}
