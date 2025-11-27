



"use client";

import { useState, useEffect, useContext } from "react";
import { Eye, Trash, Star } from "lucide-react";
import { AuthContext } from '@/Context/AuthContext';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";



export default function Page() {
    const { user, loading } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const router = useRouter();
    // Redirect safely after knowing user status
    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);



    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const res = await fetch("https://footwear-api-six.vercel.app/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    }, []);



    if (!user) return null; 




    const handleDelete = async (id) => {
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

                if (!res.ok) {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Could not delete the product.',
                        confirmButtonColor: '#1E40AF',
                    });
                }

                // Remove from UI
                setProducts(products.filter((product) => product._id.toString() !== id));

                MySwal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Your product has been deleted.',
                    confirmButtonColor: '#1E40AF',
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
        <div className="p-6">

            <div className="my-6 text-center">
                <h2 className="text-2xl font-bold text-white">Manage Your Products</h2>
                <p className="text-gray-400 mt-2">View, edit, or delete your products from the list below.</p>
            </div>

            <h1 className="text-3xl font-bold mb-6 text-center">Total Products <span>({products.length})</span> </h1>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {products.map((product) => (
                    <div key={product._id} className="card bg-base-100 p-4 border border-base-300 rounded-xl">
                        <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.title} className="w-20 h-20 rounded-lg object-cover" />
                            <div>
                                <h2 className="font-semibold text-lg">{product.title}</h2>
                                <p className="text-sm opacity-70">Category: {product.category}</p>
                                <p className="text-sm opacity-70">Price: ${product.price}</p>
                                <p className="text-sm opacity-70">Stock: {product.stock}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button className="btn btn-primary btn-sm flex items-center gap-1 text-white">
                                <Eye size={15} /> View
                            </button>
                            <button
                                className="btn btn-error btn-sm flex items-center gap-1 text-white"
                                onClick={() => handleDelete(product._id)}
                            >
                                <Trash size={15} /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto w-full">
                <table className="table table-zebra table-compact w-full">
                    <thead>
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
                            <tr key={product._id}>
                                <td>
                                    <img src={product.image} alt={product.title} className="w-14 h-14 rounded-lg object-cover border" />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.sold}</td>
                                <td className=" font-semibold">
                                    {product.rating} <Star className="inline" size={14} />
                                </td>
                                <td>{product.bestSeller ? "Yes" : "No"}</td>
                                <td>{product.viewCount}</td>
                                <td>
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/productmanage/${product._id}`} className="btn btn-primary btn-sm flex items-center gap-1 text-white">
                                            <Eye size={15} /> View
                                        </Link>
                                        <button
                                            className="btn bg-red-500 btn-sm flex items-center gap-1 text-white"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <Trash size={15} /> Delete
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