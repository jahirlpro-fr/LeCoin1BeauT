import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getProductsByCategory, getCategories, type ProductWithDetails } from "@/services/productsService";
import type { Database } from "@/integrations/supabase/types";
import { SlidersHorizontal, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { addToCart } from "@/services/cartService";
import { useToast } from "@/hooks/use-toast";

type Category = Database["public"]["Tables"]["categories"]["Row"];

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filtres
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("pertinence");
const [inStockOnly, setInStockOnly] = useState(false);
  const { user, requireAuth } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (category && typeof category === "string") {
      loadProducts(category);
    }
  }, [category]);

  const loadProducts = async (slug: string) => {
    setLoading(true);
    try {
      const data = await getProductsByCategory(slug);
      setProducts(data);
      
      // Récupérer infos catégorie
      const categories = await getCategories();
      const cat = categories.find(c => c.slug === slug);
      setCurrentCategory(cat || null);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))) as string[];

  const filteredProducts = products.filter(product => {
    if (inStockOnly && (!product.stock_quantity || product.stock_quantity <= 0)) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand || "")) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <>
      <SEO
        title={`${currentCategory?.name || "Catégorie"} - LE COIN 1 BEAUT`}
        description={currentCategory?.description || "Découvrez notre sélection de produits de beauté"}
        url={`/${category}`}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Header Catégorie */}
          <section className="bg-gradient-hero py-16">
            <div className="container-luxury">
              <h1 className="font-serif text-4xl md:text-5xl mb-4">
                {currentCategory?.name || "Nos Produits"}
              </h1>
              {currentCategory?.description && (
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {currentCategory.description}
                </p>
              )}
            </div>
          </section>

          {/* Filtres & Produits */}
          <section className="container-luxury py-12">
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? "s" : ""}
              </p>
              
              <div className="flex gap-4 items-center">
                {/* Tri */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-border rounded-md bg-background text-sm"
                >
                  <option value="pertinence">Pertinence</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="name">Nom A-Z</option>
                </select>

                {/* Toggle Filtres Mobile */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="lg:hidden gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filtres */}
              <aside className={`lg:block ${filtersOpen ? "block" : "hidden"} lg:col-span-1`}>
                <div className="sticky top-24 bg-card p-6 rounded-lg border border-border">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-xl">Filtres</h3>
                    <button onClick={() => setFiltersOpen(false)} className="lg:hidden">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Prix */}
                  <div className="mb-8">
                    <Label className="text-sm font-medium mb-4 block">Prix</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={500}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]} €</span>
                      <span>{priceRange[1]} €</span>
                    </div>
                  </div>

                  {/* Disponibilité */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="stock"
                        checked={inStockOnly}
                        onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                      />
                      <Label htmlFor="stock" className="text-sm cursor-pointer">
                        En stock uniquement
                      </Label>
                    </div>
                  </div>

                  {/* Marques */}
                  {brands.length > 0 && (
                    <div className="mb-8">
                      <Label className="text-sm font-medium mb-4 block">Marques</Label>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {brands.map(brand => (
                          <div key={brand} className="flex items-center gap-2">
                            <Checkbox
                              id={brand}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={(checked) => {
                                setSelectedBrands(prev =>
                                  checked
                                    ? [...prev, brand]
                                    : prev.filter(b => b !== brand)
                                );
                              }}
                            />
                            <Label htmlFor={brand} className="text-sm cursor-pointer">
                              {brand}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPriceRange([0, 500]);
                      setSelectedBrands([]);
                      setInStockOnly(false);
                    }}
                  >
                    Réinitialiser
                  </Button>
                </div>
              </aside>

              {/* Grille Produits */}
              <div className="lg:col-span-3">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-card rounded-lg h-96 animate-pulse" />
                    ))}
                  </div>
                ) : sortedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => {
                          if (!requireAuth()) return;
                          addToCart(user!.id, product.id, 1).then(() => {
                            toast({ title: "Produit ajouté", description: `${product.name} ajouté au panier` });
                          }).catch(() => {
                            toast({ title: "Erreur", description: "Impossible d'ajouter au panier", variant: "destructive" });
                          });
                        }}
                        onToggleWishlist={() => {
                          if (!requireAuth()) return;
                          toast({ title: "Favoris", description: "Fonctionnalité bientôt disponible" });
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground">Aucun produit ne correspond à vos critères</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}