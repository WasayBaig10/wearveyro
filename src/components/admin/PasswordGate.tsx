"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

const COOKIE_NAME = "isAdminAuthenticated";

function getAuthCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((row) => row.startsWith(`${COOKIE_NAME}=true`));
}

function setAuthCookie(): void {
  document.cookie = `${COOKIE_NAME}=true; path=/; max-age=86400; SameSite=Strict; Secure`;
}

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cookieChecked, setCookieChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(() => getAuthCookie());

  const verify = useMutation(api.admin.verifyAdminPassword);

  useEffect(() => {
    if (!cookieChecked) {
      setIsAuthed(getAuthCookie());
      setCookieChecked(true);
    }
  }, [cookieChecked]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(false);
      setLoading(true);

      try {
        const ok = await verify({ password });
        if (ok) {
          setAuthCookie();
          setIsAuthed(true);
        } else {
          setError(true);
          setPassword("");
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    [password, verify],
  );

  if (isAuthed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-container-margin">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-white/15 bg-surface-container-lowest p-8 space-y-6"
      >
        <div className="space-y-2">
          <h1 className="font-headline-md text-headline-md text-primary tracking-tighter uppercase">
            Admin Access
          </h1>
          <p className="font-label-sm text-sm text-secondary tracking-wider">
            Enter the admin password to continue.
          </p>
        </div>

        <div className="space-y-1">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="PASSWORD"
            autoFocus
            className="w-full bg-surface border border-white/15 px-4 py-3 font-label-bold text-sm text-primary placeholder:text-white/30 focus:border-primary-fixed focus:ring-0 outline-none transition-colors tracking-wider"
          />
          {error && (
            <p className="font-label-bold text-[10px] uppercase tracking-widest text-error">
              Incorrect password.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full h-12 bg-primary-fixed text-on-primary-fixed font-label-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white border border-transparent hover:border-white transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "VERIFYING..." : "ENTER"}
        </button>
      </form>
    </div>
  );
}
