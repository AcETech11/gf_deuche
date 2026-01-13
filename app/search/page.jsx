"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search as SearchIcon, X, ShoppingBag } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { getAllProducts } from "@/lib/sanity.query";
import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";

import Footer from "@/components/Footer";
import FloatingButtonNav from "@/components/FloatingBottomNav";
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const addToCart = useStore((s) => s.addToCart);

  useEffect(() => {
    (async () => {
      const data = await getAllProducts();
      setProducts(data);
      setFiltered(data);
    })();
  }, []);

  useEffect(() => {
  const handler = setTimeout(() => {
    if (!query.trim()) {
      setFiltered(products);
      setIsSearching(false);
    } else {
      // Your existing Fuse search logic here
      const results = fuse.search(query).map(r => r.item);
      setFiltered(results);
    }
  }, 100); // 100ms delay prevents "cascading renders"

  return () => clearTimeout(handler);
}, [query, products]);
  return (
    <>
      <DesktopNavbar />
      <MobileTopNav />
      
      <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Minimalist Search Header */}
          <header className="mb-20 text-center max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.5em] text-amber-200/50 mb-4 block">Discovery</span>
            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH ARCHIVE..."
                className="w-full bg-transparent border-b border-white/10 py-4 text-2xl md:text-4xl font-serif italic text-center focus:outline-none focus:border-amber-200/50 transition-colors placeholder:text-white/10"
              />
              <div className="absolute left-0 bottom-0 h-[1px] bg-amber-200 w-0 group-focus-within:w-full transition-all duration-700"></div>
              {query && (
                <button 
                  onClick={() => setQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  <X size={20} strokeWidth={1} />
                </button>
              )}
            </div>
          </header>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((p, idx) => (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group"
                  >
                    <div 
                      className="relative aspect-[3/4] overflow-hidden bg-[#111] cursor-pointer"
                      onClick={() => router.push(`/shop/product/${p.slug.current}`)}
                    >
                      <Image
                        src={p.image ? urlFor(p.image).width(600).height(800).url() : "/placeholder.jpg"}
                        alt={p.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                      
                      {/* Quick Action Overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p);
                          toast.success(`${p.name} added to bag`, {
                            style: { background: '#111', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', borderRadius: '0px' }
                          });
                        }}
                        className="absolute bottom-0 left-0 w-full bg-white text-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> Add to Bag
                      </button>
                    </div>

                    <div className="mt-5 space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/90 font-medium">
                          {p.name}
                        </h3>
                        <span className="text-[13px] font-serif text-amber-100/80">
                          ₦{p.price?.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-[10px] text-white/30 uppercase tracking-tighter">
                        {p.category?.title || "Exclusive"}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full py-40 text-center"
                >
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">No Results Found</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <FloatingButtonNav />
      <Footer />
    </>
  );
}