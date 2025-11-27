"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";

// React Icons
import { FiEye, FiTrash2, FiStar, FiShoppingBag } from "react-icons/fi";
import { FaFireAlt } from "react-icons/fa";

export default function Page() {
  const { user, loading } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://footwear-api-six.vercel.app/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchProducts();
  }, []);

  if (!user) return null;

  // Delete handler
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#DC2626",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://footwear-api-six.vercel.app/api/products/${id}`,
          { method: "DELETE" }
        );

        if (!res.ok) {
          return Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Product not deleted.",
          });
        }

        setProducts(products.filter((item) => item._id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Product removed successfully.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong.",
        });
      }
    }
  };

  return (
    <div className="p-6 w-full">

      {/* Header Section */}
      <div className="my-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 flex justify-center items-center gap-2">
          <FiShoppingBag size={28} /> Manage Products
        </h2>
        <p className="text-gray-600 mt-2 text-sm">
          View, update, and delete your inventory in one place.
        </p>
      </div>

      <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        Total Products: <span className="text-blue-600">{products.length}</span>
      </h1>

      {/* ------------------------------------
           BEAUTIFUL MOBILE CARD DESIGN
      ------------------------------------- */}
      <div className="grid grid-cols-1 gap-5 md:hidden">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl border border-white/10"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-52 object-cover"
              />

              {/* Bestseller Badge */}
              {product.bestSeller && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  🔥 Best Seller
                </span>
              )}

              {/* Rating Badge */}
              <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                ⭐ {product.rating}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <h2 className="font-bold text-lg mb-1">{product.title}</h2>

              <div className="text-sm text-gray-300 space-y-1">
                <p>Category: {product.category}</p>
                <p>
                  Price:{" "}
                  <span className="text-yellow-400 font-semibold">
                    ${product.price}
                  </span>
                </p>
                <p>Stock: {product.stock}</p>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                <span>Views 👁 {product.viewCount}</span>
                <span>Sold 🛒 {product.sold}</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-5">
                <Link
                  href={`/productmanage/${product._id}`}
                  className="w-[48%] bg-blue-600 hover:bg-blue-700 transition rounded-xl py-2 flex items-center justify-center gap-1 text-white font-medium shadow-md"
                >
                  👁 View
                </Link>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="w-[48%] bg-red-600 hover:bg-red-700 transition rounded-xl py-2 flex items-center justify-center gap-1 text-white font-medium shadow-md"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------
           DESKTOP TABLE DESIGN
      ------------------------------------- */}
      <div className="hidden md:block overflow-x-auto w-full mt-6">
        <table className="table w-full border border-gray-200 rounded-xl">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sold</th>
              <th>Rating</th>
              <th>Best Seller</th>
              <th>Views</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td>
                  <img
                    src={product.image}
                    className="w-14 h-14 rounded-lg object-cover border"
                    alt={product.title}
                  />
                </td>

                <td className="font-semibold">{product.title}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.sold}</td>
                <td className="flex items-center gap-1">
                  {product.rating}{" "}
                  <FiStar size={14} className="text-yellow-500" />
                </td>

                <td>
                  {product.bestSeller ? (
                    <span className="text-yellow-600 font-semibold flex items-center gap-1">
                      <FaFireAlt size={14} /> Yes
                    </span>
                  ) : (
                    "No"
                  )}
                </td>

                <td>{product.viewCount}</td>

                <td>
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/productmanage/${product._id}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FiEye size={15} /> View
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"
                    >
                      <FiTrash2 size={15} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
