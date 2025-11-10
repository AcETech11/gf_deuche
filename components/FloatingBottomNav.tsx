"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, MessageCircle, Store } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore"; // your Zustand store

export default function BottomNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Zustand global state
  const cart = useStore((state) => state.cart);
  const favorites = useStore((state) => state.favorites);

  // Scroll hide/reveal behavior
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) setVisible(false);
      else setVisible(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  const links = [
    { href: "/shop", icon: Store, label: "Shop" },
    { href: "/favorites", icon: Heart, label: "Favorites", count: favorites?.length || 0 },
    { href: "/cart", icon: ShoppingCart, label: "Cart", count: cart?.length || 0 },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden 
          bg-black/60 backdrop-blur-md border-t border-white/10
          text-white flex justify-around items-center py-5 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
        >
          {links.map(({ href, icon: Icon, label, count }) => {
            const isActive = pathname === href;
            return (
              <Link key={href} href={href} className="flex flex-col items-center gap-1 relative">
                {isActive && (
                  <motion.div
                    layoutId="bubble"
                    className="absolute -top-2 w-10 h-10 rounded-full bg-primary backdrop-blur-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                <div className="relative z-10">
                  <Icon size={22} />
                  {/* ✅ Dynamic counter badge */}
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold rounded-full px-1.5 py-[1px]">
                      {count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] z-10 mt-1 font-semibold">{label}</span>
              </Link>
            );
          })}

          {/* WhatsApp */}
          <a
            href="https://wa.me/2348106535064?text=Hello%20I'm%20interested%20in%20ordering"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 relative"
          >
            <MessageCircle size={22} />
            <span className="text-[10px] mt-1 font-semibold">Chat</span>
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}


