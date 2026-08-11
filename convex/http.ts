import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/webhook/confirm-order",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const secret = request.headers.get("x-webhook-secret");
    const expected = process.env.WEBHOOK_SECRET;

    if (!expected) {
      return new Response("Webhook secret not configured", { status: 500 });
    }

    if (secret !== expected) {
      return new Response("Unauthorized", { status: 401 });
    }

    let body: { orderId?: string };
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    if (!body.orderId) {
      return new Response("Missing orderId", { status: 400 });
    }

    await ctx.runMutation(internal.orders.confirmByOrderId, { orderId: body.orderId });

    return new Response(JSON.stringify({ confirmed: true, orderId: body.orderId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;
