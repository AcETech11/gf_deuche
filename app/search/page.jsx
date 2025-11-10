"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Image from "next/image";
import { motion } from "framer-motion";
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

  const addToCart = useStore((s) => s.addToCart);

  useEffect(() => {
    (async () => {
      const data = await getAllProducts(); // Fetch all products from Sanity
      setProducts(data);
      setFiltered(data);
    })();
  }, []);

  // Fuse.js setup
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(products);
      return;
    }

    const fuse = new Fuse(products, {
      keys: ["name", "tags", "category.title", "description"],
      threshold: 0.3, // Lower = stricter
    });

    const result = fuse.search(query);
    setFiltered(result.map((r) => r.item));
  }, [query, products]);

  return (
    <>
    <DesktopNavbar/>
    <MobileTopNav/>
    <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6">Search Products</h1>

        {/* Search Input */}
        <div className="mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, tag, or category..."
            className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.03 }}
                className="relative rounded-2xl overflow-hidden bg-white/10 shadow-md"
                onClick={() => (window.location.href = `/shop/product/${p.slug.current}`)}
              >
                <div className="relative w-full h-64">
                  <Image
                    src={p.image ? urlFor(p.image).width(600).height(800).url() : "/placeholder.jpg"}
                    alt={p.name}
                    width={600}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-3">
                  <h4 className="font-medium line-clamp-1">{p.name}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm font-semibold text-white">
                      ₦{p.price?.toLocaleString()}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                        toast.success("Added to cart");
                      }}
                      className="px-3 py-1 bg-yellow-400 text-black rounded-full text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
    <FloatingButtonNav/>
    <Footer/>
    </>
  );
}
