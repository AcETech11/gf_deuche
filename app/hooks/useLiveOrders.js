"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { client } from "@/sanity/lib/client";

// ⏱ Between 15s and 45s before next fake order toast
const randomDelay = () => Math.floor(Math.random() * (45000 - 15000) + 15000);
const randomQuantity = () => Math.floor(Math.random() * 3) + 1;

// 🕒 More natural random time (seconds or minutes)
const randomTime = () => {
  const isMinutes = Math.random() < 0.3; // 30% chance it's minutes
  const value = isMinutes
    ? Math.floor(Math.random() * 10) + 1 // 1–10 minutes
    : Math.floor(Math.random() * 50) + 5; // 5–55 seconds
  const unit = isMinutes ? "minute" : "second";
  return { value, unit };
};

export function useLiveOrders() {
  const [products, setProducts] = useState([]);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(`*[_type == "product" && defined(slug.current)]{
        _id,
        name,
        "slug": slug.current
      }`);
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  // Trigger fake live orders
  useEffect(() => {
    if (!products.length) return;

    const showOrder = () => {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = randomQuantity();
      const { value, unit } = randomTime();

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-slideIn" : "animate-slideOut"
            } bg-white text-black shadow-xl rounded-lg p-3 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full md:w-[350px] border border-gray-200`}
          >
            <div className="flex-1 text-sm text-center md:text-left">
              <strong>{quantity} piece{quantity > 1 ? "s" : ""}</strong> of{" "}
              <span className="font-medium">{product.name}</span> was ordered{" "}
              {value} {unit}{value > 1 ? "s" : ""} ago
            </div>
          </div>
        ),
        {
          duration: 4000,
          position:
            typeof window !== "undefined" && window.innerWidth < 768
              ? "bottom-center"
              : "bottom-left",
        }
      );

      // Re-run after a random delay
      setTimeout(showOrder, randomDelay());
    };

    const timeout = setTimeout(showOrder, randomDelay());
    return () => clearTimeout(timeout);
  }, [products]);
}
