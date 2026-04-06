import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { authService, type AuthUser } from "@/services/authService";

export function useAuth() {
  const [user, setUser] = useState < AuthUser | null > (null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Charger l'utilisateur au démarrage
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Écouter les changements d'auth
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            user_metadata: session.user.user_metadata,
            created_at: session.user.created_at,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    router.push("/");
  };

  // Redirige vers /connexion si pas connecté
  const requireAuth = () => {
    if (!loading && !user) {
      router.push(`/connexion?redirect=${router.asPath}`);
      return false;
    }
    return true;
  };

  return { user, loading, signOut, requireAuth };
}