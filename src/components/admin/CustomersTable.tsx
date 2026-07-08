"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AdminTableShell from "./AdminTableShell";

export default function CustomersTable() {
  const customers = useQuery(api.customers.listCustomers);

  if (customers === undefined) {
    return (
      <AdminTableShell>
        <table className="w-full text-left animate-pulse">
          <thead>
            <tr className="border-b border-white/15 bg-surface-container">
              {[
                "Name",
                "Email",
                "Total Spent",
                "Last Order",
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
                <td className="p-4"><div className="h-4 bg-surface-container w-28" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-40" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-20" /></td>
                <td className="p-4"><div className="h-4 bg-surface-container w-24" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTableShell>
    );
  }

  if (customers.length === 0) {
    return (
      <AdminTableShell>
        <div className="p-12 text-center">
          <p className="font-label-bold text-label-bold text-secondary uppercase tracking-widest">
            No customers yet
          </p>
        </div>
      </AdminTableShell>
    );
  }

  return (
    <AdminTableShell>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/15 bg-surface-container">
            {[
              "Name",
              "Email",
              "Total Spent",
              "Last Order",
            ].map((label) => (
              <th key={label} className="p-4 font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="border-b border-white/5 hover:bg-surface-container-low transition-colors">
              <td className="p-4 font-label-bold text-sm text-primary whitespace-nowrap uppercase tracking-wide">
                {customer.name}
              </td>
              <td className="p-4 text-sm text-secondary whitespace-nowrap">
                {customer.email}
              </td>
              <td className="p-4 font-label-bold text-sm text-primary-fixed whitespace-nowrap">
                {customer.totalSpent}
              </td>
              <td className="p-4 text-sm text-secondary whitespace-nowrap">
                {new Date(customer.lastOrderDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminTableShell>
  );
}
