"use client";

import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity - 5 Columns */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-white/10 group-hover:border-amber-200/50 transition-colors">
                <Image
                  src="/Deuche Logo.png"
                  alt="GF Deuche Logo"
                  fill
                  className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                />
              </div>
              <div>
                <h2 className="text-xl font-serif tracking-widest uppercase italic">GF Deuche</h2>
                <p className="text-[9px] tracking-[0.4em] text-amber-200/50 uppercase">Maison de Couture</p>
              </div>
            </Link>
            <p className="max-w-sm text-sm text-white/40 leading-relaxed font-light">
              Crafting luxury and timeless silhouettes for the modern connoisseur. 
              Our pieces are a testament to class, heritage, and the art of fine dressing.
            </p>
          </div>

          {/* Navigation - 3 Columns */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">The House</h3>
            <ul className="space-y-4">
              {["Shop", "Collections", "Archive", "Favorites", "Cart"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-xs uppercase tracking-widest text-white/60 hover:text-amber-100 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect - 4 Columns */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">Connect</h3>
            <p className="text-xs text-white/40 leading-relaxed mb-4">
              Join the inner circle for exclusive access to private drops and editorial releases.
            </p>
            <div className="flex items-center gap-6">
              <Link href="https://wa.me/2347088936896" target="_blank" className="hover:text-amber-200 transition-colors">
                <MessageCircle size={20} strokeWidth={1.5} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-amber-200 transition-colors">
                <Instagram size={20} strokeWidth={1.5} />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="hover:text-amber-200 transition-colors">
                <Facebook size={20} strokeWidth={1.5} />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-amber-200 transition-colors">
                <Twitter size={20} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            © {new Date().getFullYear()} GF Deuche. All Rights Reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white transition-colors">Terms</Link>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
              Coded by <Link href="https://fastrivestudio.vercel.app" target="_blank" className="text-white/40 hover:text-amber-100 transition-colors italic">Fastrive Studio</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}