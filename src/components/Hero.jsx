

"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Link from "next/link";

// Brand Colors
const brandColor = "#422ad5";

export default function Hero() {
  const slides = [
    {
      headline: "Step Into Comfort & Style",
      subtitle: "Trendy shoes for Men, Women & Kids. Find your perfect pair today!",
      cta: "Shop All Collections",
      bg: "https://i.ibb.co.com/396jcVkC/Step-Into-Comfort-Style.webp",
      link: "/shop"
    },
    {
      headline: "Trendy Footwear for Modern Men",
      subtitle: "Sneakers, loafers & casual shoes made for daily comfort.",
      cta: "Shop Men's Shoes",
      bg: "https://i.ibb.co.com/0yxKsdwf/Trendy-Footwear-for-Modern-Men.png",
      link: "/men"
    },
    {
      headline: "Walk with Confidence & Elegance",
      subtitle: "Chic heels, sandals & everyday wear for women.",
      cta: "Shop Women's Shoes",
      bg: "https://i.ibb.co.com/7JKSVnFh/Walk-with-Confidence-Elegance.png",
      link: "/women"
    },
    {
      headline: "Shoes Built for Play",
      subtitle: "Durable & colorful footwear perfect for active kids.",
      cta: "Shop Kids Collection",
      bg: "https://i.ibb.co.com/VYccBnMN/Shoes-Built-for-Play.webp",
      link: "/kids"
    },
    {
      headline: "Discover the Latest Footwear Trends",
      subtitle: "Fresh arrivals updated weekly—don’t miss out!",
      cta: "Shop New Arrivals",
      bg: "https://i.ibb.co.com/8gmjhxXn/Discover-the-Latest-Footwear-Trends.webp",
      link: "/shop"
    }
  ];

  return (
    <div className="w-full h-[80vh] relative">
      <Swiper
        pagination={{ dynamicBullets: true }}
        modules={[Pagination]}
        className="w-full h-full custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full flex items-center justify-center bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content */}
              <div className="relative z-10 text-center text-white max-w-2xl px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.headline}
                </h1>
                <p className="text-lg md:text-xl mb-6 opacity-90">
                  {slide.subtitle}
                </p>

                <Link
                  href={slide.link}
                  className="inline-block px-8 py-3 text-lg font-semibold rounded-full"
                  style={{ backgroundColor: brandColor }}
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
