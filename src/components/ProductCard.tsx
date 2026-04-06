import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  isInWishlist?: boolean;
}

export function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist }: ProductCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const hasDiscount = product.discount_percentage && product.discount_percentage > 0;
    const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount_percentage! / 100)
    : product.price;

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-luxury">
      {/* Image Container */}
          <div className="block relative aspect-[3/4] overflow-hidden bg-perle">
              {product.images && product.images.length > 0 ? (
                  <Link href={`/produits/${product.slug}`}>
                      <img
                          src={product.images[currentImageIndex]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-luxury"
                      />
                  </Link>
              ) : (
                  <Link href={`/produits/${product.slug}`}>
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingCart className="h-16 w-16" />
                      </div>
                  </Link>
              )}

              {/* Navigation images */}
              {product.images && product.images.length > 1 && (
                  <>
                      <button
                          onClick={(e) => {
                              e.preventDefault();
                              setCurrentImageIndex((prev) => (prev === 0 ? product.images!.length - 1 : prev - 1));
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-luxury opacity-0 group-hover:opacity-100"
                      >
                          ‹
                      </button>
                      <button
                          onClick={(e) => {
                              e.preventDefault();
                              setCurrentImageIndex((prev) => (prev === product.images!.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-luxury opacity-0 group-hover:opacity-100"
                      >
                          ›
                      </button>
                  </>
              )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_new && (
            <Badge className="bg-gold text-noir hover:bg-gold/90">
              Nouveauté
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive">
              -{product.discount_percentage}%
            </Badge>
          )}
          {!product.stock_quantity && (
            <Badge variant="secondary">
              Rupture
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist?.();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur hover:bg-background transition-luxury"
          aria-label="Ajouter aux favoris"
        >
          <Heart
            className={`h-5 w-5 transition-luxury ${
              isInWishlist ? "fill-gold text-gold" : "text-foreground"
            }`}
          />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.brand}
          </p>
        )}

        {/* Name */}
        <Link href={`/produits/${product.slug}`}>
          <h3 className="font-serif text-lg mb-2 line-clamp-2 hover-gold transition-luxury">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.short_description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-2 mt-4">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {product.price.toFixed(2)} €
              </span>
            )}
            <span className={`font-medium ${hasDiscount ? "text-gold text-lg" : "text-foreground"}`}>
              {discountedPrice.toFixed(2)} €
            </span>
          </div>

          {product.stock_quantity && product.stock_quantity > 0 ? (
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart?.();
              }}
              className="bg-noir hover:bg-noir/90 text-creme gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Ajouter
            </Button>
          ) : (
            <Button size="sm" variant="secondary" disabled>
              Rupture
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}