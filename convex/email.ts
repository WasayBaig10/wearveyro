import { action } from "./_generated/server";
import { v } from "convex/values";

const FROM_EMAIL = "noreply@wearwithveyro.com";
const ADMIN_EMAIL = "wearwithveyro@gmail.com";

function labelLine(label: string, value: string | undefined): string {
  return `<tr><td style="padding: 6px 0; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280;">${label}</td></tr>
  <tr><td style="padding: 0 0 10px; font-size: 14px; color: #111827;">${value ?? "—"}</td></tr>`;
}

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
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827;">${item.name}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: center;">${item.size}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: right;">${item.price}</td>
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
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #111827;">
                Thank You
              </h1>
              <p style="margin: 12px 0 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
                Your order has been placed and is being processed.You will shortly Receive an email and whatsapp message from our team.
              </p>
            </td>
          </tr>

          <!-- Order ID -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #6b7280;">Order ID</p>
                    <p style="margin: 8px 0 0; font-size: 14px; font-weight: 700; color: #111827; letter-spacing: 1px;">${params.orderId}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <h2 style="margin: 0; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: #6b7280;">Items Ordered</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 16px;">
                <thead>
                  <tr>
                    <th style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; text-align: left;">Item</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; text-align: center;">Size</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; text-align: center;">Qty</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; text-align: right;">Price</th>
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
                  <td style="padding: 16px 0; border-top: 1px solid #e5e7eb;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 14px; font-weight: 700; color: #111827; letter-spacing: 1px; text-transform: uppercase;">Total</td>
                        <td style="font-size: 18px; font-weight: 800; color: #111827; text-align: right;">Rs. ${params.total.toLocaleString("en-PK")}</td>
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
              <a href="${params.siteUrl}/profile/orders" style="display: inline-block; padding: 16px 40px; background-color: #111827; color: #ffffff; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; text-decoration: none; border-radius: 4px;">
                View My Orders
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 0 40px 32px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af; line-height: 1.6;">
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

export const sendOrderAdminNotification = action({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    address: v.string(),
    city: v.string(),
    postalCode: v.string(),
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
      console.error("RESEND_API_KEY not set — skipping admin email.");
      return { sent: false };
    }

    const itemsHtml = args.items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #111827;">${item.name}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; text-align: center;">${item.size}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; text-align: center;">${item.quantity}</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280; text-align: right;">${item.price}</td>
          </tr>`
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Order — ${args.orderId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
          <tr>
            <td style="padding: 40px 40px 0; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #111827;">New Order</h1>
              <p style="margin: 12px 0 0; font-size: 15px; color: #6b7280;">${args.orderId}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${labelLine("Customer", args.customerName)}
                      ${labelLine("Email", args.customerEmail)}
                      ${labelLine("Phone", args.customerPhone)}
                      ${labelLine(
                        "Shipping Address",
                        [args.address, args.city, args.postalCode]
                          .filter(Boolean)
                          .join(", ")
                      )}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                  <tr>
                    <th style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; text-align: left;">Item</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; text-align: center;">Size</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; text-align: center;">Qty</th>
                    <th style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6b7280; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>${itemsHtml}</tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 16px 0; border-top: 1px solid #e5e7eb;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size: 14px; font-weight: 700; color: #111827; letter-spacing: 1px; text-transform: uppercase;">Total</td>
                        <td style="font-size: 18px; font-weight: 800; color: #111827; text-align: right;">Rs. ${args.total.toLocaleString("en-PK")}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body></html>`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Order — ${args.orderId} (${args.customerName})`,
          html,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(
          "Resend Admin Notification Error:",
          res.status,
          res.statusText,
          body
        );
        return { sent: false, status: res.status, error: body };
      }

      const data = (await res.json()) as { id?: string };
      console.log(
        "Resend admin notification accepted — messageId:",
        data.id ?? "unknown",
        "order:",
        args.orderId
      );
      return { sent: true, messageId: data.id ?? null };
    } catch (error) {
      console.error("Resend Admin Notification Error:", error);
      return { sent: false, error: String(error) };
    }
  },
});