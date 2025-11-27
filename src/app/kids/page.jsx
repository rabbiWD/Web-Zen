import ProductCard from '@/components/ProductCard'
import React from 'react'

export default async function Kids() {
  const data = await fetch('https://footwear-api-six.vercel.app/api/products?category=kids')
  const products = await data.json()
  // console.log(products)


  return (
    <div className='container mx-auto py-10'>
      <div className='text-center'>
        <h1 className="text-4xl font-bold mb-2">Footwear for Kids</h1>
        <p className="text-gray-600 mb-8">From playful sneakers to durable everyday shoes — perfect for growing feet and active adventures.</p>

      </div>
      <div className='grid gap-5 grid-col-1 md:grid-cols-3 lg:grid-cols-4'>
        {
          products.map(product => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))
        }
      </div>
    </div>
  )
}
