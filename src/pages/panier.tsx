import { useState, useEffect } from "react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getCart, updateCartItemQuantity, removeFromCart, calculateCartTotal, type CartItemWithDetails } from "@/services/cartService";
import { Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function CartPage() {
    const { toast } = useToast();
    const { user, loading: authLoading } = useAuth();
    const [cartItems, setCartItems] = useState < CartItemWithDetails[] > ([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push("/connexion?redirect=/panier");
            return;
        }
        loadCart();
    }, [user, authLoading]);

    const loadCart = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const items = await getCart(user.id);
            setCartItems(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateCartItemQuantity(itemId, newQuantity);
      await loadCart();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la quantité",
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      await loadCart();
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré du panier",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de retirer le produit",
        variant: "destructive",
      });
    }
  };

  const subtotal = calculateCartTotal(cartItems);
  const shippingCost = subtotal >= 60 ? 0 : 4.90;
  const total = subtotal + shippingCost;

  return (
    <>
      <SEO
        title="Mon Panier - LE COIN 1 BEAUT"
        description="Votre panier de produits de beauté"
        url="/panier"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container-luxury py-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-8">Mon Panier</h1>

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-serif text-2xl mb-4">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-8">
                Découvrez nos produits et ajoutez-les à votre panier
              </p>
              <Button asChild size="lg" className="bg-noir hover:bg-noir/90 text-creme">
                <Link href="/">Découvrir nos produits</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Articles */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map(item => {
                  const basePrice = item.product?.price || 0;
                  const variantAdjustment = item.variant?.price_adjustment || 0;
                  const itemPrice = basePrice + variantAdjustment;

                  return (
                      <div key={item.id} className="bg-card rounded-lg p-6 flex gap-6 relative">
                          {/* Image */}
                          <Link href={`/produits/${item.product?.slug}`} className="flex-shrink-0">
                              <div className="w-24 h-24 rounded-md bg-perle overflow-hidden">
                                  {item.product?.images && item.product.images.length > 0 ? (
                                      <img
                                          src={item.product.images[0]}
                                          alt={item.product.name}
                                          className="w-full h-full object-cover"
                                      />
                                  ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                                      </div>
                                  )}
                              </div>
                          </Link>

                          {/* Infos */}
                          <div className="flex-1">
                              <Link href={`/produits/${item.product?.slug}`}>
                                  <h3 className="font-medium mb-1 hover-gold transition-luxury">
                                      {item.product?.brand ? `${item.product.brand} - ${item.product.name}` : item.product?.name}
                                  </h3>
                              </Link>
                              {item.variant && (
                                  <p className="text-sm text-muted-foreground mb-2">
                                      {item.variant.name}
                                  </p>
                              )}

                              {/* Quantité */}
                              <div className="flex items-center gap-3 mt-4">
                                  <button
                                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                      className="w-8 h-8 border border-border rounded-md hover:border-gold transition-luxury"
                                  >
                                      −
                                  </button>
                                  <span className="text-sm font-medium w-8 text-center">
                                      {item.quantity}
                                  </span>
                                  <button
                                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                      className="w-8 h-8 border border-border rounded-md hover:border-gold transition-luxury"
                                  >
                                      +
                                  </button>
                              </div>
                          </div>

                          {/* Prix */}
                          <div className="text-right pb-8">
                              <p className="font-medium text-lg">
                                  {(itemPrice * item.quantity).toFixed(2)} €
                              </p>
                              <p className="text-sm text-muted-foreground">
                                  {itemPrice.toFixed(2)} € l'unité
                              </p>
                          </div>

                          {/* Supprimer */}
                          <button
                              onClick={() => handleRemove(item.id)}
                              className="absolute bottom-4 right-4 p-2 text-red-500 hover:text-red-700 transition-luxury"
                              aria-label="Supprimer"
                          >
                              <Trash2 className="h-5 w-5" />
                          </button>
                      </div>
                  );
                })}
              </div>

              {/* Récapitulatif */}
              <div>
                <div className="bg-card rounded-lg p-6 sticky top-24">
                  <h2 className="font-serif text-2xl mb-6">Récapitulatif</h2>
                  
                  <div className="space-y-3 pb-4 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className={shippingCost === 0 ? "text-gold" : ""}>
                        {shippingCost === 0 ? "Offerte" : `${shippingCost.toFixed(2)} €`}
                      </span>
                    </div>
                  </div>

                  {subtotal < 60 && (
                    <p className="text-sm text-muted-foreground mt-4">
                      Plus que <span className="font-medium text-gold">{(60 - subtotal).toFixed(2)} €</span> pour la livraison offerte
                    </p>
                  )}

                  <div className="flex justify-between text-lg font-medium mt-6 mb-6">
                    <span>Total</span>
                    <span className="text-gold">{total.toFixed(2)} €</span>
                  </div>

                  <Button asChild size="lg" className="w-full bg-noir hover:bg-noir/90 text-creme mb-3">
                    <Link href="/checkout">Commander</Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg" className="w-full">
                    <Link href="/">Continuer mes achats</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}