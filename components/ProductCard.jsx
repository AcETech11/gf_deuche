"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Tag, Flame } from "lucide-react";
import { useStore } from "@/store/useStore";
import { urlFor } from "@/sanity/lib/image";

export default function ProductCard({ product }) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFavorite = useStore((s) => s.isFavorite(product._id));

  const imgUrl = product.image ? urlFor(product.image).width(500).height(500).url() : "/placeholder.jpg";
  const slug = product.slug?.current || product.slug || "";
  console.log(slug);

  return (
    <Link href={`/shop/product/${slug}`} className="w-full h-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative rounded-2xl overflow-hidden bg-white/30 shadow-md cursor-pointer w-full h-[500px]"
      >
        {/* Image */}
        <div className="relative w-full h-full md:h-72">
          <Image 
            src={imgUrl} 
            alt={product.name} 
            width={300}
            height={600}
            className="object-cover w-full h-full" 
          />
        </div>

        {/* Top-left badges */}
        <div className="absolute left-3 top-3 space-y-2 z-20">
          {product.onSale && (
            <div className="px-2 py-1 bg-red-400 text-foreground text-xs rounded-full font-semibold flex gap-2 items-center justify-center">
              <Tag className="w-4 h-4"/> Sale
            </div>
          )}
          {product.trending && (
            <div className="px-2 py-1 bg-yellow-400 text-white text-xs rounded-full font-semibold flex gap-1 items-center justify-center">
              <Flame className="w-4 h-4"/> Trending
            </div>
          )} 
        </div>

        {/* Top-right favorite bubble */}
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(product); }}
          className="absolute right-3 top-3 z-30 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 backdrop-blur text-white"
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "text-yellow-400" : "text-white"}`} />
        </button>

        {/* Bottom overlay */}
        <div className="w-full absolute bottom-0 left-0 backdrop-blur-xs">
          <div className="p-4 flex flex-col items-end justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl md:text-base font-semibold text-white line-clamp-1">{product.name}</h3>
              <p className="text-xs text-accent line-clamp-2">{product.description}</p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="flex w-full items-center justify-between">
                <div className="text-sm font-semibold text-white">
                  ₦{product.price?.toLocaleString?.() ?? product.price}
                </div>
                {product.discountPrice && (
                  <div className="text-xs text-gray-400 line-through">{`₦${product.discountPrice?.toLocaleString?.() ?? product.discountPrice}`}</div>
                )}
              </div>

              <button
                onClick={(e) => { e.preventDefault(); addToCart(product); }}
                className="w-full h-[30px] mt-2 px-4 py-1 bg-primary text-foreground rounded-full text-sm font-medium cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

