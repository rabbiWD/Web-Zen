// app/components/TestimonialCard.jsx
import React from "react";
import { Star, Quote } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="relative bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
      
      {/* Quote Icon */}
      <Quote className="w-6 h-6 text-gray-300 mb-4" />

      {/* Testimonial Text */}
      <p className="text-gray-700 italic mb-6">"{testimonial.testimonial}"</p>

      {/* Footer: Profile + Rating/Location */}
      <div className="flex justify-between items-center mt-auto">
        
        {/* Left: Profile */}
        <div className="flex items-center gap-3">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{testimonial.name}</span>
            <span className="text-sm text-gray-500">{testimonial.role}</span>
          </div>
        </div>

        {/* Right: Rating + Location */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: testimonial.rating }).map((_, idx) => (
              <Star key={idx} className="text-yellow-400 w-4 h-4" />
            ))}
          </div>
          <span className="text-sm text-gray-400">{testimonial.location}</span>
        </div>

      </div>
    </div>
  );
}
