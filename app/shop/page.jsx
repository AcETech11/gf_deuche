"use client";

import { useEffect, useState } from "react";
//import { motion } from "framer-motion";
import FeaturedSlider from "@/components/FeaturedSlider";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getCategoriesWithProducts } from "@/lib/sanity.query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Footer from "@/components/Footer";
import FloatingButtonNav from "@/components/FloatingBottomNav";
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";

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
    <DesktopNavbar/>
    <MobileTopNav/>
      <main className="min-h-screen bg-black text-white px-4 md:px-12 py-10">
        {/* Featured top */}
        <section className="max-w-7xl mx-auto">
          <FeaturedSlider items={featured} />
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto mt-8 space-y-14">
          {categories.map((cat) => (
            <div key={cat._id}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">{cat.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base max-w-lg">{cat.description}</p>
                </div>
                <a href={`/shop/category/${cat.slug}`} className="text-yellow-400 hidden md:inline">View all →</a>
              </div>

              {/* Swiper slider showing up to 10 products; 11th = view all card */}
              <Swiper
                modules={[Autoplay]}
                spaceBetween={12}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                breakpoints={{
                  0: { slidesPerView: 1.05 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                loop
              >
                {cat.products && cat.products.slice(0, 10).map((product) => (
                  <SwiperSlide key={product._id} className="px-2">
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}

                {/* 11th slide = View All */}
                <SwiperSlide className="px-2">
                  <div className="h-[500px] bg-accent md:h-72 rounded-2xl flex items-center justify-center border border-secondary/50 cursor-pointer ">
                    <a href={`/shop/category/${cat.slug}`} className="text-yellow-400 font-semibold text-lg animate-pulse">View all →</a>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          ))}
        </section>
      </main>
      <FloatingButtonNav/>
      <Footer />
    </>
  );
}

