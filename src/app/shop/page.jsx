

"use client";

import ProductCard from '@/components/ProductCard';
import React, { useState, useEffect } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch('https://footwear-api-six.vercel.app/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [search, category, products]);

  return (
    <div className='container mx-auto py-10'>
      <div className='text-center mb-8'>
        <h1 className="text-4xl font-bold mb-2">All Products</h1>
        <p className="text-gray-600 mb-2">Browse our full collection and find your perfect match.</p>
        <p className="text-gray-500 mb-6">
          Total Products: <span className="font-semibold text-primary">{filteredProducts.length}</span>
        </p>

        <div className='flex flex-col md:flex-row justify-center gap-4 mb-8'>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='border border-gray-300 rounded px-4 py-2 w-full md:w-64'
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border border-white text-gray-300 rounded px-4 py-2 w-full md:w-64'
          >
            <option value="all">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
      </div>

      <div className='grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
