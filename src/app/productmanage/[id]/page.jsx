

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

export default function ProductStatusPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchProduct() {
            try {
                const res = await fetch(`https://footwear-api-six.vercel.app/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load product", error);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) return <p className="p-6 text-center">Loading product...</p>;
    if (!product) return <p className="p-6 text-center">Product not found</p>;


const handleDelete = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this product permanently?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1E40AF', 
        cancelButtonColor: '#EF4444', 
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            const res = await fetch(`https://footwear-api-six.vercel.app/api/products/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: data.message || 'Could not delete the product.',
                    confirmButtonColor: '#1E40AF',
                });
            }

            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Your product has been deleted.',
                confirmButtonColor: '#1E40AF',
            }).then(() => {
                window.location.href = "/productmanage";
            });

        } catch (error) {
            console.error("Delete error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong.',
                confirmButtonColor: '#1E40AF',
            });
        }
    }
};









    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* Back */}
            <Link href="/productmanage">
                <button className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
                    <ArrowLeft size={18} /> Back to Products
                </button>
            </Link>

            <div className="bg-white shadow-md rounded-xl p-6">

                {/* Product main */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="rounded-lg w-full object-cover"
                    />

                    <div>
                        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                        <p className="text-gray-600 mb-3">{product.description}</p>

                        <div className="space-y-2">
                            <p><strong>Brand:</strong> {product.brand}</p>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p><strong>Discount:</strong> {product.discount}</p>
                            <p><strong>Rating:</strong> ⭐ {product.rating}</p>
                            <p><strong>Stock:</strong> {product.stock}</p>

                            <p>
                                <strong>Sizes:</strong> {product.sizes?.join(", ") || "Not available"}
                            </p>

                            <p>
                                <strong>Colors:</strong> {product.color?.join(", ") || "Not available"}
                            </p>

                            <p>
                                <strong>Tags:</strong> {product.tags?.join(", ") || "No tags"}
                            </p>

                            <p><strong>Created:</strong> {product.createdAt}</p>
                            <p><strong>Updated:</strong> {product.updatedAt}</p>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Inventory Status */}
                    <div className="p-4 border rounded-lg">
                        <p className="font-semibold">Inventory Status</p>
                        <span
                            className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                                product.stock === 0
                                    ? "bg-red-100 text-red-700"
                                    : product.stock < 10
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
                            {product.stock === 0
                                ? "Out of Stock"
                                : product.stock < 10
                                ? "Low Stock"
                                : "In Stock"}
                        </span>
                    </div>

                    {/* Best Seller */}
                    <div className="p-4 border rounded-lg">
                        <p className="font-semibold">Best Seller</p>
                        <span
                            className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                                product.bestSeller
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            {product.bestSeller ? "Yes" : "No"}
                        </span>
                    </div>

                    {/* Views / Wishlist */}
                    <div className="p-4 border rounded-lg">
                        <p className="font-semibold">Engagement</p>
                        <p className="mt-2 text-sm"><strong>Views:</strong> {product.viewCount}</p>
                        <p className="text-sm"><strong>Wishlisted:</strong> {product.wishlistedCount}</p>
                        <p className="text-sm"><strong>Sold:</strong> {product.sold}</p>
                    </div>
                </div>

                {/* Added Buttons Here */}
                <div className="mt-8 flex gap-4">

                    {/* Edit Button */}
                    <Link href={`/productmanage/${id}/edit`}>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Edit Product
                        </button>
                    </Link>

                    {/* Delete Button */}
                    <button
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        Delete Product
                    </button>

                </div>
            </div>
        </div>
    );
}
