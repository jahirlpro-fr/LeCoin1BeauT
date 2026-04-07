import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { getCart, calculateCartTotal, type CartItemWithDetails } from "@/services/cartService";
import { createOrder } from "@/services/ordersService";
import { Check, Truck, Package, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Données commande
  const [email, setEmail] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("home");
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France",
    phone: ""
  });
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "France"
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
        const { user } = useAuth();
      const items = await getCart(userId);
      
      if (items.length === 0) {
        router.push("/panier");
        return;
      }
      
      setCartItems(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = calculateCartTotal(cartItems);
  const shippingCost = deliveryMethod === "pickup" ? 0 : (subtotal >= 60 ? 0 : 4.90);
  const total = subtotal + shippingCost;

  const handlePlaceOrder = async () => {
    try {
      const userId = "temp-user-id"; // TODO: remplacer par auth.uid()
      
      const orderData = {
        userId,
        items: cartItems.map(item => ({
          productId: item.product_id,
          variantId: item.variant_id,
          quantity: item.quantity,
          price: (item.product?.price || 0) + (item.variant?.price_adjustment || 0)
        })),
        shippingAddress: `${shippingAddress.firstName} ${shippingAddress.lastName}, ${shippingAddress.address}, ${shippingAddress.postalCode} ${shippingAddress.city}, ${shippingAddress.country}`,
        billingAddress: sameAsShipping 
          ? `${shippingAddress.firstName} ${shippingAddress.lastName}, ${shippingAddress.address}, ${shippingAddress.postalCode} ${shippingAddress.city}, ${shippingAddress.country}`
          : `${billingAddress.firstName} ${billingAddress.lastName}, ${billingAddress.address}, ${billingAddress.postalCode} ${billingAddress.city}, ${billingAddress.country}`,
        shippingMethod: deliveryMethod === "home" ? "Domicile" : "Click & Collect",
        shippingCost,
        totalAmount: total
      };

        const orderId = await createOrder(orderData, "temp-user-id");
      
      toast({
        title: "Commande confirmée !",
        description: `Numéro de commande : ${orderId.slice(0, 8)}`,
      });
      
      // TODO: Rediriger vers page paiement Stripe
      router.push(`/compte/commandes/${orderId}`);
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de passer la commande",
        variant: "destructive",
      });
    }
  };

  const isStepValid = () => {
    if (step === 1) return email.includes("@");
    if (step === 2) return deliveryMethod && shippingAddress.firstName && shippingAddress.address && shippingAddress.city && shippingAddress.postalCode;
    return true;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container-luxury py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-card rounded w-1/3" />
            <div className="h-64 bg-card rounded" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Commande - LE COIN 1 BEAUT"
        description="Finalisez votre commande"
        url="/checkout"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container-luxury py-12">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              {[1, 2, 3].map(num => (
                <div key={num} className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-luxury ${
                    step >= num ? "bg-noir text-creme" : "bg-perle text-muted-foreground"
                  }`}>
                    {step > num ? <Check className="h-5 w-5" /> : num}
                  </div>
                  {num < 3 && <div className={`w-16 h-0.5 ${step > num ? "bg-noir" : "bg-border"}`} />}
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-24 mt-4 text-sm">
              <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>Coordonnées</span>
              <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>Livraison</span>
              <span className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>Paiement</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              {/* Étape 1: Email */}
              {step === 1 && (
                <div className="bg-card rounded-lg p-8">
                  <h2 className="font-serif text-2xl mb-6">Vos coordonnées</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Adresse email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        className="mt-1"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Vous recevrez la confirmation de commande à cette adresse
                      </p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full mt-8 bg-noir hover:bg-noir/90 text-creme"
                    onClick={() => setStep(2)}
                    disabled={!isStepValid()}
                  >
                    Continuer vers la livraison
                  </Button>
                </div>
              )}

              {/* Étape 2: Livraison */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-8">
                    <h2 className="font-serif text-2xl mb-6">Mode de livraison</h2>
                    
                    <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-gold transition-luxury cursor-pointer">
                        <RadioGroupItem value="home" id="home" />
                        <Label htmlFor="home" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-gold" />
                            <div>
                              <p className="font-medium">Livraison à domicile</p>
                              <p className="text-sm text-muted-foreground">
                                {subtotal >= 60 ? "Offerte" : "4,90 €"} - Délai 2-3 jours ouvrés
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-gold transition-luxury cursor-pointer">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Package className="h-5 w-5 text-gold" />
                            <div>
                              <p className="font-medium">Click & Collect</p>
                              <p className="text-sm text-muted-foreground">
                                Gratuit - Prêt en 2h en magasin
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="bg-card rounded-lg p-8">
                    <h2 className="font-serif text-2xl mb-6">Adresse de livraison</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={shippingAddress.firstName}
                          onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={shippingAddress.lastName}
                          onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Adresse *</Label>
                        <Input
                          id="address"
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingAddress.phone}
                          onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                      Retour
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-noir hover:bg-noir/90 text-creme"
                      onClick={() => setStep(3)}
                      disabled={!isStepValid()}
                    >
                      Continuer vers le paiement
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 3: Récapitulatif & Paiement */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-8">
                    <h2 className="font-serif text-2xl mb-6">Récapitulatif</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gold" />
                          Livraison
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {shippingAddress.firstName} {shippingAddress.lastName}<br />
                          {shippingAddress.address}<br />
                          {shippingAddress.postalCode} {shippingAddress.city}<br />
                          {deliveryMethod === "home" ? "Livraison à domicile" : "Click & Collect"}
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-2">Articles ({cartItems.length})</h3>
                        <div className="space-y-2">
                          {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.product?.name} {item.variant ? `- ${item.variant.name}` : ""} (x{item.quantity})
                              </span>
                              <span>
                                {((item.product?.price || 0) + (item.variant?.price_adjustment || 0)) * item.quantity} €
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-perle rounded-lg p-6">
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      🚧 Intégration Stripe en cours de développement
                    </p>
                    <p className="text-center text-xs text-muted-foreground">
                      Cette fonctionnalité sera disponible dans la prochaine phase
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" size="lg" onClick={() => setStep(2)}>
                      Retour
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 bg-noir hover:bg-noir/90 text-creme"
                      onClick={handlePlaceOrder}
                    >
                      Confirmer la commande
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Récapitulatif Commande */}
            <div>
              <div className="bg-card rounded-lg p-6 sticky top-24">
                <h3 className="font-serif text-xl mb-4">Votre commande</h3>
                
                <div className="space-y-3 pb-4 border-b border-border mb-4">
                  {cartItems.slice(0, 3).map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-perle flex-shrink-0">
                        {item.product?.image_url && (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product?.name}</p>
                        <p className="text-xs text-muted-foreground">Quantité : {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{cartItems.length - 3} autre{cartItems.length - 3 > 1 ? "s" : ""} article{cartItems.length - 3 > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className={shippingCost === 0 ? "text-gold" : ""}>
                      {shippingCost === 0 ? "Offerte" : `${shippingCost.toFixed(2)} €`}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between text-lg font-medium">
                  <span>Total TTC</span>
                  <span className="text-gold">{total.toFixed(2)} €</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}