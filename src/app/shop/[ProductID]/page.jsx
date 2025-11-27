

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function SingleProduct(props) {
  const { ProductID } = await props.params;

  const res = await fetch(`https://footwear-api-six.vercel.app/api/products/${ProductID}`, {
    cache: "no-store",
  });

  const product = await res.json();

  return (
    <div>
      <div className="container">
        <Link href={"/shop"} className="btn w-40 my-5 hover:btn-primary ml-15"> <ArrowLeft /> Back</Link>
      </div>

          <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* LEFT IMAGE */}
      <div className="relative flex justify-center items-center group">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-md rounded-xl shadow-lg transform transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge - Top Left */}
        {product.discount && (
          <span className="absolute top-2 left-2 badge bg-primary text-white">
            {product.discount}
          </span>
        )}

        {/* Best Seller Badge - Bottom Right */}
        {product.bestSeller && (
          <span className="absolute bottom-2 right-2 badge border-0 bg-green-500 text-white">
            Best Seller
          </span>
        )}
      </div>

      {/* RIGHT INFO */}
      <div className="space-y-5">
        
        {/* Views */}
        <p className="text-gray-500 text-sm">Views: {product.viewCount}</p>

        {/* Row 1: Title */}
        <h1 className="text-3xl font-bold">{product.title}</h1>

        {/* Row 2: Category + Price */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <p className="text-gray-600">
            Category: <span className="font-semibold">{product.category}</span>
          </p>
          <p className="text-2xl font-bold mt-2 md:mt-0">${product.price}</p>
        </div>

        {/* Row 3: Rating + Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-yellow-400 text-xl ${
                  i < Math.round(product.rating) ? "" : "opacity-30"
                }`}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-gray-600 text-sm">({product.rating})</span>
          </div>
          <p className="text-gray-600">
            Brand: <span className="font-medium">{product.brand}</span>
          </p>
        </div>

        {/* Row 4: Short Description */}
        <p className="text-gray-700">{product.description}</p>

        {/* Row 5: Sizes (selectable) */}
        <div>
          <h3 className="font-semibold mb-2">Available Sizes</h3>
          <div className="flex gap-2 flex-wrap">
            {product.sizes?.map((size) => (
              <button
                key={size}
                className="btn btn-sm btn-outline hover:btn-primary"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Row 6: Colors (selectable) */}
        <div>
          <h3 className="font-semibold mb-2">Colors</h3>
          <div className="flex gap-2">
            {product.color?.map((c) => (
              <span
                key={c}
                className="px-3 py-1 rounded-full bg-base-200 border text-sm cursor-pointer hover:bg-primary hover:text-white transition"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Row 7: Stock */}
        <p className="text-lg">
          Stock:{" "}
          <span
            className={`font-semibold ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? `${product.stock} Available` : "Out of Stock"}
          </span>
        </p>

        {/* Row 8: Add to Cart Button */}
        <button
          className="btn btn-primary w-full md:w-auto"
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
    </div>
  );
}

