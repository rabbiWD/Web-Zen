

"use client";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/Context/AuthContext";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const params = useParams(); // get dynamic route params
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  // Fetch product data
  useEffect(() => {
    if (!id || !user) return; // wait for id and user
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://footwear-api-six.vercel.app/api/products/${id}`);
        const data = await res.json();

        if (res.ok) {
          setProduct({
            title: data.title || "",
            image: data.image || "",
            category: data.category || "",
            price: data.price || 0,
            discount: data.discount || "",
            sizes: data.sizes || [],
            color: data.color || [],
            brand: data.brand || "",
            tags: data.tags || [],
            stock: data.stock || 0,
            sold: data.sold || 0,
            rating: data.rating || 0,
            viewCount: data.viewCount || 0,
            createdAt: data.createdAt ? data.createdAt.split("T")[0] : "",
            updatedAt: data.updatedAt ? data.updatedAt.split("T")[0] : "",
            bestSeller: data.bestSeller || false,
            shortDescription: data.shortDescription || "",
            fullDescription: data.fullDescription || "",
            wishlistedCount: data.wishlistedCount || 0,
          });
        } else {
          toast.error(data.error || "Failed to fetch product");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user]);

  // Show loading while checking auth
  if (authLoading) return <p className="text-center mt-10">Checking authentication...</p>;

  // Redirect placeholder while user is not logged in
  if (!user) return null;

  // Show loading while fetching product
  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProduct({ ...product, [name]: checked });
    } else if (name === "sizes" || name === "color" || name === "tags") {
      setProduct({ ...product, [name]: value.split(",").map((v) => v.trim()) });
    } else if (type === "number") {
      setProduct({ ...product, [name]: Number(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://footwear-api-six.vercel.app/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Product updated successfully!");
        router.push("/productmanage");
      } else {
        toast.error(data.error || "Failed to update product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating product");
    }
  };

  return (
    <div>
      <div className="my-6 text-center">
        <h2 className="text-2xl font-bold text-white">Edit Product</h2>
        <p className="text-white mt-2">Update product details below.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-6 space-y-6 rounded shadow-lg my-10"
      >
        {/* Title */}
        <div>
          <label className="text-gray-800 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Ex: Nike Air Zoom Pegasus 39"
            className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="text-gray-800 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Ex: https://i.ibb.co/qYrZbRbZ/Nike-Air-Zoom-Pegasus-39.png"
            className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
          />
        </div>

        {/* Category + Brand */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-800 font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Ex: Men"
              className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-800 font-semibold">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Ex: Nike"
              className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            />
          </div>
        </div>

        {/* Price + Discount */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-800 font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Ex: 120"
              className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-800 font-semibold">Discount</label>
            <input
              type="text"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Ex: 20% OFF"
              className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            />
          </div>
        </div>

        {/* Sizes + Colors */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-800 font-semibold">Sizes (comma separated)</label>
            <input
              type="text"
              name="sizes"
              value={product.sizes.join(", ")}
              onChange={handleChange}
              placeholder="Ex: 7, 8, 9, 10"
              className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-800 font-semibold">Colors (comma separated)</label>
            <input
              type="text"
              name="color"
              value={product.color.join(", ")}
              onChange={handleChange}
              placeholder="Ex: Red, Black, Blue"
              className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-gray-800 font-semibold">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={product.tags.join(", ")}
            onChange={handleChange}
            placeholder="Ex: running, lightweight, mesh"
            className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
          />
        </div>

        {/* Stock + Sold */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-gray-800 font-semibold">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Ex: 15"
              className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-800 font-semibold">Sold</label>
            <input
              type="number"
              name="sold"
              value={product.sold}
              onChange={handleChange}
              placeholder="Ex: 50"
              className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
            />
          </div>
        </div>

        {/* BestSeller */}
        <div>
          <label className="flex items-center space-x-2 text-gray-800 font-semibold">
            <input
              type="checkbox"
              name="bestSeller"
              checked={product.bestSeller}
              onChange={handleChange}
              className="checkbox checkbox-primary"
            />
            <span>Best Seller</span>
          </label>
        </div>

        {/* Short Description */}
        <div>
          <label className="text-gray-800 font-semibold">Short Description</label>
          <textarea
            name="shortDescription"
            value={product.shortDescription}
            onChange={handleChange}
            placeholder="Ex: Lightweight running shoes with breathable mesh"
            className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="text-gray-800 font-semibold">Full Description</label>
          <textarea
            name="fullDescription"
            value={product.fullDescription}
            onChange={handleChange}
            placeholder="Ex: Nike Air Zoom Pegasus 39 offers comfortable cushioning, breathable mesh upper, and durable outsole perfect for daily running."
            className="w-full p-2 rounded border border-gray-300 focus:border-[#422ad5] outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-3 rounded bg-[#422ad5] text-white font-semibold hover:bg-[#311a9b]"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
