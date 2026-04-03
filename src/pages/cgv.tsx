import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CGVPage() {
  return (
    <>
      <SEO
        title="Conditions Générales de Vente - LE COIN 1 BEAUT"
        description="Consultez nos conditions générales de vente"
        url="/cgv"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container-luxury py-12">
          <article className="max-w-4xl mx-auto prose prose-lg">
            <h1 className="font-serif text-4xl mb-8">Conditions Générales de Vente</h1>
            
            <p className="text-muted-foreground mb-8">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">1. Objet</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles
                entre LE COIN 1 BEAUT (ci-après "le Vendeur") et tout client effectuant un achat sur le
                site www.lecoin1beaut.fr (ci-après "le Site").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">2. Produits</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Les produits proposés à la vente sont des produits de beauté, cosmétiques et parfums
                neufs et authentiques. Chaque produit fait l'objet d'une description détaillée sur sa
                fiche produit.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Les photographies des produits ne sont pas contractuelles et peuvent différer légèrement
                de l'article reçu en raison des conditions d'éclairage et de reproduction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">3. Prix</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Les prix sont indiqués en euros, toutes taxes comprises (TTC). Le Vendeur se réserve
                le droit de modifier ses prix à tout moment, étant entendu que le prix figurant au
                catalogue le jour de la commande sera le seul applicable à l'acheteur.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Les frais de livraison sont offerts pour toute commande supérieure à 60€. En deçà,
                des frais de 4,90€ s'appliquent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">4. Commande</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Toute commande effectuée sur le Site suppose l'adhésion sans réserve aux présentes CGV.
                Le client déclare avoir pris connaissance et accepté les présentes conditions avant
                de passer commande.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                La validation de la commande vaut acceptation des prix et descriptions des produits
                disponibles à la vente. Un email de confirmation est envoyé au client après validation
                de la commande.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">5. Paiement</h2>
              <p className="text-foreground/80 leading-relaxed">
                Le paiement s'effectue en ligne de manière sécurisée via Stripe. Les moyens de paiement
                acceptés sont : Carte Bancaire (Visa, Mastercard, American Express). Le montant total
                de la commande est débité au moment de la validation de la commande.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">6. Livraison</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Les commandes sont livrées à l'adresse indiquée par le client lors de la commande.
                Les délais de livraison sont indicatifs et peuvent varier selon la disponibilité
                des produits et le lieu de livraison.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                <li>Livraison à domicile : 2-3 jours ouvrés (gratuite dès 60€)</li>
                <li>Click & Collect : disponible sous 2h en magasin (gratuit)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">7. Droit de rétractation</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Conformément à l'article L221-18 du Code de la consommation, le client dispose d'un
                délai de 14 jours à compter de la réception du produit pour exercer son droit de
                rétractation sans avoir à justifier de motifs ni à payer de pénalités.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Les produits cosmétiques descellés ne peuvent être retournés pour des raisons d'hygiène.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">8. Garanties</h2>
              <p className="text-foreground/80 leading-relaxed">
                Tous les produits vendus bénéficient de la garantie légale de conformité (articles
                L217-4 et suivants du Code de la consommation) et de la garantie des vices cachés
                (articles 1641 et suivants du Code civil).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">9. Données personnelles</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les informations collectées lors de la commande sont nécessaires au traitement de
                celle-ci et peuvent être transmises aux partenaires chargés de l'exécution, du
                traitement, de la gestion et du paiement des commandes. Pour plus d'informations,
                consultez notre Politique de Confidentialité.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="font-serif text-2xl mb-4">10. Contact</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Pour toute question concernant nos CGV ou pour exercer vos droits, vous pouvez nous
                contacter :
              </p>
              <ul className="list-none space-y-2 text-foreground/80">
                <li>Par email : contact@lecoin1beaut.fr</li>
                <li>Par courrier : LE COIN 1 BEAUT, [Adresse à compléter]</li>
              </ul>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}