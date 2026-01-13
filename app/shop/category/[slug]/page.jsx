"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryProducts } from "@/lib/sanity.query";

import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";
import Footer from "@/components/Footer";
import FloatingButtonNav from "@/components/FloatingBottomNav";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCategoryProducts(slug);
        
        // FIX: Ensuring we handle both direct arrays or nested product objects
        const items = Array.isArray(data) ? data : data?.products || [];
        setProducts(items);
      } catch (error) {
        console.error("Error loading category products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <>
      <DesktopNavbar />
      <MobileTopNav />
      
      <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
        {/* --- Header Section (Editorial Style) --- */}
        <section className="px-6 md:px-16 mb-20 relative overflow-hidden">
          <div className="absolute -top-10 left-10 opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[15vw] font-serif leading-none uppercase tracking-tighter whitespace-nowrap">
              {slug}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-amber-200/50 mb-4 block">
              Curated Series
            </span>
            <h1 className="text-5xl md:text-8xl font-serif capitalize mb-6 tracking-tight">
              {slug?.toString().replace("-", " ")}
            </h1>
            <div className="w-24 h-[1px] bg-amber-200/30 mb-8"></div>
            <p className="max-w-md text-white/40 text-[11px] leading-relaxed tracking-[0.1em] uppercase">
              Refined silhouettes and unmatched craftsmanship. Explore the 
              latest additions to the {slug} archive.
            </p>
          </motion.div>
        </section>

        {/* --- Product Grid --- */}
        <section className="px-6 md:px-16">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-white/[0.03] mb-4" />
                  <div className="h-2 w-1/2 bg-white/10 mb-2" />
                  <div className="h-2 w-1/4 bg-white/5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              <AnimatePresence mode="popLayout">
                {products.length > 0 ? (
                  products.map((product, idx) => (
                    <motion.div
                      key={product._id || idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.7, 
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full py-40 border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center text-center"
                  >
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-4">Archive Empty</p>
                    <h3 className="text-xl font-serif italic text-white/60">Pieces arriving soon.</h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      <FloatingButtonNav />
      <Footer />
    </>
  );
}
