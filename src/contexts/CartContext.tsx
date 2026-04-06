import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCart } from "@/services/cartService";
import { useAuth } from "@/hooks/useAuth";

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  refreshCart: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCartCount(0);
      return;
    }
    try {
      const items = await getCart(user.id);
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      refreshCart();
    }
  }, [user, authLoading, refreshCart]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}