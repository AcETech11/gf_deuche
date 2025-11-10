"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Flame, Tag } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { getCategoryProducts } from "@/lib/sanity.query";
import { useStore } from "@/store/useStore";


import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";
import Footer from "@/components/Footer";
import FloatingButtonNav from "@/components/FloatingBottomNav";

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);

  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFavorite = (id) => useStore.getState().isFavorite(id);

  useEffect(() => {
    (async () => {
      const data = await getCategoryProducts(slug);
      setCategory(data);
    })();
  }, [slug]);

  console.log(slug);

  if (!category) return <p className="text-center py-20 text-gray-400">Loading...</p>;

  return (
    <>
    <DesktopNavbar/>
    <MobileTopNav/>
    <main className="min-h-screen bg-black text-white px-4 md:px-12 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold mb-3 capitalize">{slug}</h1>
      <p className="text-gray-400 mb-10">Explore our latest {slug} collection.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {category?.map((product) => {
          const imgUrl = product.image
            ? urlFor(product.image).width(600).height(800).url()
            : "/placeholder.jpg";

          const favorite = isFavorite(product._id);

          return (
            
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden bg-white/10 shadow-md cursor-pointer w-full h-[500px]"
              onClick={() => window.location.href = `/shop/product/${product.slug}`}
            >
              <div className="relative w-full h-full md:h-72">
                <Image
                  src={imgUrl}
                  alt={product.name}
                  width={400}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Badges */}
              <div className="absolute left-3 top-3 space-y-2 z-20">
                {product.onSale && (
                  <div className="px-2 py-1 bg-red-400 text-white text-xs rounded-full font-semibold flex gap-1 items-center justify-center">
                    <Tag className="w-4 h-4" /> Sale
                  </div>
                )}
                {product.trending && (
                  <div className="px-2 py-1 bg-yellow-400 text-white text-xs rounded-full font-semibold flex gap-1 items-center justify-center">
                    <Flame className="w-4 h-4" /> Trending
                  </div>
                )}
              </div>

              {/* Favorite */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
                className="absolute right-3 top-3 z-30 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 backdrop-blur text-white"
              >
                <Heart className={`w-4 h-4 ${favorite ? "text-yellow-400" : "text-white"}`} />
              </button>

              {/* Bottom Overlay */}
              <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-black/40">
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-300 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">
                      ₦{product.price?.toLocaleString?.() ?? product.price}
                    </div>
                    {product.discountPrice && (
                      <div className="text-xs text-gray-400 line-through">
                        ₦{product.discountPrice}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-full h-[35px] bg-yellow-400 text-black rounded-full text-sm font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
    <FloatingButtonNav/>
    <Footer/>
    </>
  );
}
