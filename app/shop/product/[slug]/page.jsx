"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Flame, Tag } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useStore } from "@/store/useStore";


import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";
import FloatingButtonNav from "@/components/FloatingBottomNav";
import Footer from "@/components/Footer";

export default function ProductPage() {
  const { slug } = useParams(); // next/navigation client page gets slug from search params
  // If you're using app router dynamic segment, you may get slug via useRouter or page props.
  // If this doesn't match your setup, replace with props-based data fetching.

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [activeImage, setActiveImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFavorite = useStore((s) => s.isFavorite);

  // Fetch product and related by slug
  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    (async () => {
      try {
        const query = `*[_type == "product" && slug.current == $slug][0]{
          _id,
          name,
          description,
          price,
          discountPrice,
          images,
          "imagesObj": images[]{..., asset->},
          colorOptions,
          sizes,
          tags,
          category-> { _id, title, "slug": slug.current },
          onSale,
          trending
        }`;

        const p = await client.fetch(query, { slug });

        if (!p) {
          setProduct(null);
          setLoading(false);
          return;
        }

        setProduct(p);
        setActiveImage(p.images?.[0] || null);

        // fetch related products (same category) - limit 10 (exclude self)
        const relatedQuery = `*[_type == "product" && defined(category) && category._ref == $catRef && slug.current != $slug][0...10]{
          _id,
          name,
          slug,
          price,
          discountPrice,
          images,
          "image": images[0].asset->
        }`;

        const relatedItems = p?.category
          ? await client.fetch(relatedQuery, { catRef: p.category._id, slug })
          : [];

        setRelated(relatedItems || []);
      } catch (err) {
        console.error("Product fetch error:", err);
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select color and size.");
      return;
    }

    const item = {
      _id: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice || null,
      quantity: qty,
      color: selectedColor,
      size: selectedSize,
      image: product.images?.[0] ? urlFor(product.images[0]).width(600).url() : null,
      slug: product.slug?.current || slug,
    };

    addToCart(item);
    toast.success("Added to cart");
  };

  const handleCheckoutWhatsApp = () => {
    const cart = useStore.getState().cart;
    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const total = cart.reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);

    const lines = cart.map((it, i) => {
      return `${i + 1}. ${it.name}
      Qty: ${it.quantity || 1}
      Color: ${it.colorOptions || "N/A"}
      Size: ${it.size || "N/A"}
      Price: ₦${(it.price || 0).toLocaleString()}`;
    });

    const message = `Hello 👋 I'd like to place an order:
    

    ${lines.join("\n\n")}

🧾 Total: ₦${total.toLocaleString()}`;

    const url = `https://wa.me/2347088936896?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Loading.....</div>
        <Toaster position="top-right" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Product not found</div>
        <Toaster position="top-right" />
      </main>
    );
  }

  // build image url safely
  const buildImage = (img) => {
    try {
      return img ? urlFor(img).width(1200).height(1200).url() : "/placeholder.jpg";
    } catch {
      return "/placeholder.jpg";
    }
  };

  console.log(product.colorOptions);

  return (
    <>
    <DesktopNavbar/>
    <MobileTopNav/>
    <main className="min-h-screen bg-black text-white px-4 md:px-12 py-8">
      <Toaster position="top-right" />

      {/* Top area */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Images: full width on mobile, left column on desktop */}
        <div className="md:col-span-7">
          <div className="rounded-2xl overflow-hidden mb-4">
            <Image
              src={buildImage(activeImage)}
              alt={product.name}
              width={1200}
              height={1200}
              className="object-cover w-full h-[420px] md:h-[600px] rounded-2xl"
            />
          </div>

          {/* thumbnails */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images?.map((img, idx) => {
              const thumb = buildImage(img);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImage(img);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`flex-shrink-0 rounded-lg overflow-hidden border ${activeImage === img ? "border-yellow-400" : "border-white/10"}`}
                >
                  <Image src={thumb} alt={`${product.name}-${idx}`} width={120} height={120} className="object-cover w-20 h-20" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Info & actions */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif">{product.name}</h1>
            <p className="text-sm text-gray-400 mt-2">{product.description}</p>
          </div>

          {/* Price block */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-semibold text-white">₦{product.price?.toLocaleString()}</div>
            {product.discountPrice && (
              <div className="text-sm text-gray-400 line-through">₦{product.discountPrice?.toLocaleString()}</div>
            )}
            {product.onSale && <div className="ml-2 px-2 py-1 bg-red-500 text-white rounded">Sale</div>}
            {product.trending && <div className="ml-2 px-2 py-1 bg-yellow-400 text-black rounded">Trending</div>}
          </div>

          {/* Colors (required) */}
          <div>
            <div className="text-sm text-gray-300 mb-2">Color</div>
            <div className="flex gap-2 items-center flex-wrap">
              {(product.colorOptions && product.colorOptions.length > 0) ? product.colorOptions.map((c) => (
                <button
                      key={product.id}
                      onClick={() => setSelectedColor(c)}
                      aria-label={`Select color ${c}`}
                      style={{ backgroundColor: c }}
                      className={`w-8 h-8 rounded-full border transition-all ${
                        selectedColor === c ? "ring-2 ring-offset-2 ring-black scale-110" : "border-neutral-300 hover:scale-105"
                      }`}
                    />
              )) : <div className="text-gray-500">No color options</div>}
            </div>
          </div>

          {/* Sizes (required) */}
          <div>
            <div className="text-sm text-gray-300 mb-2">Size</div>
            <div className="flex gap-2 items-center flex-wrap">
              {(product.sizes && product.sizes.length > 0) ? product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-3 py-2 rounded-full border ${selectedSize === s ? "bg-yellow-400 text-black border-yellow-400" : "bg-transparent text-white/90 border-white/10"}`}
                >
                  {s}
                </button>
              )) : <div className="text-gray-500">One size</div>}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/5 rounded">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2"
              >
                -
              </button>
              <div className="px-4">{qty}</div>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-400 text-black font-semibold py-3 rounded-full"
            >
              Add to Cart
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-2 flex-wrap">
            {product.tags?.map((t) => (
              <div key={t} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                {t}
              </div>
            ))}
          </div>

          {/* Heart toggle */}
          <div className="mt-2">
            <button
              onClick={() => {
                toggleFavorite({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0] ? urlFor(product.images[0]).width(400).url() : null,
                });
                toast.success("Toggled favorite");
              }}
              className="px-3 py-2 rounded-full border border-white/10"
            >
              <Heart className={`inline w-4 h-4 mr-2 ${isFavorite(product._id) ? "text-yellow-400" : "text-white"}`} />
              {isFavorite(product._id) ? "Favorited" : "Add to favorites"}
            </button>
          </div>

          {/* Checkout via WhatsApp
          <div className="mt-4">
            <button
              onClick={handleCheckoutWhatsApp}
              className="w-full bg-black border border-white/10 text-white py-3 rounded-full"
            >
              Checkout via WhatsApp
            </button>
          </div> */}
        </div>
      </div>

      {/* Related products slider */}
