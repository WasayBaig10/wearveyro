"use client";

import { useCallback, useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface TrackEvent {
  status: string;
  detail?: string;
  date?: string;
  time?: string;
  location?: string;
}

interface TrackResult {
  ok: true;
  consignmentId: string;
  status: string;
  detail?: string;
  events: TrackEvent[];
  checkedAt: number;
}

export function courierBadgeClass(status?: string): string {
  const s = (status ?? "").toLowerCase();
  if (!s || s === "booked") return "text-secondary border-black/15 bg-black/5";
  if (s.includes("deliver")) return "text-emerald-600 border-emerald-600/30 bg-emerald-600/10";
  if (s.includes("return") || s.includes("rto")) return "text-red-600 border-red-600/30 bg-red-600/10";
  if (s.includes("transit") || s.includes("dispatch") || s.includes("pickup") || s.includes("pick")) {
    return "text-sky-600 border-sky-600/30 bg-sky-600/10";
  }
  return "text-primary border-black/20 bg-black/5";
}

function formatEventLine(event: TrackEvent): string {
  return [event.date, event.time, event.location].filter(Boolean).join(" · ");
}

interface ShipmentTrackingModalProps {
  displayId: string;
  consignmentId?: string;
  slipUrl?: string;
  storedStatus?: string;
  onClose: () => void;
}

export default function ShipmentTrackingModal({
  displayId,
  consignmentId,
  slipUrl,
  storedStatus,
  onClose,
}: ShipmentTrackingModalProps) {
  const trackShipment = useAction(api.leopard.trackShipment);
  const [phase, setPhase] = useState<"loading" | "done" | "error">("loading");
  const [result, setResult] = useState<TrackResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await trackShipment({ orderId: displayId });
      if (res.ok) {
        setResult(res);
        setPhase("done");
      } else {
        setError(res.error);
        setPhase("error");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tracking failed. Try again.");
      setPhase("error");
    }
  }, [trackShipment, displayId]);

  const refresh = () => {
    setPhase("loading");
    setError(null);
    void fetchStatus();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchStatus();
  }, [fetchStatus]);

  const currentStatus = result?.status ?? storedStatus;
  const currentConsignmentId = result?.consignmentId ?? consignmentId;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto border border-black/15 bg-surface-container-low">
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-black/15 bg-surface-container-low flex justify-between items-center">
          <h2 className="font-label-bold text-label-bold uppercase tracking-widest text-primary">
            Shipment {displayId}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 border border-black/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-error hover:text-error transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="space-y-2">
            {currentConsignmentId && (
              <p className="font-mono text-xs text-secondary tracking-wide">
                CN {currentConsignmentId}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-block px-2 py-0.5 text-[10px] font-label-bold uppercase tracking-widest border ${
                  phase === "loading"
                    ? "text-secondary border-black/15 bg-black/5"
                    : courierBadgeClass(currentStatus)
                }`}
              >
                {phase === "loading"
                  ? "Fetching…"
                  : currentStatus || "Unknown"}
              </span>
              {phase === "done" && result?.detail && (
                <span className="font-label-sm text-[11px] text-secondary tracking-wider">
                  {result.detail}
                </span>
              )}
            </div>
            {phase === "done" && result && (
              <p className="font-label-sm text-[11px] text-secondary/70 tracking-wider">
                Updated {new Date(result.checkedAt).toLocaleString("en-PK")}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={refresh}
              disabled={phase === "loading"}
              className="px-4 py-2 border border-primary-fixed font-label-bold text-[10px] uppercase tracking-widest text-primary-fixed hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {phase === "loading" ? "Tracking…" : "Refresh"}
            </button>
            {(slipUrl || result?.consignmentId) && (
              <a
                href={
                  slipUrl ??
                  `https://leopardscourier.com/`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-black/15 font-label-bold text-[10px] uppercase tracking-widest text-secondary hover:border-primary-fixed hover:text-primary-fixed transition-colors"
              >
                {slipUrl ? "View Slip" : "Leopard Portal"}
              </a>
            )}
          </div>

          {/* Error state */}
          {phase === "error" && error && (
            <p className="text-sm text-red-600 leading-relaxed" role="alert">
              {error}
            </p>
          )}

          {/* Event history */}
          {phase === "done" && result && result.events.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-label-bold text-[10px] uppercase tracking-[0.2em] text-secondary">
                Tracking History
              </h3>
              <ol className="space-y-0">
                {result.events.map((event, i) => {
                  const line = formatEventLine(event);
                  return (
                    <li
                      key={`${event.status}-${event.date ?? ""}-${i}`}
                      className="relative pl-6 pb-6 border-l border-black/15 last:pb-0 ml-1"
                    >
                      <span className="absolute left-0 top-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-primary-fixed border border-black/20" />
                      <p className="font-label-bold text-[11px] uppercase tracking-widest text-primary">
                        {event.status}
                      </p>
                      {event.detail && (
                        <p className="font-label-sm text-sm text-secondary mt-0.5 leading-relaxed">
                          {event.detail}
                        </p>
                      )}
                      {line && (
                        <p className="font-label-sm text-[11px] text-secondary/70 mt-1 tracking-wider">
                          {line}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Empty history */}
          {phase === "done" && result && result.events.length === 0 && (
            <p className="font-label-sm text-sm text-secondary">
              No tracking events yet — check back soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
