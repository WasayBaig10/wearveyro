import { action, mutation } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

/**
 * Leopard (LCS) Courier integration.
 *
 * Credentials come from Convex environment variables (never the client):
 *   LEOPARD_API_KEY      — merchant API key
 *   LEOPARD_PASSWORD     — merchant API password (alias: LEOPARD_API_PASSWORD)
 *   LEOPARD_API_ENVIRONMENT — "production" (default) or "staging"
 *   LEOPARD_ORIGIN_CITY  — "self" (default) or a Leopard city ID
 *   LEOPARD_DEST_CITY_ID — optional fixed destination city ID override
 *   LEOPARD_PACKET_WEIGHT — packet weight in grams (default 500)
 *
 * Set them with: npx convex env set LEOPARD_API_KEY "..."
 */

const PRODUCTION_BASE = "https://merchantapi.leopardscourier.com/api/";
const STAGING_BASE = "https://merchantapistaging.leopardscourier.com/api/";

interface LeopardConfig {
  ok: true;
  apiKey: string;
  apiPassword: string;
  baseUrl: string;
  originCity: string;
  packetWeightGrams: number;
}

function getLeopardConfig():
  | LeopardConfig
  | { ok: false; error: string } {
  const apiKey = process.env.LEOPARD_API_KEY?.trim();
  const apiPassword = (
    process.env.LEOPARD_PASSWORD ??
    process.env.LEOPARD_API_PASSWORD
  )?.trim();
  const environment = (
    process.env.LEOPARD_API_ENVIRONMENT ?? "production"
  ).toLowerCase();
  const baseUrl = environment === "staging" ? STAGING_BASE : PRODUCTION_BASE;
  const originCity = process.env.LEOPARD_ORIGIN_CITY?.trim() || "self";
  const packetWeightGrams = Number(
    process.env.LEOPARD_PACKET_WEIGHT ?? 500
  );

  if (!apiKey || !apiPassword) {
    return {
      ok: false,
      error:
        "Leopard API credentials are not configured. Set LEOPARD_API_KEY and LEOPARD_PASSWORD in the Convex environment (npx convex env set).",
    };
  }
  return {
    ok: true,
    apiKey,
    apiPassword,
    baseUrl,
    originCity,
    packetWeightGrams: Number.isFinite(packetWeightGrams) && packetWeightGrams > 0 ? packetWeightGrams : 500,
  };
}

