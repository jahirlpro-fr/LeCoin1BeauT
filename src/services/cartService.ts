import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];
type CartItemInsert = Database["public"]["Tables"]["cart_items"]["Insert"];

export interface CartItemWithDetails extends CartItem {
  product?: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image_url: string | null;
  };
  variant?: {
    id: string;
    name: string;
    price_adjustment: number;
  };
}

// Récupérer le panier de l'utilisateur
export async function getCart(userId: string): Promise<CartItemWithDetails[]> {
  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(id, name, slug, price, image_url),
      variant:product_variants(id, name, price_adjustment)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }

  return (data || []) as CartItemWithDetails[];
}

// Ajouter un produit au panier
export async function addToCart(
  userId: string,
  productId: string,
  quantity: number,
  variantId?: string
): Promise<CartItem> {
  // Vérifier si le produit existe déjà dans le panier
  const { data: existing } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .eq("variant_id", variantId || null)
    .single();

  if (existing) {
    // Mettre à jour la quantité
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + quantity })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }

    return data;
  } else {
    // Créer un nouvel item
    const newItem: CartItemInsert = {
      user_id: userId,
      product_id: productId,
      variant_id: variantId || null,
      quantity,
    };

    const { data, error } = await supabase
      .from("cart_items")
      .insert(newItem)
      .select()
      .single();

    if (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }

    return data;
  }
}

// Mettre à jour la quantité d'un item
export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<void> {
  if (quantity <= 0) {
    await removeFromCart(itemId);
    return;
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", itemId);

  if (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
}

// Retirer un produit du panier
export async function removeFromCart(itemId: string): Promise<void> {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", itemId);

  if (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
}

// Vider le panier
export async function clearCart(userId: string): Promise<void> {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}

// Calculer le total du panier
export function calculateCartTotal(items: CartItemWithDetails[]): number {
  return items.reduce((total, item) => {
    const basePrice = item.product?.price || 0;
    const variantAdjustment = item.variant?.price_adjustment || 0;
    const itemPrice = basePrice + variantAdjustment;
    return total + (itemPrice * item.quantity);
  }, 0);
}