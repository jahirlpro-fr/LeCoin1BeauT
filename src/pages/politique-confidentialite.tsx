import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <SEO
        title="Politique de Confidentialité - LE COIN 1 BEAUT"
        description="Protection de vos données personnelles"
        url="/politique-confidentialite"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container-luxury py-12">
          <article className="max-w-4xl mx-auto prose prose-lg">
            <h1 className="font-serif text-4xl mb-8">Politique de Confidentialité</h1>
            
            <p className="text-muted-foreground mb-8">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">1. Introduction</h2>
              <p className="text-foreground/80 leading-relaxed">
                LE COIN 1 BEAUT accorde une grande importance à la protection de vos données
                personnelles. Cette politique de confidentialité vous informe sur la manière dont
                nous collectons, utilisons et protégeons vos informations personnelles conformément
                au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">2. Responsable du traitement</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Le responsable du traitement des données personnelles est :
              </p>
              <ul className="list-none space-y-2 text-foreground/80">
                <li><strong>LE COIN 1 BEAUT</strong></li>
                <li>Adresse : [À compléter]</li>
                <li>Email : contact@lecoin1beaut.fr</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">3. Données collectées</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Nous collectons les données suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Données d'identification : nom, prénom, adresse email</li>
                <li>Données de contact : numéro de téléphone, adresse postale</li>
                <li>Données de commande : historique d'achats, préférences produits</li>
                <li>Données de navigation : cookies, adresse IP, pages visitées</li>
                <li>Données de paiement : informations de carte bancaire (via Stripe sécurisé)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">4. Finalités du traitement</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Traiter et gérer vos commandes</li>
                <li>Vous contacter concernant vos commandes</li>
                <li>Gérer votre compte client</li>
                <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                <li>Améliorer nos services et votre expérience utilisateur</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">5. Base légale du traitement</h2>
              <p className="text-foreground/80 leading-relaxed">
                Le traitement de vos données personnelles repose sur les bases légales suivantes :
                l'exécution d'un contrat (commandes), le respect d'obligations légales, votre
                consentement (newsletter, cookies) et notre intérêt légitime (amélioration des
                services).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">6. Destinataires des données</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Vos données peuvent être transmises à :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Nos prestataires de paiement (Stripe)</li>
                <li>Nos transporteurs et partenaires logistiques</li>
                <li>Nos prestataires techniques (hébergement, email)</li>
                <li>Les autorités compétentes sur demande légale</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">7. Durée de conservation</h2>
              <p className="text-foreground/80 leading-relaxed">
                Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles
                elles sont traitées, conformément aux obligations légales applicables (minimum 3 ans
                pour les données comptables, 13 mois pour les cookies).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">8. Vos droits</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> supprimer vos données sous conditions</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Pour exercer vos droits, contactez-nous à : contact@lecoin1beaut.fr
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">9. Sécurité des données</h2>
              <p className="text-foreground/80 leading-relaxed">
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées
                pour protéger vos données personnelles contre la perte, l'utilisation abusive,
                l'accès non autorisé, la divulgation, l'altération ou la destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">10. Cookies</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Notre site utilise des cookies pour :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Assurer le bon fonctionnement du site (cookies essentiels)</li>
                <li>Mémoriser vos préférences (langue, panier)</li>
                <li>Analyser le trafic et améliorer nos services (Google Analytics)</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Vous pouvez paramétrer vos préférences cookies dans les paramètres de votre
                navigateur.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">11. Modifications</h2>
              <p className="text-foreground/80 leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout
                moment. Les modifications entrent en vigueur dès leur publication sur cette page.
                Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">12. Contact</h2>
              <p className="text-foreground/80 leading-relaxed">
                Pour toute question concernant cette politique de confidentialité ou vos données
                personnelles, contactez-nous à : contact@lecoin1beaut.fr
              </p>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Vous avez également le droit d'introduire une réclamation auprès de la CNIL
                (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr
              </p>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}