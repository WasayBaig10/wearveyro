"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setLoading(true);
      const t = setTimeout(() => {
        setLoading(false);
        setPrevPath(pathname);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [pathname, prevPath]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-0.5 bg-black/5 overflow-hidden">
      <div className="h-full bg-black animate-route-bar" />
    </div>
  );
}
