"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { useStore } from "@/store/useStore";
import { urlFor } from "@/sanity/lib/image";

export default function ProductCard({ product }) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFavorite = useStore((s) => s.isFavorite(product._id));

  const imgUrl = product.image ? urlFor(product.image).width(600).height(800).url() : "/placeholder.jpg";
  const slug = product.slug?.current || product.slug || "";

  return (
    <div className="group relative w-full mb-12">
      {/* Favorite Button */}
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
        className="absolute right-3 top-3 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 bg-black/10 p-2 rounded-full backdrop-blur-sm"
        aria-label="Add to favorites"
      >
        <Heart 
          className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${isFavorite ? "fill-amber-400 text-amber-400" : "text-white/70 hover:text-white"}`} 
        />
      </button>

      <Link href={`/shop/product/${slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full bg-[#1a1a1a] overflow-hidden">
          <Image 
            src={imgUrl} 
            alt={product.name} 
            fill
            className="object-cover transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) md:group-hover:scale-105" 
          />
          
          <div className="absolute left-4 top-4 flex flex-col gap-2 pointer-events-none">
            {product.onSale && (
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] bg-white text-black px-2 py-1 font-bold">
                Limited Edition
              </span>
            )}
          </div>

          {/* DESKTOP ONLY: Quick Add Overlay (Slide up) */}
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="hidden md:flex absolute bottom-0 left-0 w-full bg-white text-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500 items-center justify-center gap-2"
          >
            <Plus size={14} /> Add to Bag
          </button>
        </div>

        {/* Product Info */}
        <div className="mt-4 flex flex-col gap-1 px-1">
          <div className="flex justify-between items-start">
            <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/90 font-light">
              {product.name}
            </h3>
            <span className="text-sm font-serif text-amber-100/80">
              ₦{product.price?.toLocaleString()}
            </span>
          </div>
          
          <p className="hidden md:block text-[10px] text-white/40 font-light leading-relaxed line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {product.description}
          </p>

          {/* MOBILE ONLY: Static Clear Button */}
          <button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="md:hidden mt-3 w-full border border-white/20 bg-white/5 py-3 text-[10px] uppercase tracking-[0.2em] text-white font-bold flex items-center justify-center gap-2 active:bg-white active:text-black transition-colors"
          >
            <Plus size={14} /> Add to Bag
          </button>
        </div>
      </Link>
    </div>
  );
}
