import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

export interface ProductWithDetails extends Product {
  category?: Category;
  variants?: ProductVariant[];
}

// Récupérer tous les produits avec catégories et variantes
export async function getProducts(filters?: {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}): Promise<ProductWithDetails[]> {
  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*)
    `)
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (filters?.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }

  if (filters?.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }

  if (filters?.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }

  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return (data || []) as ProductWithDetails[];
}

// Récupérer un produit par slug
export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      variants:product_variants(*)
    `)
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as ProductWithDetails;
}

// Récupérer toutes les catégories
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data || [];
}

// Récupérer une catégorie par slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data;
}

// Récupérer les produits d'une catégorie
export async function getProductsByCategory(categorySlug: string): Promise<ProductWithDetails[]> {
  const category = await getCategoryBySlug(categorySlug);
  
  if (!category) {
    return [];
  }

  return getProducts({ categoryId: category.id });
}

// Rechercher des produits
export async function searchProducts(query: string): Promise<ProductWithDetails[]> {
  return getProducts({ search: query });
}