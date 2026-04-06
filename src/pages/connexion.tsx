import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { redirect } = router.query;

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) {
            toast({ title: "Erreur", description: "Veuillez remplir tous les champs", variant: "destructive" });
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            toast({ title: "Erreur", description: "Les mots de passe ne correspondent pas", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            if (isLogin) {
                const { user, error } = await authService.signIn(email, password);
                if (error) {
                    toast({ title: "Erreur de connexion", description: error.message, variant: "destructive" });
                    return;
                }
                toast({ title: "Bienvenue !", description: "Connexion réussie" });
                router.push((redirect as string) || "/");
            } else {
                const { user, error } = await authService.signUp(email, password);
                if (error) {
                    toast({ title: "Erreur d'inscription", description: error.message, variant: "destructive" });
                    return;
                }
                toast({ title: "Compte créé !", description: "Vérifiez votre email pour confirmer votre compte" });
                setIsLogin(true);
            }
        } catch (error) {
            toast({ title: "Erreur", description: "Une erreur est survenue", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO title={`${isLogin ? "Connexion" : "Inscription"} - LE COIN 1 BEAUT`} description="Connectez-vous ou créez votre compte" url="/connexion" />
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center py-16">
                    <div className="w-full max-w-md mx-auto px-4">
                        <div className="text-center mb-8">
                            <h1 className="font-serif text-4xl mb-2">{isLogin ? "Connexion" : "Créer un compte"}</h1>
                            <p className="text-muted-foreground">
                                {isLogin ? "Accédez à votre espace personnel" : "Rejoignez l'univers Le Coin 1 Beaut"}
                            </p>
                        </div>

                        <div className="bg-card p-8 rounded-lg border border-border space-y-6">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="mt-1" />
                            </div>

                            <div>
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
                            </div>

                            {!isLogin && (
                                <div>
                                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                    <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
                                </div>
                            )}

                            <Button className="w-full bg-noir hover:bg-noir/90 text-creme" onClick={handleSubmit} disabled={loading}>
                                {loading ? "Chargement..." : isLogin ? "Se connecter" : "Créer mon compte"}
                            </Button>

                            {isLogin && (
                                <p className="text-center text-sm text-muted-foreground">
                                    <button onClick={() => { }} className="text-gold hover:underline">Mot de passe oublié ?</button>
                                </p>
                            )}
                        </div>

                        <p className="text-center mt-6 text-sm text-muted-foreground">
                            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
                            <button onClick={() => setIsLogin(!isLogin)} className="text-gold hover:underline ml-1">
                                {isLogin ? "Créer un compte" : "Se connecter"}
                            </button>
                        </p>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}