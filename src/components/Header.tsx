import Link from "next/link";
import { ShoppingCart, Search, User, Heart, Menu, LogOut, X } from "lucide-react";
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
        <header className="sticky top-0 z-50 bg-background border-b border-border">

            {/* Barre livraison */}
            <div className="bg-noir text-creme py-2">
                <p className="text-center text-xs font-light tracking-widest uppercase">
                    Livraison offerte dès 60€ d'achat
                </p>
            </div>

            {/* Zone logo + icônes */}
            <div className="container-luxury py-6">
                <div className="flex items-center justify-between">

                    {/* Gauche — Recherche (desktop) + Menu (mobile) */}
                    <div className="flex items-center gap-4 w-1/4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 hover-gold transition-luxury"
                            aria-label="Menu"
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="hidden lg:block p-2 hover-gold transition-luxury"
                            aria-label="Recherche"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Centre — Logo */}
                    <div className="flex justify-center w-2/4">
                        <Link href="/" className="transition-luxury hover:opacity-75">
                            <img
                                src="/logo.svg"
                                alt="LE COIN 1 BEAUT"
                                className="h-20 w-auto"
                                style={{ filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.25))" }}
                            />
                        </Link>
                    </div>

                    {/* Droite — Icônes */}
                    <div className="flex items-center justify-end gap-4 w-1/4">

                        {/* Recherche mobile */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="lg:hidden p-2 hover-gold transition-luxury"
                            aria-label="Recherche"
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        {/* Compte */}
                        <Link
                            href={user ? "/compte" : "/connexion"}
                            className="hidden sm:block p-2 hover-gold transition-luxury"
                            aria-label="Mon compte"
                        >
                            <User className="h-5 w-5" />
                        </Link>

                        {/* Favoris */}
                        <Link
                            href={user ? "/favoris" : "/connexion?redirect=/favoris"}
                            className="hidden sm:block p-2 hover-gold transition-luxury"
                            aria-label="Mes favoris"
                        >
                            <Heart className="h-5 w-5" />
                        </Link>

                        {/* Panier */}
                        <Link
                            href={user ? "/panier" : "/connexion?redirect=/panier"}
                            className="relative p-2 hover-gold transition-luxury"
                            aria-label="Mon panier"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-gold text-noir text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Déconnexion */}
                        {user && (
                            <button
                                onClick={signOut}
                                className="hidden sm:block p-2 hover-gold transition-luxury"
                                aria-label="Déconnexion"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Barre de recherche dépliable */}
                {isSearchOpen && (
                    <div className="mt-4 animate-slide-up">
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Rechercher un produit, une marque..."
                                className="pl-10 pr-4 py-5 text-sm"
                                autoFocus
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation desktop — centrée sous le logo */}
            <nav className="hidden lg:block border-t border-border">
                <div className="container-luxury py-4">
                    <ul className="flex items-center justify-center gap-10">
                        <li>
                            <Link href="/parfums" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury">
                                Parfums
                            </Link>
                        </li>
                        <li>
                            <Link href="/parfums-interieur" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury">
                                Intérieur
                            </Link>
                        </li>
                        <li>
                            <Link href="/soins" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury">
                                Soins
                            </Link>
                        </li>
                        <li>
                            <Link href="/nouveautes" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury">
                                Nouveautés
                            </Link>
                        </li>
                        <li>
                            <Link href="/offres" className="text-xs font-medium tracking-widest uppercase text-gold hover:text-accent transition-luxury">
                                Offres
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Bandeau réassurance */}
            <div className="hidden lg:block bg-perle border-t border-border">
                <div className="container-luxury py-3">
                    <div className="grid grid-cols-3 divide-x divide-border text-center">
                        <div className="px-4">
                            <p className="text-xs font-semibold tracking-widest uppercase text-foreground">Livraison Rapide</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Recevez votre commande en 2-3 jours</p>
                        </div>
                        <div className="px-4">
                            <p className="text-xs font-semibold tracking-widest uppercase text-foreground">Retours Faciles</p>
                            <p className="text-xs text-muted-foreground mt-0.5">15 jours pour retourner votre produit</p>
                        </div>
                        <div className="px-4">
                            <p className="text-xs font-semibold tracking-widest uppercase text-foreground">Boutique à Franconville</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Venez nous rendre visite</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            {isMobileMenuOpen && (
                <nav className="lg:hidden border-t border-border animate-slide-up">
                    <div className="container-luxury py-4 flex flex-col gap-3">
                        <Link href="/parfums" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury py-2">
                            Parfums
                        </Link>
                        <Link href="/parfums-interieur" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury py-2">
                            Intérieur
                        </Link>
                        <Link href="/soins" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury py-2">
                            Soins
                        </Link>
                        <Link href="/nouveautes" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury py-2">
                            Nouveautés
                        </Link>
                        <Link href="/offres" className="text-xs font-medium tracking-widest uppercase text-gold hover:text-accent transition-luxury py-2">
                            Offres
                        </Link>
                        <div className="border-t border-border pt-3 mt-1 flex flex-col gap-3">
                            {user ? (
                                <>
                                    <Link href="/compte" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury py-2">
                                        Mon Compte
                                    </Link>
                                    <Link href="/favoris" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury py-2">
                                        Mes Favoris
                                    </Link>
                                    <button onClick={signOut} className="text-left text-xs font-medium tracking-widest uppercase hover-gold transition-luxury py-2">
                                        Déconnexion
                                    </button>
                                </>
                            ) : (
                                <Link href="/connexion" className="text-xs font-medium tracking-widest uppercase hover-gold transition-luxury py-2">
                                    Se connecter
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            )}

        </header>
    );
}