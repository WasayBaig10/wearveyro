import type { ReactNode } from "react";

interface AdminTableShellProps {
  children: ReactNode;
}

export default function AdminTableShell({ children }: AdminTableShellProps) {
  return <div className="border border-white/15 overflow-x-auto">{children}</div>;
}
