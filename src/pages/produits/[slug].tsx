import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductBySlug, type ProductWithDetails } from "@/services/productsService";
import { addToCart } from "@/services/cartService";
import { Heart, ShoppingCart, Check, Truck, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
    const { toast } = useToast();
    const { user, requireAuth } = useAuth();
    const { refreshCart } = useCart();
  
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);
    

  useEffect(() => {
    if (slug && typeof slug === "string") {
      loadProduct(slug);
    }
  }, [slug]);

  const loadProduct = async (productSlug: string) => {
    setLoading(true);
    try {
      const data = await getProductBySlug(productSlug);
      setProduct(data);
      if (data?.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0].id);
      }
    } catch (error) {
      console.error("Error loading product:", error);
    } finally {
      setLoading(false);
    }
  };

    const handleAddToCart = async () => {
        if (!product) return;
        if (!requireAuth()) return;

        try {
            await addToCart(user!.id, product.id, quantity, selectedVariant || undefined);
            await refreshCart();
            toast({
                title: "Produit ajouté au panier",
                description: `${product.name} (x${quantity})`,
            });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container-luxury py-16">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="aspect-square bg-card rounded-lg" />
              <div className="space-y-4">
                <div className="h-8 bg-card rounded w-3/4" />
                <div className="h-4 bg-card rounded w-1/2" />
                <div className="h-24 bg-card rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="container-luxury py-16 text-center">
          <h1 className="font-serif text-3xl mb-4">Produit introuvable</h1>
          <Button asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const hasDiscount = product.discount_percentage && product.discount_percentage > 0;
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discount_percentage! / 100)
    : product.price;

  const currentVariant = product.variants?.find(v => v.id === selectedVariant);
  const finalPrice = discountedPrice + (currentVariant?.price_adjustment || 0);

  return (
    <>
      <SEO
        title={`${product.name} - LE COIN 1 BEAUT`}
        description={product.short_description || product.description || ""}
              image={product.images?.[0] || undefined}
        url={`/produits/${product.slug}`}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="container-luxury py-4 border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover-gold">Accueil</Link>
              <span>/</span>
              {product.category && (
                <>
                  <Link href={`/${product.category.slug}`} className="hover-gold">
                    {product.category.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>

          {/* Produit */}
          <section className="container-luxury py-12">
            <div className="grid md:grid-cols-2 gap-12">
{/* Image */}
              <div className="relative">
                <div className="flex gap-4 sticky top-24">
                  {/* Miniatures */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex flex-col gap-2">
                      {product.images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-luxury ${
                            selectedImage === index ? "border-gold" : "border-transparent hover:border-border"
                          }`}
                        >
                          <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Image principale */}
                  <div className="flex-1 aspect-square rounded-lg overflow-hidden bg-perle relative">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="h-24 w-24 text-muted-foreground" />
                      </div>
                    )}

                    {/* Flèches navigation */}
                    {product.images && product.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images!.length - 1 : prev - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-luxury"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setSelectedImage((prev) => (prev === product.images!.length - 1 ? 0 : prev + 1))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-luxury"
                        >
                          ›
                        </button>
                      </>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.is_new && (
                        <Badge className="bg-gold text-noir">Nouveauté</Badge>
                      )}
                      {hasDiscount && (
                        <Badge variant="destructive">-{product.discount_percentage}%</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Infos */}
              <div>
                {/* Marque */}
                {product.brand && (
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    {product.brand}
                  </p>
                )}

                {/* Nom */}
                <h1 className="font-serif text-4xl md:text-5xl mb-4">
                  {product.name}
                </h1>

                {/* Description courte */}
                {product.short_description && (
                  <p className="text-lg text-muted-foreground mb-6">
                    {product.short_description}
                  </p>
                )}

                {/* Prix */}
                <div className="mb-8 pb-8 border-b border-border">
                  {hasDiscount && (
                    <span className="text-xl text-muted-foreground line-through mr-3">
                      {product.price.toFixed(2)} €
                    </span>
                  )}
                  <span className="text-3xl font-medium text-gold">
                    {finalPrice.toFixed(2)} €
                  </span>
                </div>

                {/* Variantes */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-8">
                    <p className="text-sm font-medium mb-3">
                      {currentVariant?.name || "Sélectionner une variante"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map(variant => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          className={`px-4 py-2 border rounded-md transition-luxury ${
                            selectedVariant === variant.id
                              ? "border-gold bg-gold/10 text-gold"
                              : "border-border hover:border-gold"
                          }`}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantité */}
                <div className="mb-8">
                  <p className="text-sm font-medium mb-3">Quantité</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-border rounded-md hover:border-gold transition-luxury"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-border rounded-md hover:border-gold transition-luxury"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-8">
                  <Button
                    size="lg"
                    className="flex-1 bg-noir hover:bg-noir/90 text-creme gap-2"
                    onClick={handleAddToCart}
                    disabled={!product.stock_quantity || product.stock_quantity <= 0}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {product.stock_quantity && product.stock_quantity > 0
                      ? "Ajouter au panier"
                      : "Rupture de stock"}
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                {/* Avantages */}
                <div className="space-y-3 bg-perle p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-gold mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Livraison offerte dès 60€</p>
                      <p className="text-sm text-muted-foreground">Ou retrait gratuit en magasin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-gold mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Paiement sécurisé</p>
                      <p className="text-sm text-muted-foreground">Transaction 100% sécurisée</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-gold mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Authenticité garantie</p>
                      <p className="text-sm text-muted-foreground">Produits 100% authentiques</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Conseils */}
            {product.description && (
              <div className="mt-16">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
                    <TabsTrigger value="description" className="rounded-none border-b-2 data-[state=active]:border-gold">
                      Description
                    </TabsTrigger>
                    <TabsTrigger value="conseils" className="rounded-none border-b-2 data-[state=active]:border-gold">
                      Conseils d'utilisation
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="pt-6">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-foreground/80 leading-relaxed">{product.description}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="conseils" className="pt-6">
                    <div className="prose prose-lg max-w-none">
                      <p className="text-foreground/80 leading-relaxed">
                        Appliquez ce produit selon les recommandations du fabricant pour des résultats optimaux.
                        Conservez à l'abri de la lumière et de la chaleur.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}