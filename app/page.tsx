"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// ==== Slider Images ====
const leftSlider = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
];

const rightSlider = [
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/13.jpg",
  "/images/14.jpg",
  "/images/15.jpg",
  "/images/16.jpg",
  
];

export default function GFWelcome() {
  return (
    <section className="relative bg-black text-white h-screen pt-10 md:pt-0 lg:overflow-hidden">
      {/* === DESKTOP VIEW === */}
      <div className="hidden lg:grid grid-cols-3 w-full h-full mx-auto items-center gap-10 px-6 relative">
        {/* Left vertical slider */}
        <div className="relative h-[600px] overflow-hidden rounded-3xl">
          <Swiper
            direction="vertical"
            loop
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            slidesPerView={1}
            spaceBetween={20}
            modules={[Autoplay]}
            className="w-full h-full"
          >
            {leftSlider.map((src, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={src}
                  alt={`GF-left-${i}`}
                  width={400}
                  height={500}
                  className="rounded-2xl object-cover w-full h-full opacity-80"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Center content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-serif text-yellow-400 leading-tight"
          >
            GF Deuche Collection
          </motion.h1>

          <p className="text-gray-300 max-w-md mx-auto text-lg leading-relaxed">
            Redefining luxury fashion with timeless elegance, handcrafted detail, and
            unmatched sophistication.
          </p>

          {/* <div className="grid md:grid-cols-2 gap-8 text-left max-w-md mx-auto pt-6">
            <div>
              <h3 className="font-semibold text-yellow-400 mb-2">
                👗 Tailored Elegance
              </h3>
              <p className="text-gray-400">
                Every piece tells a story of precision, class, and grace.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-yellow-400 mb-2">
                💎 Premium Craftsmanship
              </h3>
              <p className="text-gray-400">
                Designed with detail and made for those who love sophistication.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-yellow-400 mb-2">
                🌍 For the Modern Woman
              </h3>
              <p className="text-gray-400">
                Bold, confident, and refined — fashion that empowers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-yellow-400 mb-2">
                ✨ Exclusive Luxury
              </h3>
              <p className="text-gray-400">
                A symbol of taste, poise, and high-end allure.
              </p>
            </div>
          </div> */}

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/shop"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 py-3 rounded-full text-lg transition-all"
            >
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>

        {/* Right vertical slider */}
        <div className="relative h-[600px] overflow-hidden rounded-3xl">
          <Swiper
            direction="vertical"
            loop
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            slidesPerView={1}
            spaceBetween={20}
            modules={[Autoplay]}
            className="w-full h-full"
          >
            {rightSlider.map((src, i) => (
              <SwiperSlide key={i}>
                <Image
                  src={src}
                  alt={`GF-right-${i}`}
                  width={400}
                  height={500}
                  className="rounded-2xl object-cover w-full h-full opacity-80"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* === MOBILE / TABLET VIEW === */}
            <div className="lg:hidden md:h-screen md:flex md:flex-col md:justify-center space-y-8">
              {/* Top Swiper - moves left */}
              <div>
                <Swiper
                  loop
                  speed={4000}
                  autoplay={{ delay: 0, disableOnInteraction: false }}
                  slidesPerView={2}
                  spaceBetween={15}
                  modules={[Autoplay]}
                >
                  {leftSlider.map((src, i) => (
                    <SwiperSlide key={i}>
                      <Image
                        src={src}
                        alt={`mobile-left-${i}`}
                        width={300}
                        height={300}
                        className="rounded-2xl object-cover w-full h-[200px] md:h-[400px] opacity-80"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
      
              {/* Bottom Swiper - moves right */}
              <div>
                <Swiper
                  loop
                  speed={4000}
                  autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    reverseDirection: true,
                  }}
                  slidesPerView={2}
                  spaceBetween={15}
                  modules={[Autoplay]}
                >
                  {rightSlider.map((src, i) => (
                    <SwiperSlide key={i}>
                      <Image
                        src={src}
                        alt={`mobile-right-${i}`}
                        width={300}
                        height={300}
                        className="rounded-2xl object-cover w-full h-[200px] md:h-[400px] opacity-80"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
      
              {/* Text Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mt-10"
              >
                <h2 className="text-3xl font-serif text-yellow-400 mb-4">
                  GF Deuche Collection
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-6">
                  Where sophistication meets artistry. Step into the world of elegance redefined.
                </p>
      
                <Link
                  href="/shop"
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full text-lg font-medium transition-all"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </div> 
          
      
      
    </section>
  );
}