<section className="max-w-6xl mx-auto mt-16 px-4 md:px-0">
  <h3 className="text-xl font-semibold mb-4">You may also like</h3>

  <Swiper
    modules={[Autoplay]}
    slidesPerView={1.2}
    spaceBetween={12}
    breakpoints={{
      640: { slidesPerView: 2, spaceBetween: 16 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
    }}
    autoplay={{ delay: 2500, disableOnInteraction: false }}
    loop
  >
    {related.map((p) => (
      <SwiperSlide key={p._id} className="px-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative rounded-2xl overflow-hidden bg-white/10 shadow-md cursor-pointer"
          onClick={() => (window.location.href = `/shop/product/${p.slug?.current}`)}
        >
          {/* Product Image */}
          <div className="relative w-full h-60">
            <Image
              src={
                p.image ? urlFor(p.image).width(600).height(800).url() : "/placeholder.jpg"
              }
              alt={p.name}
              width={400}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-black/50">
            <div className="p-4 flex flex-col gap-2">
              <h4 className="text-sm md:text-base font-semibold line-clamp-1">
                {p.name}
              </h4>

              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-semibold">
                  ₦{p.price?.toLocaleString()}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent redirect
                    addToCart({
                      _id: p._id,
                      name: p.name,
                      price: p.price,
                      image: p.image
                        ? urlFor(p.image).width(400).url()
                        : null,
                      quantity: 1,
                    });
                    toast.success("Added to cart");
                  }}
                  className="px-3 py-1 bg-yellow-400 text-black rounded-full text-xs md:text-sm font-medium"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

    </main>
    <Footer/>
    <FloatingButtonNav/>
    </>
  );
}
