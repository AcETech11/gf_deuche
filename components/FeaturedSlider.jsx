"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import ProductCard from "./ProductCard";

export default function FeaturedSlider({ items = [] }) {
  if (!items?.length) return null;

  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-3xl font-serif text-yellow-400 mb-4">Featured Product</h2>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.15}
        spaceBetween={12}
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.5 },
        }}
        autoplay={{ delay: 2900, disableOnInteraction: false }}
        loop
      >
        {items.map((p) => (
          <SwiperSlide key={p._id}>
            <div className="px-2">
              <ProductCard product={p} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
