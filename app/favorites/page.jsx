"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Trash2, ArrowRight } from "lucide-react";

import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";
import FloatingBottomNav from "@/components/FloatingBottomNav";
import Footer from "@/components/Footer";

export default function FavoritesPage() {
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!favorites.length) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const ids = favorites.map((f) => `"${f._id}"`).join(",");
        const query = `*[_type == "product" && _id in [${ids}]]{
          _id,
          name,
          slug,
          description,
          "image": images[0],
          price
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch favorite products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [favorites]);

  // --- Empty State ---
  if (!loading && favorites.length === 0) {
    return (
      <>
        <DesktopNavbar />
        <MobileTopNav />
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-amber-200/40 mb-4 block">Archive Empty</span>
            <h2 className="text-3xl font-serif italic mb-8 text-white/60">Your wishlist is currently a blank canvas.</h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white border-b border-white/20 pb-2 hover:border-amber-200 transition-colors"
            >
              Explore Collection <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
        <Footer />
        <FloatingBottomNav />
      </>
    );
  }

  return (
    <>
      <DesktopNavbar />
      <MobileTopNav />

      <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
        {/* --- Header Section --- */}
        <section className="px-6 md:px-16 mb-20 relative overflow-hidden">
          <div className="absolute -top-10 left-10 opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[12vw] font-serif leading-none uppercase tracking-tighter whitespace-nowrap">
              Wishlist
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-amber-200/50 mb-4 block">
              Saved Pieces
            </span>
            <h1 className="text-5xl md:text-7xl font-serif capitalize mb-6 tracking-tight">
              Personal Archive
            </h1>
            <div className="w-24 h-[1px] bg-amber-200/30 mb-8"></div>
          </motion.div>
        </section>

        {/* --- Favorites Grid --- */}
        <section className="px-6 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {products.map((p, idx) => {
                const slug = p.slug?.current || p.slug || "";
                return (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ delay: idx * 0.05 }}
                    className="group relative"
                  >
                    {/* Image Container */}
                    <Link href={`/shop/product/${slug}`} className="block aspect-[3/4] relative bg-[#111] overflow-hidden">
                      <Image
                        src={p.image ? urlFor(p.image).width(600).height(800).url() : "/placeholder.jpg"}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      
                      {/* Remove Button Overlay */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(p);
                        }}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-md text-white/60 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </Link>

                    {/* Info */}
                    <div className="mt-5 space-y-2">
                      <h3 className="text-[12px] uppercase tracking-[0.2em] text-white font-medium">
                        {p.name}
                      </h3>
                      <p className="text-[14px] font-serif text-amber-100/80">
                        ₦{(p.price || 0).toLocaleString()}
                      </p>
                      
                      <Link 
                        href={`/shop/product/${slug}`}
                        className="inline-block text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors pt-2"
                      >
                        View Piece
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingBottomNav />
    </>
  );
}