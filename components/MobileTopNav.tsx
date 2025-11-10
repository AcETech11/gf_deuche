"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function MobileTopNav() {
  const { isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-full z-50 px-4 py-2 flex items-center justify-between md:hidden
        backdrop-blur-xl border-b border-white/10
        transition-all duration-300
        ${scrolled ? "fixed top-0 bg-black/60" : "relative bg-transparent"}`}
    >
      {/* Left: Search */}
      <Link href="/search" className="text-white">
        <Search size={22} />
      </Link>

      {/* Center: Logo + Text */}
      <div className="flex gap-2 items-center justify-center">
        <Image
          src="/Deuche Logo.png"
          alt="GF Deuche Logo"
          width={28}
          height={28}
          className="object-contain"
        />
        <span className="text-[12px] font-semibold text-white tracking-widest">
          GF Deuche
        </span>
      </div>

      {/* Right: Clerk Login / User */}
      <div className="text-white">
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/shop" appearance={{ elements: { userButtonAvatarBox: "w-7 h-7" } }} />
        ) : (
          <SignInButton mode="modal">
            <button>
              <User size={22} />
            </button>
          </SignInButton>
        )}
      </div>
    </motion.nav>
  );
}
