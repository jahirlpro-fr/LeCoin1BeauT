import { useState, useEffect } from "react";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserOrders, type OrderWithDetails } from "@/services/ordersService";
import { User, Package, MapPin, Heart, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const userId = "temp-user-id"; // TODO: remplacer par auth.uid()
        const userOrders = await getUserOrders(userId);
      setOrders(userOrders);
      
      // TODO: Charger profil utilisateur
      setProfile({
        firstName: "Jean",
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        phone: "06 12 34 56 78"
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      // TODO: Implémenter mise à jour profil
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "processing": return "text-blue-600 bg-blue-50";
      case "shipped": return "text-purple-600 bg-purple-50";
      case "delivered": return "text-green-600 bg-green-50";
      case "cancelled": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "En attente";
      case "processing": return "En préparation";
      case "shipped": return "Expédiée";
      case "delivered": return "Livrée";
      case "cancelled": return "Annulée";
      default: return status;
    }
  };

  return (
    <>
      <SEO
        title="Mon Compte - LE COIN 1 BEAUT"
        description="Gérez votre compte et vos commandes"
        url="/compte"
      />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 container-luxury py-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-8">Mon Compte</h1>

          <Tabs defaultValue="orders" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="orders" className="gap-2">
                <Package className="h-4 w-4" />
                Commandes
              </TabsTrigger>
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="addresses" className="gap-2">
                <MapPin className="h-4 w-4" />
                Adresses
              </TabsTrigger>
            </TabsList>

            {/* Commandes */}
            <TabsContent value="orders">
              <div className="bg-card rounded-lg p-6">
                <h2 className="font-serif text-2xl mb-6">Mes commandes</h2>
                
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-32 bg-perle rounded animate-pulse" />
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-6">Vous n'avez pas encore de commande</p>
                    <Button asChild className="bg-noir hover:bg-noir/90 text-creme">
                      <Link href="/">Découvrir nos produits</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border border-border rounded-lg p-6 hover:border-gold transition-luxury">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-medium">
                              Commande #{order.order_number}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              })}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items?.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {item.product?.name} (x{item.quantity})
                              </span>
                              <span>{item.total_price.toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-border">
                          <span className="font-medium">Total</span>
                          <span className="text-lg font-medium text-gold">
                            {order.total.toFixed(2)} €
                          </span>
                        </div>

                        <div className="mt-4">
                          <Button asChild variant="outline" size="sm" className="w-full">
                            <Link href={`/compte/commandes/${order.id}`}>
                              Voir les détails
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Profil */}
            <TabsContent value="profile">
              <div className="bg-card rounded-lg p-6">
                <h2 className="font-serif text-2xl mb-6">Mes informations</h2>
                
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button
                  className="mt-6 bg-noir hover:bg-noir/90 text-creme"
                  onClick={handleUpdateProfile}
                >
                  Enregistrer les modifications
                </Button>
              </div>
            </TabsContent>

            {/* Adresses */}
            <TabsContent value="addresses">
              <div className="bg-card rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-2xl">Mes adresses</h2>
                  <Button variant="outline" size="sm">
                    Ajouter une adresse
                  </Button>
                </div>

                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p>Aucune adresse enregistrée</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>

        <Footer />
      </div>
    </>
  );
}