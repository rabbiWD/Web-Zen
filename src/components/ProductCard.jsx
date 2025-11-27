"use client";

import React, { useState } from "react";
import { Heart, Star, Eye } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  // console.log(product)
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [wishlist, setWishlist] = useState(false);

  return (
    <div className=" bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]">

      {/* Row 0: Discount Badge + Wishlist */}
      <div className="relative">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 object-cover"
        />

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-primary text-white text-[11px] font-semibold px-2 py-[3px] rounded-md shadow">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button (Clickable) */}
        <button
          onClick={() => setWishlist(!wishlist)}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow transition hover:bg-white"
        >
          <Heart
            size={18}
            className={`transition duration-300 ${wishlist ? "text-red-500 fill-red-500" : "text-gray-700"
              }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-3">

        {/* Row 2: Title */}
        <h2 className="text-sm font-semibold leading-tight">{product.title}</h2>

        {/* Row 3: Category + Price */}
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-gray-500">{product.category}</p>
          <p className="text-base font-bold text-gray-900">${product.price}</p>
        </div>
        {/* description short */}
        <div className="text-[12px] text-gray-600 mt-1">
          {product.description.length > 50
            ? product.description.slice(0, 50) + "..."
            : product.description}
        </div>

        {/* Row 4: Sizes */}
        <div className="mt-3">
          <p className="text-[11px] text-gray-500 mb-1">Sizes:</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-[3px] text-[11px] rounded transition
                  ${selectedSize === size
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Row 5: Rating + Colors */}
        <div className="flex justify-between items-center mt-3">

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star size={15} fill="currentColor" />
            {product.rating}
          </div>

          {/* Color Select */}
          <div className="flex gap-2">
            {product.color.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-4 h-4 rounded-full border cursor-pointer transition
                  ${selectedColor === c
                    ? "ring-2 ring-black"
                    : "border-gray-300"
                  }`}
                style={{ backgroundColor: c.toLowerCase() }}
              />
            ))}
          </div>
        </div>

        {/* Row 6: Buttons */}
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary btn-xs flex-1">Add to Cart</button>
          <Link className="btn btn-outline btn-xs flex items-center gap-1 flex-1" href={`/shop/${product._id}`}>

            <Eye size={14} />View
          </Link>
          {/* 
          <button className="btn btn-outline btn-xs flex items-center gap-1 flex-1">
            <Eye size={14} />
            View
          </button> */}
        </div>

      </div>
    </div>
  );
}
