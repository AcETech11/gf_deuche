"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Trash, ShoppingCartIcon } from "lucide-react";

import Footer from "@/components/Footer";
import FloatingButtonNav from "@/components/FloatingBottomNav";
import DesktopNavbar from "@/components/DesktopNavbar";
import MobileTopNav from "@/components/MobileTopNav";

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const clearCart = useStore((s) => s.clearCart);
  const increaseQty = useStore((s) => s.increaseQty);
  const decreaseQty = useStore((s) => s.decreaseQty);

  // ✅ Calculate total
  const total = cart.reduce(
    (sum, p) => sum + (p.price || 0) * (p.quantity || 1),
    0
  );

  // ✅ WhatsApp message (with images shown as thumbnails)
  const message = `Hello 👋 I'd like to place an order:

${cart
    .map(
      (item, i) =>
        `${i + 1}. ${item.name}
- Price: ₦${item.price}
- Quantity: ${item.quantity || 1}
- Color: ${item.color || "N/A"}
- Size: ${item.size || "N/A"}`
    )
    .join("\n\n")}

🧾 Total: ₦${total.toLocaleString()}

🖼️ Product Images:
${cart
    .map(
      (item) =>
        item.image ? `🛍️ ${item.name}: ${item.image}` : ""
    )
    .filter(Boolean)
    .join("\n")}
`;

  return (
    <>
    <DesktopNavbar/>
    <MobileTopNav/>
    <main className="min-h-screen bg-black text-white px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-2xl mb-6 font-montserrat">{`${cart.length} Items in Your Cart`}</h1>

      {cart.length === 0 ? (
        <div className="w-full h-[400px] flex flex-col items-center justify-center gap-5">
          <span className="text-3xl font-cormorantGaramond"><ShoppingCartIcon size={200}/></span>
          <h1 className="text-4xl font-semibold">Your Cart Look's empty.{" "}</h1>
          <Link href="/shop" className="border border-white rounded-full px-6 py-2 bg-primary font-semibold hover:bg-white hover:text-primary animate-bounce mt-10">
            Shop now
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white/5 rounded-2xl p-3"
              >
                <div className="w-24 h-24 relative shrink-0">
                  <Image
                    src={
                      typeof item.image === "string"
                        ? item.image
                        : item.image?.url || "/placeholder.jpg"
                    }
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                <div className="flex-1 w-full">
                  <div className="flex justify-between flex-wrap">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="text-sm font-medium">
                      ₦{(item.price || 0).toLocaleString()}
                    </div>
                  </div>

                  {/* <p className="text-sm text-gray-300 line-clamp-2">
                    {item.description || ""}
                  </p> */}

                  {(item.color || item.size) && (
                    <div className="mt-1 text-sm text-gray-400">
                      {item.color && <span>Color: {item.color}</span>}
                      {item.size && (
                        <span className="ml-3">Size: {item.size}</span>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                    >
                      -
                    </button>
                    <div className="min-w-[24px] text-center">
                      {item.quantity || 1}
                    </div>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-auto text-red-400 text-sm hover:text-red-300 flex gap-1 items-center"
                    >
                      <Trash size={16} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Summary */}
          <div className="w-full mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <button
              onClick={() => clearCart()}
              className="text-sm text-gray-400 hover:text-gray-200"
            >
              Clear Cart
            </button>

            <div className="text-right">
              <div className="text-sm text-gray-300">Total</div>
              <div className="text-2xl font-semibold">
                ₦{total.toLocaleString()}
              </div>

              <a
                href={`https://wa.me/2347088936896?text=${encodeURIComponent(
                  message
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 bg-primary text-black px-5 py-2 rounded-lg font-medium hover:bg-yellow-300"
              >
                Checkout via WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </main>
    <Footer/>
    <FloatingButtonNav/>
    </>
  );
}
