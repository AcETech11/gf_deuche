"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function FeaturedSlider({ items = [] }) {
  if (!items?.length) return null;

  return (
    <div className="py-20 bg-[#050505] overflow-hidden">
      {/* Header Section with Editorial Spacing */}
      <div className="px-6 md:px-16 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-2"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-amber-200/50">
            Exclusive Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
            Featured <span className="italic text-amber-100/80">Pieces</span>
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[11px] uppercase tracking-[0.2em] text-white/40 max-w-[200px] leading-relaxed border-l border-white/10 pl-4"
        >
          Hand-selected garments from our latest Parisian drop.
        </motion.p>
      </div>

      {/* The Slider */}
      <div className="pl-6 md:pl-16">
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView={1.2}
          spaceBetween={24}
          freeMode={true} // Makes it feel high-end and fluid
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3.2 },
            1440: { slidesPerView: 4.2 },
          }}
          autoplay={{ 
            delay: 4000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true 
          }}
          loop={items.length > 4}
          className="overflow-visible!" // Crucial for that "bleeding off the edge" look
        >
          {items.map((p) => (
            <SwiperSlide key={p._id} className="transition-opacity duration-500">
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Subtle Progress Track (Luxury Detail) */}
      <div className="mt-12 px-6 md:px-16">
        <div className="h-1px w-full bg-white/5 relative">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "30%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute h-full bg-amber-200/30"
          />
        </div>
      </div>
    </div>
  );
}
