import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function MentionsLegalesPage() {
  return (
    <>
      <SEO
        title="Mentions Légales - LE COIN 1 BEAUT"
        description="Informations légales et éditeur du site"
        url="/mentions-legales"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container-luxury py-12">
          <article className="max-w-4xl mx-auto prose prose-lg">
            <h1 className="font-serif text-4xl mb-8">Mentions Légales</h1>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">1. Informations légales</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Le site www.lecoin1beaut.fr est édité par :
              </p>
              <ul className="list-none space-y-2 text-foreground/80">
                <li><strong>Raison sociale :</strong> LE COIN 1 BEAUT</li>
                <li><strong>Forme juridique :</strong> [À compléter]</li>
                <li><strong>Capital social :</strong> [À compléter]</li>
                <li><strong>Siège social :</strong> [Adresse à compléter]</li>
                <li><strong>RCS :</strong> [À compléter]</li>
                <li><strong>N° SIRET :</strong> [À compléter]</li>
                <li><strong>N° TVA intracommunautaire :</strong> [À compléter]</li>
                <li><strong>Email :</strong> contact@lecoin1beaut.fr</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">2. Directeur de la publication</h2>
              <p className="text-foreground/80 leading-relaxed">
                Le directeur de la publication du site est : [Nom à compléter]
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">3. Hébergement</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Le site est hébergé par :
              </p>
              <ul className="list-none space-y-2 text-foreground/80">
                <li><strong>Hébergeur :</strong> Vercel Inc.</li>
                <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
                <li><strong>Site web :</strong> www.vercel.com</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">4. Propriété intellectuelle</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est
                la propriété exclusive de LE COIN 1 BEAUT ou de ses partenaires.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Toute reproduction, représentation, modification, publication, adaptation de tout
                ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
                interdite sans autorisation écrite préalable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">5. Données personnelles</h2>
              <p className="text-foreground/80 leading-relaxed">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de
                suppression et d'opposition aux données personnelles vous concernant.
              </p>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Pour plus d'informations, consultez notre{" "}
                <a href="/politique-confidentialite" className="text-gold hover:underline">
                  Politique de Confidentialité
                </a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">6. Cookies</h2>
              <p className="text-foreground/80 leading-relaxed">
                Le site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des
                statistiques de visites. En naviguant sur le site, vous acceptez l'utilisation de
                ces cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">7. Crédits</h2>
              <ul className="list-none space-y-2 text-foreground/80">
                <li><strong>Conception & développement :</strong> Softgen AI</li>
                <li><strong>Photographies :</strong> Fournisseurs partenaires & Unsplash</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">8. Contact</h2>
              <p className="text-foreground/80 leading-relaxed">
                Pour toute question concernant les mentions légales ou le fonctionnement du site,
                vous pouvez nous contacter à l'adresse : contact@lecoin1beaut.fr
              </p>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}