"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, MessageCircle, House } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";

export default function BottomNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const cart = useStore((state) => state.cart);
  const favorites = useStore((state) => state.favorites);

  useEffect(() => {
    const controlNavbar = () => {
      // Small threshold to prevent flickering
      if (Math.abs(window.scrollY - lastScrollY) < 10) return;
      
      if (window.scrollY > lastScrollY && window.scrollY > 100) setVisible(false);
      else setVisible(true);
      
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const links = [
    { href: "/shop", icon: House, label: "Home" },
    { href: "/favorites", icon: Heart, label: "Saved", count: favorites?.length || 0 },
    { href: "/cart", icon: ShoppingBag, label: "Bag", count: cart?.length || 0 },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: -20, x: "-50%", opacity: 1 }} // Floating effect
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-1/2 z-[100] md:hidden 
                     w-[92%] max-w-[400px]"
        >
          <nav className="flex justify-around items-center py-3 px-4
                          bg-black/80 backdrop-blur-2xl 
                          border border-white/10 rounded-[2rem]
                          shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {links.map(({ href, icon: Icon, label, count }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className="relative flex flex-col items-center py-1 group">
                  <div className="relative p-2 rounded-full transition-colors duration-300">
                    <Icon 
                      size={20} 
                      strokeWidth={isActive ? 2 : 1.5} 
                      className={isActive ? "text-amber-200" : "text-white/60"} 
                    />
                    
                    {/* Minimalist Gold Badge */}
                    {count > 0 && (
                      <span className="absolute top-1 right-1 min-w-[14px] h-[14px] 
                                     flex items-center justify-center
                                     bg-amber-200 text-black text-[8px] font-black 
                                     rounded-full px-1 shadow-sm">
                        {count}
                      </span>
                    )}
                  </div>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 w-1 h-1 bg-amber-200 rounded-full"
                    />
                  )}
                  
                  <span className={`text-[9px] uppercase tracking-[0.1em] mt-0.5 
                                  ${isActive ? "text-white font-medium" : "text-white/40"}`}>
                    {label}
                  </span>
                </Link>
              );
            })}

            {/* WhatsApp - Integrated into style */}
            <a
              href="https://wa.me/2347088936896"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center py-1 group"
            >
              <div className="p-2">
                <MessageCircle size={20} strokeWidth={1.5} className="text-white/60 group-hover:text-white transition-colors" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.1em] mt-0.5 text-white/40 group-hover:text-white transition-colors">
                Chat
              </span>
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

