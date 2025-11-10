"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";
import FloatingBottomNav from "@/components/FloatingBottomNav";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client"; // Make sure this points to your Sanity client
import { urlFor } from "@/sanity/lib/image";

export default function FavoritesPage() {
  const favorites = useStore((s) => s.favorites); // stored IDs or partial objects
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const [products, setProducts] = useState([]);

  // Fetch full product data from Sanity
  useEffect(() => {
    if (!favorites.length) return;

    const fetchProducts = async () => {
      try {
        const ids = favorites.map((f) => `"${f._id}"`).join(",");
        const query = `*[_type == "product" && _id in [${ids}]]{
          _id,
          name,
          slug,
          "image": images[0].asset->url,
          price
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch favorite products:", err);
      }
    };

    fetchProducts();
  }, [favorites]);

  // Empty state
  if (!favorites.length) {
    return (
      <>
        <DesktopNavbar />
        <MobileTopNav />
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
          <p className="text-lg mb-2">No favorites yet.</p>
          <Link
            href="/shop"
            className="text-yellow-400 underline hover:text-yellow-300 transition"
          >
            Browse products
          </Link>
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

      <main className="min-h-screen bg-black text-white px-6 py-10">
        <h1 className="text-2xl font-serif mb-6">Your Favorites</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {products.map((p) => {
              const slug = p.slug?.current || p.slug || "";

              if (!slug) return null; // skip products without valid slug

              return (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 rounded-2xl overflow-hidden p-3 border border-white/10 hover:border-yellow-400/50 transition"
                >
                  <Link href={`/shop/product/${slug}`} className="block group">
                    <div className="relative w-full h-56 rounded-lg overflow-hidden">
                      <Image
                        src={
                          p.image ? urlFor(p.image).width(600).height(800).url() : "/placeholder.jpg"
                        }
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium line-clamp-1">{p.name}</h3>
                        <p className="text-gray-400 text-sm">
                          ₦{(p.price || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Link>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFavorite(p)}
                    className="text-yellow-400 mt-3 w-full text-center py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
                  >
                    Remove
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <FloatingBottomNav />
    </>
  );
}
