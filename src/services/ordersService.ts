import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
type OrderItemInsert = Database["public"]["Tables"]["order_items"]["Insert"];

export interface OrderWithDetails extends Order {
  items?: Array<OrderItem & {
    product?: {
      name: string;
      image_url: string | null;
    };
  }>;
  shipping_address?: {
    full_address: string;
    city: string;
    postal_code: string;
    country: string;
  };
}

// Créer une commande
export async function createOrder(
  userId: string,
  orderData: {
    items: Array<{
      productId: string;
      variantId?: string;
      quantity: number;
      price: number;
    }>;
    shippingAddressId: string;
    billingAddressId: string;
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
  }
): Promise<Order> {
  // Créer la commande
  const newOrder: OrderInsert = {
    user_id: userId,
    order_number: `CMD${Date.now()}`,
    status: "pending",
    shipping_address_id: orderData.shippingAddressId,
    billing_address_id: orderData.billingAddressId,
    subtotal: orderData.subtotal,
    shipping_cost: orderData.shippingCost,
    tax: orderData.tax,
    total: orderData.total,
  };

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert(newOrder)
    .select()
    .single();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }

  // Créer les items de la commande
  const orderItems: OrderItemInsert[] = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.productId,
    variant_id: item.variantId || null,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    throw itemsError;
  }

  return order;
}

// Récupérer les commandes d'un utilisateur
export async function getUserOrders(userId: string): Promise<OrderWithDetails[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(
        *,
        product:products(name, image_url)
      ),
      shipping_address:addresses!orders_shipping_address_id_fkey(
        full_address,
        city,
        postal_code,
        country
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }

  return (data || []) as OrderWithDetails[];
}

// Récupérer une commande par ID
export async function getOrderById(orderId: string, userId: string): Promise<OrderWithDetails | null> {
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(
        *,
        product:products(name, image_url)
      ),
      shipping_address:addresses!orders_shipping_address_id_fkey(
        full_address,
        city,
        postal_code,
        country
      )
    `)
    .eq("id", orderId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return null;
  }

  return data as OrderWithDetails;
}

// Mettre à jour le statut d'une commande
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}