import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function FavorisPage() {
  const { user } = useAuth();

  return (
    <>
      <SEO
        title="Mes Favoris - LE COIN 1 BEAUT"
        description="Vos produits favoris"
        url="/favoris"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container-luxury py-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-8">Mes Favoris</h1>

          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="font-serif text-2xl mb-4">Votre liste de favoris est vide</h2>
            <p className="text-muted-foreground mb-8">
              Parcourez nos produits et ajoutez vos coups de cœur en cliquant sur le ♡
            </p>
            <Button asChild size="lg" className="bg-noir hover:bg-noir/90 text-creme">
              <Link href="/parfums">Découvrir nos parfums</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}