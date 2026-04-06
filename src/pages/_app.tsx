import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/contexts/CartContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <Component {...pageProps} />
            <Toaster />
        </CartProvider>
    );
}