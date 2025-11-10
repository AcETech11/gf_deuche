"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, User2 } from "lucide-react";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore"; // Import your store

export default function DesktopNavbar() {
  const { isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState(false);

  // Live counts from store
  const favorites = useStore((s) => s.favorites);
  const cart = useStore((s) => s.cart);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`hidden sm:flex w-full z-50 items-center justify-between px-6 md:px-10 lg:px-16 py-4 md:py-5 transition-all duration-500
        ${scrolled
          ? "fixed top-0 left-0 bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "relative bg-transparent"
        }`}
    >
      {/* === Left: Logo & Title === */}
      <div className="flex items-center gap-2 md:gap-3">
        <Image
          src="/Deuche Logo.png"
          alt="GF Deuche Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <h1 className="text-lg md:text-xl font-serif text-white tracking-wider md:tracking-widest whitespace-nowrap">
          GF Deuche <span className="md:hidden lg:inline">Collection</span> 
        </h1>
      </div>

      {/* === Center: Nav Links === */}
      <ul className="hidden sm:flex items-center gap-5 md:gap-8 lg:gap-10 text-xs md:text-sm font-medium text-gray-200">
        {[
          { href: "/shop", label: "Shop" },
          { href: "/favorites", label: "Favorites", count: favorites.length },
          { href: "/cart", label: "Cart", count: cart.length },
          { href: "/search", label: "Search" },
        ].map((link) => (
          <li key={link.href} className="relative group">
            <Link
              href={link.href}
              className="hover:text-yellow-400 transition-colors flex items-center gap-1"
            >
              {link.label}
              {link.count > 0 && (
                <span className="ml-1 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {link.count}
                </span>
              )}
            </Link>
            {/* Gold shimmer underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></span>
          </li>
        ))}

        {/* WhatsApp Chat */}
        <li className="relative group">
          <a
            href="https://wa.me/2348106535064?text=Hello%20I'm%20interested%20in%20ordering"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
          >
            <MessageCircle size={16} /> Chat
          </a>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-500 group-hover:w-full"></span>
        </li>
      </ul>

      {/* === Right: Clerk Auth === */}
      <div className="flex items-center">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/shop" />
        ) : (
          <SignInButton mode="modal">
            <button className="text-white hover:text-yellow-400 transition-colors flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <User2 size={18} />
              <span>Login</span>
            </button>
          </SignInButton>
        )}
      </div>
    </motion.nav>
  );
}





