"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const total = cart.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 1), 0);

  const message = `*GF DEUCHE - NEW ORDER*%0A
--------------------------%0A
${cart.map((item, i) => `*(${item.quantity || 1}x)* ${item.name}%0A- Size: ${item.size || "N/A"}%0A- Price: ₦${item.price?.toLocaleString()}%0A`).join("%0A")}
--------------------------%0A
*TOTAL: ₦${total.toLocaleString()}*%0A
_Please confirm availability for these pieces._`;

  return (
    <>
      <DesktopNavbar />
      <MobileTopNav />
      
      <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <header className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.5em] text-amber-200/50 mb-2 block">Your Selection</span>
            <h1 className="text-4xl md:text-5xl font-serif italic">Shopping Bag</h1>
          </header>

          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="py-32 flex flex-col items-center justify-center border border-white/5 bg-white/[0.01]"
              >
                <ShoppingBag size={48} strokeWidth={1} className="text-white/20 mb-6" />
                <h2 className="text-xl font-serif text-white/60 mb-8 text-center">Your bag is currently empty.</h2>
                <Link href="/shop" className="text-[11px] uppercase tracking-[0.3em] px-8 py-4 bg-white text-black font-bold hover:bg-amber-100 transition-colors">
                  Return to Collection
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Items List */}
                <div className="lg:col-span-8 space-y-8">
                  {cart.map((item) => (
                    <motion.div
                      layout
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-6 pb-8 border-b border-white/5"
                    >
                      <div className="w-24 h-32 relative bg-[#111] overflow-hidden shrink-0">
                        <Image
                          src={typeof item.image === "string" ? item.image : item.image?.url || "/placeholder.jpg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-[13px] uppercase tracking-widest font-medium mb-1">{item.name}</h3>
                            <p className="text-[11px] text-white/40 uppercase tracking-tighter">Size: {item.size || "Standard"}</p>
                          </div>
                          <p className="text-sm font-serif text-amber-100/80">₦{item.price?.toLocaleString()}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-white/10 px-2 py-1 gap-4">
                            <button onClick={() => decreaseQty(item._id)} className="text-white/40 hover:text-white transition-colors"><Minus size={14}/></button>
                            <span className="text-[12px] font-medium w-4 text-center">{item.quantity || 1}</span>
                            <button onClick={() => increaseQty(item._id)} className="text-white/40 hover:text-white transition-colors"><Plus size={14}/></button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-[10px] uppercase tracking-widest text-white/20 hover:text-red-400 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={14} strokeWidth={1.5} /> Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <button onClick={() => clearCart()} className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">
                    Empty Selection
                  </button>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit bg-white/[0.02] border border-white/5 p-8">
                  <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-8">Summary</h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-xs tracking-widest text-white/60">
                      <span>Subtotal</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs tracking-widest text-white/60">
                      <span>Shipping</span>
                      <span className="text-[9px] uppercase italic">Calculated at checkout</span>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Total</span>
                      <span className="text-2xl font-serif text-amber-100">₦{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/2347088936896?text=${message}`}
                    target="_blank"
                    className="flex items-center justify-center gap-3 w-full bg-white text-black py-5 text-[11px] uppercase tracking-[0.3em] font-black hover:bg-amber-100 transition-all group"
                  >
                    Checkout <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="mt-6 text-[9px] text-center text-white/30 leading-relaxed uppercase tracking-wider">
                    Secure checkout via WhatsApp. Our concierge will confirm your order details shortly.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
      <FloatingButtonNav />
    </>
  );
}
