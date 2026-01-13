"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FeaturedSlider from "@/components/FeaturedSlider";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getCategoriesWithProducts } from "@/lib/sanity.query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Footer from "@/components/Footer";
import FloatingButtonNav from "@/components/FloatingBottomNav";
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";
import Link from "next/link";

export default function ShopPage() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const f = await getFeaturedProducts(8);
        const c = await getCategoriesWithProducts();
        setFeatured(f || []);
        setCategories(c || []);
      } catch (err) {
        console.error("Fetch error", err);
      }
    })();
  }, []);

  return (
    <>
      <DesktopNavbar />
      <MobileTopNav />
      
      <main className="min-h-screen bg-[#050505] text-white overflow-clip">
        {/* 1. HERO / FEATURED SECTION */}
        <section className="pt-24 pb-10">
           <FeaturedSlider items={featured} />
        </section>

        {/* 2. CATEGORY SECTIONS */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 pb-24">
          {categories.map((cat, idx) => (
            <motion.section 
              key={cat._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="mt-24 first:mt-10"
            >
              {/* Category Editorial Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/5 pb-8 gap-6">
                <div className="max-w-2xl">
                  <h3 className="text-4xl md:text-6xl font-serif tracking-tighter text-white mb-4">
                    {cat.title}
                  </h3>
                  <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.2em] font-light leading-relaxed">
                    {cat.description || "A curated selection of luxury pieces."}
                  </p>
                </div>

                <Link 
                  href={`/shop/category/${cat.slug}`} 
                  className="group flex items-center gap-3 text-amber-200/60 hover:text-amber-100 transition-all"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em]">Discover All</span>
                  <div className="w-8 h-[1px] bg-amber-200/30 group-hover:w-12 transition-all" />
                </Link>
              </div>

              {/* Product Row - Using FreeMode for that 'Glide' feel */}
              <div className="-mx-4">
                <Swiper
                  modules={[Autoplay, FreeMode]}
                  freeMode={true}
                  spaceBetween={20}
                  autoplay={{ delay: 3500 + (idx * 500), disableOnInteraction: false }}
                  breakpoints={{
                    0: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2.3 },
                    1024: { slidesPerView: 3.5 },
                    1440: { slidesPerView: 4.5 },
                  }}
                  className="overflow-visible!"
                >
                  {cat.products && cat.products.slice(0, 10).map((product) => (
                    <SwiperSlide key={product._id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}

                  {/* 11th Slide: Sophisticated View All Card */}
                  <SwiperSlide>
                    <Link href={`/shop/category/${cat.slug}`}>
                      <div className="aspect-[3/4] flex flex-col items-center justify-center border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                         <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 group-hover:text-amber-200 transition-colors">
                            End of Gallery
                         </span>
                         <h4 className="text-xl font-serif mt-2 italic group-hover:text-white">View Full Collection</h4>
                         <div className="mt-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-200/50 transition-all">
                            <span className="text-lg">→</span>
                         </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </Swiper>
              </div>
            </motion.section>
          ))}
        </div>
      </main>

      <FloatingButtonNav />
      <Footer />
    </>
  );
}

