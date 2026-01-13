"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function MobileTopNav() {
  const { isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed top-0 left-0 w-full z-[100] px-5 transition-all duration-500 md:hidden
        ${scrolled 
          ? "py-3 bg-black/80 backdrop-blur-xl border-b border-white/5" 
          : "py-5 bg-transparent"}`}
    >
      <div className="flex items-center justify-between relative">
        {/* Left: Search Action */}
        <Link href="/search" className="text-white/80 hover:text-white transition-colors">
          <Search size={20} strokeWidth={1.5} />
        </Link>

        {/* Center: Brand Identity */}
        <Link href="/shop" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Image
              src="/Deuche Logo.png"
              alt="GF Deuche Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white font-medium">
            GF Deuche
          </span>
        </Link>

        {/* Right: Clerk / Account */}
        <div className="flex items-center gap-4">
          <div className="text-white/80 hover:text-white transition-colors">
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/shop" 
                appearance={{ 
                  elements: { 
                    userButtonAvatarBox: "w-6 h-6 border border-white/10" 
                  } 
                }} 
              />
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center">
                  <User size={20} strokeWidth={1.5} />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
