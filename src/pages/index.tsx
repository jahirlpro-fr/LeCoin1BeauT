import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/productsService";

export default function HomePage() {
    const [categoryImages, setCategoryImages] = useState < Record < string, string>> ({});

    useEffect(() => {
        async function loadCategoryImages() {
            try {
                const products = await getProducts();
                const images: Record<string, string> = {};
                products.forEach(p => {
                    if (p.category?.slug && p.images && p.images.length > 0 && !images[p.category.slug]) {
                        images[p.category.slug] = p.images[0];
                    }
                });
                setCategoryImages(images);
            } catch (e) {
                console.error(e);
            }
        }
        loadCategoryImages();
    }, []);
  return (
    <>
      <SEO
        title="LE COIN 1 BEAUT - Parfums & Cosmétiques de Luxe"
        description="Découvrez notre sélection de parfums d'exception et produits de beauté raffinés. Livraison offerte dès 60€."
        url="/"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          
          {/* Featured Categories - Coming soon */}
          <section className="container-luxury py-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl mb-4">
                Nos Univers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explorez nos collections de produits de beauté soigneusement sélectionnés
              </p>
            </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <Link href="/parfums" className="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-luxury cursor-pointer">
                              {categoryImages["parfums"] && (
                                  <img src={categoryImages["parfums"]} alt="Parfums" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-noir/80" />
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-creme">
                                  <h3 className="font-serif text-2xl mb-2 group-hover:text-gold transition-luxury">Parfums</h3>
                                  <p className="text-sm text-creme/80">Fragrances d'exception</p>
                              </div>
                          </Link>

                          <Link href="/parfums-interieur" className="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-luxury cursor-pointer">
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-noir/80" />
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-creme">
                                  <h3 className="font-serif text-2xl mb-2 group-hover:text-gold transition-luxury">Parfums d'intérieur</h3>
                                  <p className="text-sm text-creme/80">Sublimez votre intérieur</p>
                              </div>
                          </Link>

                          <Link href="/soins" className="group relative aspect-[4/5] rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-luxury cursor-pointer">
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-noir/80" />
                              <div className="absolute bottom-0 left-0 right-0 p-6 text-creme">
                                  <h3 className="font-serif text-2xl mb-2 group-hover:text-gold transition-luxury">Soins</h3>
                                  <p className="text-sm text-creme/80">Prenez soin de vous</p>
                              </div>
                          </Link>
                      </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}