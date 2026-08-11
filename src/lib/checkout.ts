export const WHATSAPP_PHONE = "923180217144";

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export const initialShipping: ShippingInfo = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

export function isShippingComplete(s: ShippingInfo): boolean {
  return Object.values(s).every((value) => value.trim().length > 0);
}

export function openWhatsApp(text: string): void {
  window.open(
    `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
}

export type CheckoutMethod = "cod" | "whatsapp";

export interface WhatsOrderItem {
  name: string;
  size: string;
  quantity: number;
  price: string;
}

export function buildOrderWhatsAppMessage(params: {
  orderId: string;
  total: number;
  shipping: ShippingInfo;
  items: WhatsOrderItem[];
  intro?: string;
}): string {
  const { orderId, total, shipping, items, intro } = params;
  const sections: string[] = [];

  if (intro) sections.push(intro, "");

  sections.push(
    `Order ID: ${orderId}`,
    "",
    ...items.map(
      (item) => `• ${item.name} (Size: ${item.size}) x${item.quantity} — ${item.price}`
    ),
    "",
    `Total: Rs. ${total.toLocaleString()}`,
    "",
    `Name: ${shipping.name}`,
    `Email: ${shipping.email}`,
    `Phone: ${shipping.phone}`,
    `Address: ${shipping.address}, ${shipping.city} ${shipping.postalCode}`
  );

  return sections.join("\n");
}
