import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-hero animate-fade-in-slow" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gold rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-rose rounded-full blur-3xl" />
            </div>

            <div className="container-luxury relative z-10 py-20">
                <div className="max-w-3xl">

                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noir/5 backdrop-blur-sm border border-noir/10 mb-8 animate-fade-in-up"
                        style={{ animationDelay: "0.1s" }}
                    >
                        <Sparkles className="h-4 w-4 text-gold" />
                        <span className="text-sm font-medium">Collection Printemps 2026</span>
                    </div>

                    {/* Title */}
                    <h1
                        className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 animate-fade-in-up"
                        style={{ animationDelay: "0.3s" }}
                    >
                        L'Élégance
                        <br />
                        <span className="text-gradient-gold">Au Naturel</span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed max-w-2xl animate-fade-in-up"
                        style={{ animationDelay: "0.55s" }}
                    >
                        Découvrez notre sélection de parfums d'exception et de soins de beauté raffinés,
                        pensés pour sublimer votre beauté naturelle.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
                        style={{ animationDelay: "0.75s" }}
                    >
                        <Button size="lg" asChild className="btn-shimmer gap-2 group border-0">
                            <Link href="/nouveautes">
                                Découvrir la Collection
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="border-noir hover:bg-noir hover:text-creme">
                            <Link href="/parfums">
                                Explorer les Parfums
                            </Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div
                        className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-noir/10 animate-fade-in-up"
                        style={{ animationDelay: "1s" }}
                    >
                        <div>
                            <p className="text-3xl md:text-4xl font-serif text-gold mb-1">500+</p>
                            <p className="text-sm text-muted-foreground">Produits de luxe</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-serif text-gold mb-1">50+</p>
                            <p className="text-sm text-muted-foreground">Marques premium</p>
                        </div>
                        <div>
                            <p className="text-3xl md:text-4xl font-serif text-gold mb-1">98%</p>
                            <p className="text-sm text-muted-foreground">Clients satisfaits</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}