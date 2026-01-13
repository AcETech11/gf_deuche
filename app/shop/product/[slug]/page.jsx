"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, ChevronRight, Share2, Maximize2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useStore } from "@/store/useStore";

import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";
import FloatingButtonNav from "@/components/FloatingBottomNav";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  
  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFavorite = useStore((s) => s.isFavorite);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    (async () => {
      try {
        const query = `*[_type == "product" && slug.current == $slug][0]{
          _id, name, description, price, discountPrice,
          images, colorOptions, sizes, tags, onSale, trending,
          category-> { _id, title, "slug": slug.current }
        }`;
        const p = await client.fetch(query, { slug });
        if (!p) { setProduct(null); return; }
        setProduct(p);
        
        const relatedQuery = `*[_type == "product" && category._ref == $catRef && slug.current != $slug][0...6]{
          _id, name, slug, price, "image": images[0]
        }`;
        const relatedItems = p?.category ? await client.fetch(relatedQuery, { catRef: p.category._id, slug }) : [];
        setRelated(relatedItems);
      } catch (err) {
        toast.error("Error loading piece.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Select color and size", {
        style: { background: '#000', color: '#fff', fontSize: '10px', borderRadius: '0', border: '1px solid #333' }
      });
      return;
    }
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: qty,
      color: selectedColor,
      size: selectedSize,
      image: product.images?.[0] ? urlFor(product.images[0]).width(200).url() : null,
      slug: product.slug?.current,
    });
    toast.success("Added to Bag");
  };

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-[10px] tracking-[0.8em] text-white animate-pulse">GF DEUCHE ATELIER</div>;
  if (!product) return <div className="h-screen bg-black flex items-center justify-center text-white">Piece not found.</div>;

  return (
    <>
      <DesktopNavbar />
      <MobileTopNav />
      <Toaster position="bottom-center" />

      <main className="min-h-screen bg-[#050505] text-white pb-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* LEFT: IMAGE SECTION - High Fashion Layout */}
          <div className="lg:col-span-8 border-r border-white/5">
            {/* Mobile Carousel */}
            <div className="lg:hidden h-[70vh] relative">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-white' }}
                className="h-full w-full"
              >
                {product.images?.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="relative w-full h-full">
                      <Image
                        src={urlFor(img).width(1000).url()}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Masonry/Grid Gallery */}
            <div className="hidden lg:grid grid-cols-2 gap-1 p-1">
              {product.images?.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative bg-[#0a0a0a] overflow-hidden group ${
                    idx === 0 ? "col-span-2 aspect-16/10" : "aspect-3/4"
                  }`}
                >
                  <Image
                    src={urlFor(img).width(1400).url()}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white/50" strokeWidth={1} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS SECTION - Sticky Control */}
          <div className="lg:col-span-4 px-8 py-12 lg:px-12 lg:py-24">
            <div className="lg:sticky lg:top-32 space-y-12">
              
              <header className="space-y-4">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] text-white/30">
                  <Link href="/shop">Collection</Link>
                  <ChevronRight size={8} />
                  <span className="text-amber-200/60">{product.category?.title}</span>
                </div>
                <div className="flex justify-between items-start">
                  <h1 className="text-4xl font-serif italic tracking-tight leading-none">{product.name}</h1>
                  <button onClick={() => toggleFavorite(product)} className="text-white/20 hover:text-red-400 transition-colors">
                    <Heart size={20} fill={isFavorite(product._id) ? "currentColor" : "none"} strokeWidth={1} />
                  </button>
                </div>
                <p className="text-2xl font-serif text-amber-50/90">₦{product.price?.toLocaleString()}</p>
              </header>

              {/* ATELIER SELECTION UI */}
              <div className="space-y-10">
                {/* Color Selector */}
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Fabric Palette</span>
                  <div className="flex gap-4">
                    {product.colorOptions?.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor === c ? "border-white" : "border-transparent"
                        }`}
                      >
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: c }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Measurement</span>
                    <button className="text-[8px] uppercase tracking-widest text-amber-200/40 hover:text-amber-200 underline">View Chart</button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes?.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-3 text-[10px] transition-all border ${
                          selectedSize === s ? "bg-white text-black border-white font-bold" : "border-white/10 text-white/40 hover:border-white/30"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Action */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-px">
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-white text-black py-6 text-[11px] uppercase tracking-[0.4em] font-black hover:bg-amber-100 transition-all flex items-center justify-center gap-4 group"
                    >
                      <ShoppingBag size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                      Acquire Piece
                    </button>
                  </div>
                  <p className="text-[9px] text-center text-white/20 uppercase tracking-[0.2em]">Exclusively Tailored for GF DEUCHE</p>
                </div>
              </div>

              {/* Details Accordion (Minimal) */}
              <div className="pt-12 border-t border-white/5 space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-white/80 mb-2">Designer{"'"}s Note</h4>
                  <p className="text-[12px] leading-relaxed text-white/50 font-light">{product.description}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: MORE PIECES */}
        <section className="max-w-[1600px] mx-auto mt-32 px-6">
          <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-6">
            <h3 className="text-xs uppercase tracking-[0.6em] text-white/40">Complete the Look</h3>
            <Link href="/shop" className="text-[9px] uppercase tracking-widest text-amber-200/50 hover:text-amber-200">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {related.map((p) => (
              <Link href={`/shop/product/${p.slug?.current}`} key={p._id} className="group">
                <div className="aspect-3/4 relative overflow-hidden bg-[#0a0a0a] mb-4">
                  <Image
                    src={urlFor(p.image).width(500).url()}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h5 className="text-[9px] uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{p.name}</h5>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingButtonNav />
    </>
  );
}