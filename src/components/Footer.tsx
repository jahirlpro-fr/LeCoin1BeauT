import Link from "next/link";
import { Instagram, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-noir text-creme mt-24">
      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <img src="/logo.svg" alt="LE COIN 1 BEAUT" className="h-20 w-auto mb-6 invert" />
            <p className="text-sm text-creme/80 leading-relaxed mb-6">
              Votre destination beauté pour des produits de luxe et des parfums d'exception.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/lecoin1beaut/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-luxury"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-gold transition-luxury"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@lecoin1beaut.fr"
                className="hover:text-gold transition-luxury"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-serif text-lg mb-6">Boutique</h3>
            <ul className="space-y-3 text-sm text-creme/80">
              <li>
                <Link href="/parfums" className="hover:text-gold transition-luxury">
                  Parfums
                </Link>
              </li>
              <li>
                <Link href="/maquillage" className="hover:text-gold transition-luxury">
                  Maquillage
                </Link>
              </li>
              <li>
                <Link href="/soins" className="hover:text-gold transition-luxury">
                  Soins
                </Link>
              </li>
              <li>
                <Link href="/nouveautes" className="hover:text-gold transition-luxury">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link href="/offres" className="hover:text-gold transition-luxury">
                  Offres Spéciales
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg mb-6">Service Client</h3>
            <ul className="space-y-3 text-sm text-creme/80">
              <li>
                <Link href="/compte" className="hover:text-gold transition-luxury">
                  Mon Compte
                </Link>
              </li>
              <li>
                <Link href="/suivi-commande" className="hover:text-gold transition-luxury">
                  Suivre ma Commande
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="hover:text-gold transition-luxury">
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-luxury">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-luxury">
                  Nous Contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-lg mb-6">Informations</h3>
            <ul className="space-y-3 text-sm text-creme/80">
              <li>
                <Link href="/a-propos" className="hover:text-gold transition-luxury">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="hover:text-gold transition-luxury">
                  Conditions Générales
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="hover:text-gold transition-luxury">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-gold transition-luxury">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-gold transition-luxury">
                  Gestion des Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-creme/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-creme/60">
            <p>© 2026 LE COIN 1 BEAUT. Tous droits réservés.</p>
            <p>Conçu avec passion pour la beauté</p>
          </div>
        </div>
      </div>
    </footer>
  );
}