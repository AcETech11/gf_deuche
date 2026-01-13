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
    <div className="group relative w-full mb-8">
      {/* Favorite Button - Floating Minimalist */}
      <button
        onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
        className="absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        aria-label="Add to favorites"
      >
        <Heart 
          className={`w-5 h-5 transition-colors duration-300 ${isFavorite ? "fill-amber-400 text-amber-400" : "text-white/70 hover:text-white"}`} 
        />
      </button>

      <Link href={`/shop/product/${slug}`} className="block overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[3/4] w-full bg-[#1a1a1a] overflow-hidden">
          <Image 
            src={imgUrl} 
            alt={product.name} 
            fill
            className="object-cover transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105" 
          />
          
          {/* Subtle Badges - Text only, no bulky bubbles */}
          <div className="absolute left-4 top-4 flex flex-col gap-2 pointer-events-none">
            {product.onSale && (
              <span className="text-[9px] uppercase tracking-[0.2em] bg-white text-black px-2 py-1 font-bold">
                Limited Offer
              </span>
            )}
            {product.trending && (
              <span className="text-[9px] uppercase tracking-[0.2em] bg-amber-200 text-black px-2 py-1 font-bold">
                Trending
              </span>
            )}
          </div>

          {/* Quick Add Overlay */}
          <motion.button
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="absolute bottom-0 left-0 w-full bg-white text-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2"
          >
            <Plus size={14} /> Add to Bag
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1 px-1">
          <div className="flex justify-between items-start">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-white/90 font-light group-hover:text-amber-100 transition-colors">
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-serif text-amber-100/80">
              ₦{product.price?.toLocaleString() ?? product.price}
            </span>
            {product.discountPrice && (
              <span className="text-[10px] text-white/30 line-through font-light">
                ₦{product.discountPrice?.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Invisible description that appears on hover or just stays minimalist */}
          <p className="text-[10px] text-white/40 font-light leading-relaxed line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            {product.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
