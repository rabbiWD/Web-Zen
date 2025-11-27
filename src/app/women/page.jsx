import ProductCard from '@/components/ProductCard'
import React from 'react'

export default async function Women() {
  const data = await fetch('https://footwear-api-six.vercel.app/api/products?category=women')
  const products = await data.json()
  // console.log(products)


  return (
    <div className='container mx-auto py-10'>
      <div className='text-center'>
        <h1 className="text-4xl font-bold mb-2">Footwear for Women</h1>
        <p className="text-gray-600 mb-8">From chic heels to everyday sneakers — find shoes that match your style and comfort.</p>

      </div>
      <div className='grid gap-5 grid-col-1 md:grid-cols-3 lg:grid-cols-4'>
        {
          products.map(product => (
            <ProductCard key={product._id} product={product}  ></ProductCard>
          ))
        }
      </div>
    </div>
  )
}
