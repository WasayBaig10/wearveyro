"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex items-end gap-1.5 h-8">
        <span className="loader-bar w-1.5 bg-black" style={{ animationDelay: "0s", height: "40%" }} />
        <span className="loader-bar w-1.5 bg-black" style={{ animationDelay: "0.15s", height: "70%" }} />
        <span className="loader-bar w-1.5 bg-black" style={{ animationDelay: "0.3s", height: "55%" }} />
        <span className="loader-bar w-1.5 bg-black" style={{ animationDelay: "0.45s", height: "85%" }} />
      </div>
    </div>
  );
}
