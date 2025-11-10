"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 bg-black/90 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/Deuche Logo.png" // replace with your actual logo path
              alt="GF Deuche Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h2 className="text-xl font-semibold">GF Deuche</h2>
          </div>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Luxury & timeless fashion that adds class to your style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
            <li><Link href="/favorites" className="hover:text-white">Favorites</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-medium mb-3">Connect</h3>
          <div className="flex items-center gap-4 text-gray-300">
            <Link href="https://wa.me/2347088936896" target="_blank" aria-label="WhatsApp">
              <Image src="/whatsapp.png" alt="WhatsApp" width={50} height={50} />
            </Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-white transition" />
            </Link>
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-white transition" />
            </Link>
            <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-white transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Credit */}
      <div className="border-t border-white/10 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} GF Deuche. All rights reserved. <br />
        Built by{" "}
        <Link
          href="https://fastrivestudio.vercel.app"
          target="_blank"
          className="text-white hover:underline"
        >
          Fastrive Studio
        </Link>
      </div>
    </footer>
  );
}
