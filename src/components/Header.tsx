import Link from "next/link";
import { ShoppingCart, Search, User, Heart, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";

export function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      {/* Top Banner */}
      <div className="bg-noir text-creme py-2">
        <div className="container-luxury">
          <p className="text-center text-sm font-light tracking-wide">
            Livraison offerte dès 60€ d'achat ✨
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-luxury py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover-gold"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transition-luxury hover:opacity-80">
            <img src="/logo.svg" alt="LE COIN 1 BEAUT" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <Link href="/parfums" className="text-sm font-medium hover-gold transition-luxury">
              Parfums
            </Link>
<Link href="/parfums-interieur" className="text-sm font-medium hover-gold transition-luxury">
  Intérieur
</Link>
            <Link href="/soins" className="text-sm font-medium hover-gold transition-luxury">
              Soins
            </Link>
            <Link href="/nouveautes" className="text-sm font-medium hover-gold transition-luxury">
              Nouveautés
            </Link>
            <Link href="/offres" className="text-sm font-medium text-gold hover:text-accent transition-luxury">
              Offres
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover-gold transition-luxury"
              aria-label="Recherche"
            >
              <Search className="h-5 w-5" />
            </button>

                      {/* Account */}
                      {user ? (
                          <Link href="/compte" className="hidden sm:block p-2 hover-gold transition-luxury">
                              <User className="h-5 w-5" />
                          </Link>
                      ) : (
                          <Link href="/connexion" className="hidden sm:block p-2 hover-gold transition-luxury">
                              <User className="h-5 w-5" />
                          </Link>
                      )}

                      {/* Wishlist */}
                      <Link href={user ? "/favoris" : "/connexion?redirect=/favoris"} className="hidden sm:block p-2 hover-gold transition-luxury">
                          <Heart className="h-5 w-5" />
                      </Link>

                      {/* Cart */}
                      <Link href={user ? "/panier" : "/connexion?redirect=/panier"} className="relative p-2 hover-gold transition-luxury">
                          <ShoppingCart className="h-5 w-5" />
                          {cartCount > 0 && (
                              <span className="absolute -top-1 -right-1 bg-gold text-noir text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                  {cartCount}
                              </span>
                          )}
                      </Link>

                      {/* Déconnexion */}
                      {user && (
                          <button onClick={signOut} className="hidden sm:block p-2 hover-gold transition-luxury" title="Déconnexion">
                              <LogOut className="h-5 w-5" />
                          </button>
                      )}
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 animate-slide-up">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un produit, une marque..."
                className="pl-10 pr-4 py-6 text-base"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-3">
              <Link href="/parfums" className="text-sm font-medium hover-gold transition-luxury py-2">
                Parfums
              </Link>
                          <Link href="/parfums-interieur" className="text-sm font-medium hover-gold transition-luxury py-2">
                              Intérieur
                          </Link>
              <Link href="/soins" className="text-sm font-medium hover-gold transition-luxury py-2">
                Soins
              </Link>
              <Link href="/nouveautes" className="text-sm font-medium hover-gold transition-luxury py-2">
                Nouveautés
              </Link>
              <Link href="/offres" className="text-sm font-medium text-gold hover:text-accent transition-luxury py-2">
                Offres
              </Link>
<div className="border-t border-border pt-3 mt-2">
                {user ? (
                  <>
                    <Link href="/compte" className="flex items-center gap-2 text-sm font-medium hover-gold transition-luxury py-2">
                      <User className="h-4 w-4" />
                      Mon Compte
                    </Link>
                    <Link href="/favoris" className="flex items-center gap-2 text-sm font-medium hover-gold transition-luxury py-2">
                      <Heart className="h-4 w-4" />
                      Mes Favoris
                    </Link>
                    <button onClick={signOut} className="flex items-center gap-2 text-sm font-medium hover-gold transition-luxury py-2 w-full">
                      <LogOut className="h-4 w-4" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link href="/connexion" className="flex items-center gap-2 text-sm font-medium hover-gold transition-luxury py-2">
                    <User className="h-4 w-4" />
                    Se connecter
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}