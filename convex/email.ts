import { action } from "./_generated/server";
import { v } from "convex/values";

const FROM_EMAIL ='delivered@resend.dev';

function buildOrderEmailHtml(params: {
  customerName: string;
  orderId: string;
  total: number;
  items: { name: string; size: string; quantity: number; price: string }[];
  siteUrl: string;
}): string {
  const itemsHtml = params.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px;">${item.name}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; text-align: center;">${item.size}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; text-align: right;">${item.price}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color: #131313; border: 1px solid rgba(255,255,255,0.15);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #c3f400;">
                Thank You
              </h1>
              <p style="margin: 12px 0 0; font-size: 15px; color: #a0a0a0; line-height: 1.6;">
                Your order has been placed and is being processed.
              </p>
            </td>
          </tr>

          <!-- Order ID -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e; border: 1px solid rgba(255,255,255,0.1);">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #a0a0a0;">Order ID</p>
                    <p style="margin: 8px 0 0; font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1px;">${params.orderId}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <h2 style="margin: 0; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #a0a0a0;">Items Ordered</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                <thead>
                  <tr>
                    <th style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.15); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #a0a0a0; text-align: left;">Item</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.15); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #a0a0a0; text-align: center;">Size</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.15); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #a0a0a0; text-align: center;">Qty</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.15); font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #a0a0a0; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding: 24px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.15);">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 14px; font-weight: 700; color: #ffffff; letter-spacing: 1px; text-transform: uppercase;">Total</td>
                        <td style="font-size: 18px; font-weight: 800; color: #c3f400; text-align: right;">Rs. ${params.total.toLocaleString("en-PK")}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 32px 40px 40px; text-align: center;">
              <a href="${params.siteUrl}/profile/orders" style="display: inline-block; padding: 16px 40px; background-color: #c3f400; color: #0a0a0a; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; text-decoration: none;">
                View My Orders
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 0 40px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #666; line-height: 1.6;">
                wearveyro<br>
                Karachi, Pakistan
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const sendOrderConfirmation = action({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    orderId: v.string(),
    total: v.number(),
    items: v.array(
      v.object({
        name: v.string(),
        size: v.string(),
        quantity: v.number(),
        price: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not set — skipping email.");
      return { sent: false };
    }

    const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

    const html = buildOrderEmailHtml({
      customerName: args.customerName,
      orderId: args.orderId,
      total: args.total,
      items: args.items,
      siteUrl,
    });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: args.customerEmail,
        subject: `Order Confirmation — ${args.orderId}`,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend error:", res.status, body);
      return { sent: false, error: body };
    }

    return { sent: true };
  },
});
