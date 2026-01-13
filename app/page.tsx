"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const images = [
  "/images/1.jpg", "/images/2.jpg", "/images/3.jpg", 
  "/images/4.jpg", "/images/10.jpg", "/images/11.jpg"
];

export default function GFPremiumWelcome() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} className="relative bg-[#080808] text-[#F4F4F4] min-h-screen w-full overflow-hidden">
      
      {/* 1. THE EDITORIAL BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 flex justify-center items-center opacity-20 pointer-events-none">
        <h1 className="text-[25vw] font-serif leading-none select-none tracking-tighter text-white/5 uppercase">
          Deuche
        </h1>
      </div>

      {/* 2. THE FLOATING MASONRY (Replaces the Sliders) */}
      <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
        <motion.div style={{ y }} className="relative w-full h-full">
          {/* Top Left Image */}
          <div className="absolute top-[10%] left-[5%] w-[250px] h-[350px] border border-white/10 p-2 backdrop-blur-sm">
            <Image src="/images/1.jpg" fill alt="Couture 1" className="object-cover" />
          </div>
          {/* Bottom Right Image */}
          <div className="absolute bottom-[10%] right-[8%] w-[280px] h-[400px] border border-white/10 p-2 backdrop-blur-sm">
            <Image src="/images/12.jpg" fill alt="Couture 2" className="object-cover" />
          </div>
          {/* Subtle Accent Image */}
          <div className="absolute top-[15%] right-[15%] w-[180px] h-[250px] opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <Image src="/images/5.jpg" fill alt="Couture 3" className="object-cover" />
          </div>
        </motion.div>
      </div>

      {/* 3. THE CENTERPIECE (The Brand Soul) */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="inline-block text-[10px] tracking-[0.8em] uppercase text-amber-200/40 mb-6 px-4 py-1 border border-amber-200/20 rounded-full">
            The 2026 Collection
          </span>
          
          <h2 className="text-7xl md:text-[120px] font-serif font-light leading-[0.85] tracking-tighter mb-10">
            GF DEUCHE <br />
            <span className="italic text-amber-100/90 font-light">COLLECTIONS</span>
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
            <Link href="/shop" className="group relative px-14 py-5 bg-white text-black overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em]">
                Enter The Shop
              </span>
              <div className="absolute inset-0 bg-amber-100 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
            </Link>

            <Link href="/shop" className="group flex items-center gap-4 text-white/60 hover:text-white transition-colors duration-300">
              <span className="text-[11px] uppercase tracking-[0.3em]">View Lookbook</span>
              <div className="w-10 h-[1px] bg-white/20 group-hover:w-16 transition-all duration-500" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 4. THE FOOTER NAVIGATION (Luxury sites often have bottom-bar links) */}
      <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-end z-30">
        <div className="hidden md:block">
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/30">Lagos • Paris • London</p>
        </div>
        
        {/* Decorative Scroll Indicator */}
        <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-amber-200/40 rotate-90 mb-8">Scroll</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-amber-200/50 to-transparent" />
        </div>

        <div className="flex gap-6">
           {["Instagram", "WhatsApp"].map((social) => (
             <a key={social} href="#" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-amber-100 transition-colors">
               {social}
             </a>
           ))}
        </div>
      </div>

      {/* 5. THE MOBILE OVERLAY (Simplified but still Premium) */}
      <div className="lg:hidden absolute inset-0 z-0">
        <Image src="/images/2.jpg" fill alt="bg-mobile" className="object-cover opacity-30 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
      </div>

    </section>
  );
}



