
// app/components/TestimonialsSection.jsx
"use client";
import React, { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("https://footwear-api-six.vercel.app/api/testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="py-15 container mx-auto px-4 md:px-8 lg:px-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-brandColor">
        What Our Customers Say
      </h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={50} // space between slides
        pagination={{ dynamicBullets: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t._id}>
            <TestimonialCard testimonial={t} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