async function leopardFetch(
  url: string,
  init: RequestInit,
  timeoutMs = 30000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

function normalizeCityName(name: string): string {
  return name.toLowerCase().replace(/[^a-z]/g, "");
}

interface CityEntry {
  id: number | string;
  name: string;
}

function extractCities(body: Record<string, unknown>): CityEntry[] {
  const rows: unknown[] = [];
  for (const key of ["cities", "data", "result", "city_list", "cityList"]) {
    const val = body[key];
    if (Array.isArray(val)) rows.push(...val);
  }
  if (rows.length === 0) {
    for (const val of Object.values(body)) {
      if (Array.isArray(val) && val.length > 0 && typeof val[0] === "object" && val[0] !== null) {
        const sample = val[0] as Record<string, unknown>;
        if ("city_name" in sample || "name" in sample || "city" in sample || "city_id" in sample) {
          rows.push(...(val as unknown[]));
        }
      }
    }
  }
  const entries: CityEntry[] = [];
  for (const raw of rows) {
    const c = raw as Record<string, unknown>;
    const id = c.city_id ?? c.id ?? c.ID ?? c.cityId;
    const name = c.city_name ?? c.name ?? c.city ?? c.title;
    if ((typeof id === "number" || typeof id === "string") && id !== "" && name) {
      entries.push({ id, name: String(name) });
    }
  }
  return entries;
}

async function resolveDestinationCity(
  cfg: LeopardConfig,
  cityName: string | undefined
): Promise<{ ok: true; cityId: number | string } | { ok: false; error: string }> {
  const override = process.env.LEOPARD_DEST_CITY_ID?.trim();
  if (override) return { ok: true, cityId: override };

  if (!cityName?.trim()) {
    return { ok: false, error: "Order has no destination city to book against." };
  }

  const url = new URL(`${cfg.baseUrl}getAllCities/format/json/`);
  url.searchParams.set("api_key", cfg.apiKey);
  url.searchParams.set("api_password", cfg.apiPassword);

  let res: Response;
  try {
    res = await leopardFetch(url.toString(), { method: "GET" });
  } catch (err) {
    return {
      ok: false,
      error: `Could not reach Leopard city list: ${err instanceof Error ? err.message : "network error"}`,
    };
  }
  if (!res.ok) {
    return { ok: false, error: `Leopard getAllCities failed (HTTP ${res.status}).` };
  }

  const body = (await res.json()) as Record<string, unknown>;
  const cities = extractCities(body);
  if (cities.length === 0) {
    return { ok: false, error: "Leopard returned an empty city list." };
  }

  const target = normalizeCityName(cityName);
  const match =
    cities.find((c) => normalizeCityName(c.name) === target) ??
    cities.find(
      (c) =>
        normalizeCityName(c.name).startsWith(target) ||
        target.startsWith(normalizeCityName(c.name))
    );

  if (!match) {
    return {
      ok: false,
      error: `City "${cityName}" is not in Leopard's city list. Pick a serviced city or set LEOPARD_DEST_CITY_ID.`,
    };
  }
  return { ok: true, cityId: match.id };
}

interface TrackEvent {
  status: string;
  detail?: string;
  date?: string;
  time?: string;
  location?: string;
}

function extractHistory(packet: Record<string, unknown>): TrackEvent[] {
  const raw =
    packet.packet_history ??
    packet.history ??
    packet.status_history ??
    packet.track_history ??
    packet.events;
  if (!Array.isArray(raw)) return [];
  return raw.map((row) => {
    const r = (row ?? {}) as Record<string, unknown>;
    return {
      status: String(r.status ?? r.status_detail ?? r.title ?? ""),
      detail: r.status_detail != null ? String(r.status_detail) : r.detail != null ? String(r.detail) : undefined,
      date: r.date != null ? String(r.date) : r.datetime != null ? String(r.datetime) : undefined,
      time: r.time != null ? String(r.time) : undefined,
      location: r.location != null ? String(r.location) : r.city != null ? String(r.city) : undefined,
    };
  }).filter((e) => e.status);
}

/**
 * Books a Leopard shipment for an order and saves the returned consignment
 * number (CN) / tracking ID onto the order document.
 */
export const bookOrderShipment = action({
  args: { orderId: v.string() },
  handler: async (ctx, args): Promise<
    | { ok: true; consignmentId: string; slipUrl: string | null; alreadyBooked?: boolean }
    | { ok: false; error: string }
  > => {
    const cfg = getLeopardConfig();
    if (!cfg.ok) return { ok: false, error: cfg.error };

    const order = await ctx.runQuery(api.orders.getOrderByDisplayId, {
      orderId: args.orderId,
    });
    if (!order) {
      return { ok: false, error: `Order ${args.orderId} not found.` };
    }
    if (order.courierConsignmentId) {
      return {
        ok: true,
        consignmentId: order.courierConsignmentId,
        slipUrl: order.courierSlipUrl ?? null,
        alreadyBooked: true,
      };
    }

    const pieces = order.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const collectAmount =
      (order.paymentMethod ?? "cod") === "cod" ? order.total : 0;

    const cityResult = await resolveDestinationCity(cfg, order.city);
    if (!cityResult.ok) {
      await ctx.runMutation(api.leopard.saveShipmentError, {
        orderId: args.orderId,
        error: cityResult.error,
      });
      return { ok: false, error: cityResult.error };
    }

    const payload = {
      api_key: cfg.apiKey,
      api_password: cfg.apiPassword,
      booked_packet_weight: cfg.packetWeightGrams,
      booked_packet_no_piece: pieces,
      booked_packet_collect_amount: collectAmount,
      booked_packet_order_id: order.orderId,
      origin_city: cfg.originCity,
      destination_city: cityResult.cityId,
      shipment_name_eng: "self",
      shipment_email: "self",
      shipment_phone: "self",
      shipment_address: "self",
      consignment_name_eng: order.customerName || "Customer",
      consignment_email: order.customerEmail?.trim() || "n/a",
      consignment_phone: order.customerPhone?.trim() || "n/a",
      consignment_address: `${order.address ?? ""}, ${order.city ?? ""}`.trim(),
      special_instructions: order.postalCode
        ? `Postal code: ${order.postalCode}`
        : "",
    };

    let res: Response;
    try {
      res = await leopardFetch(`${cfg.baseUrl}bookPacket/format/json/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      const message = `Leopard booking request failed: ${err instanceof Error ? err.message : "network error"}`;
      await ctx.runMutation(api.leopard.saveShipmentError, {
        orderId: args.orderId,
        error: message,
      });
      return { ok: false, error: message };
    }

    let body: Record<string, unknown>;
    try {
      body = (await res.json()) as Record<string, unknown>;
    } catch {
      const message = `Leopard booking returned a non-JSON response (HTTP ${res.status}).`;
      await ctx.runMutation(api.leopard.saveShipmentError, {
        orderId: args.orderId,
        error: message,
      });
      return { ok: false, error: message };
    }

    const success =
      body.status === 1 ||
      body.status === "1" ||
      body.success === true ||
      body.success === "1";
    const consignmentId = String(
      body.track_number ?? body.consignment_no ?? body.cn ?? ""
    ).trim();

    if (!success || !consignmentId) {
      const message =
        typeof body.error === "string" && body.error
          ? body.error
          : typeof body.error_msg === "string" && body.error_msg
            ? body.error_msg
            : `Leopard booking rejected the packet (HTTP ${res.status}).`;
      await ctx.runMutation(api.leopard.saveShipmentError, {
        orderId: args.orderId,
        error: message,
      });
      return { ok: false, error: message };
    }

    const slipUrl =
      typeof body.slip_link === "string" && body.slip_link
        ? body.slip_link
        : typeof body.label_link === "string" && body.label_link
          ? body.label_link
          : null;

    await ctx.runMutation(api.leopard.saveShipmentBooking, {
      orderId: args.orderId,
      consignmentId,
      slipUrl,
      bookedAt: Date.now(),
    });

    return { ok: true, consignmentId, slipUrl };
  },
});

/**
 * Queries Leopard's tracking API for the order's consignment and persists the
 * latest live status onto the order document.
 */
export const trackShipment = action({
  args: { orderId: v.string() },
  handler: async (ctx, args): Promise<
    | {
        ok: true;
        consignmentId: string;
        status: string;
        detail?: string;
        events: TrackEvent[];
        checkedAt: number;
      }
    | { ok: false; error: string }
  > => {
    const cfg = getLeopardConfig();
    if (!cfg.ok) return { ok: false, error: cfg.error };

    const order = await ctx.runQuery(api.orders.getOrderByDisplayId, {
      orderId: args.orderId,
    });
    if (!order) {
      return { ok: false, error: `Order ${args.orderId} not found.` };
    }
    if (!order.courierConsignmentId) {
      return {
        ok: false,
        error: "No Leopard consignment ID on this order yet — book the shipment first.",
      };
    }
    const consignmentId = order.courierConsignmentId;

    const url = new URL(`${cfg.baseUrl}trackBookedPacket/format/json/`);
    url.searchParams.set("api_key", cfg.apiKey);
    url.searchParams.set("api_password", cfg.apiPassword);
    url.searchParams.set("track_numbers", consignmentId);

    let res: Response;
    try {
      res = await leopardFetch(url.toString(), { method: "GET" });
    } catch (err) {
      return {
        ok: false,
        error: `Leopard tracking request failed: ${err instanceof Error ? err.message : "network error"}`,
      };
    }

    let body: Record<string, unknown>;
    try {
      body = (await res.json()) as Record<string, unknown>;
    } catch {
      return {
        ok: false,
        error: `Leopard tracking returned a non-JSON response (HTTP ${res.status}).`,
      };
    }

    const success =
      body.status === 1 ||
      body.status === "1" ||
      body.success === true ||
      body.success === "1";
    const packetList = Array.isArray(body.packet_list)
      ? (body.packet_list as Record<string, unknown>[])
      : Array.isArray(body.data)
        ? (body.data as Record<string, unknown>[])
        : [];

    if (!success || packetList.length === 0) {
      const message =
        typeof body.error === "string" && body.error
          ? body.error
          : `Leopard tracking returned no data for ${consignmentId} (HTTP ${res.status}).`;
      return { ok: false, error: message };
    }

    const packet = packetList[0] ?? {};
    const status = String(
      packet.status ?? packet.status_detail ?? packet.current_status ?? "Unknown"
    );
    const detail =
      packet.status_detail != null
        ? String(packet.status_detail)
        : packet.detail != null
          ? String(packet.detail)
          : undefined;
    const events = extractHistory(packet);
    const checkedAt = Date.now();

    await ctx.runMutation(api.leopard.saveShipmentStatus, {
      orderId: args.orderId,
      status,
      detail,
      checkedAt,
    });

    return {
      ok: true,
      consignmentId,
      status,
      detail,
      events,
      checkedAt,
    };
  },
});

export const saveShipmentBooking = mutation({
  args: {
    orderId: v.string(),
    consignmentId: v.string(),
    slipUrl: v.optional(v.union(v.string(), v.null())),
    bookedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique();
    if (!order) throw new Error(`Order ${args.orderId} not found.`);

    await ctx.db.patch(order._id, {
      courierConsignmentId: args.consignmentId,
      courierSlipUrl: args.slipUrl ?? undefined,
      courierBookedAt: args.bookedAt ?? Date.now(),
      courierStatus: "Booked",
      courierStatusAt: Date.now(),
      courierError: undefined,
    });
    return { ok: true as const };
  },
});

export const saveShipmentStatus = mutation({
  args: {
    orderId: v.string(),
    status: v.string(),
    detail: v.optional(v.union(v.string(), v.null())),
    checkedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique();
    if (!order) throw new Error(`Order ${args.orderId} not found.`);

    await ctx.db.patch(order._id, {
      courierStatus: args.status,
      courierStatusDetail: args.detail ?? undefined,
      courierStatusAt: args.checkedAt ?? Date.now(),
    });
    return { ok: true as const };
  },
});

export const saveShipmentError = mutation({
  args: { orderId: v.string(), error: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique();
    if (!order) throw new Error(`Order ${args.orderId} not found.`);

    await ctx.db.patch(order._id, { courierError: args.error });
    return { ok: true as const };
  },
});
