// const products = [
//   { name: "Running Shoes", price: "$99", img: "/images/shoe1.jpg" },
//   { name: "Casual Sneakers", price: "$79", img: "/images/shoe2.jpg" },
//   { name: "Formal Shoes", price: "$120", img: "/images/shoe3.jpg" },
// ];

// export default function BestSellers() {
//   return (
//     <section className="py-12 container mx-auto">
//       <h2 className="text-3xl font-bold mb-8 text-center">Best Sellers</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.map((p) => (
//           <div key={p.name} className="card bg-base-100 shadow hover:shadow-lg transition">
//             <figure><img src={p.img} alt={p.name} className="rounded-lg" /></figure>
//             <div className="card-body items-center text-center">
//               <h3 className="card-title">{p.name}</h3>
//               <p className="text-lg font-semibold">{p.price}</p>
//               <button className="btn btn-primary mt-2">Add to Cart</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }









// app/components/BestSellersServer.jsx
import { Eye } from "lucide-react";
import Link from "next/link";
// Server Component
export default async function BestSellersServer() {
  // Fetch best seller products from your API
  const res = await fetch("https://footwear-api-six.vercel.app/api/products/best-sellers", {
    cache: "no-store", // ensures fresh data on each request
  });

  const products = await res.json();

  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Best Sellers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.title}
            className="card bg-base-100 shadow hover:shadow-lg transition flex flex-col"
          >
            <figure className="relative overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="rounded-lg w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
              />
              {p.bestSeller && (
                <span className="absolute bottom-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Best Seller
                </span>
              )}
            </figure>

            <div className="card-body flex-1 flex flex-col items-center text-center">
              <h3 className="card-title">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.category}</p>
              <div className="flex items-center justify-center mt-1 gap-2">
                <span className="text-lg font-bold">${p.price}</span>
                {p.discount && (
                  <span className="text-sm text-red-500 font-semibold">
                    {p.discount}
                  </span>
                )}
              </div>
              <p className="text-yellow-400 mt-1">{p.rating} ★</p>

              <div className="mt-auto flex flex-col sm:flex-row gap-2 w-full">
                <button className="btn btn-primary btn-sm flex-1">Add to Cart</button>
                <Link  href={`/shop/${p._id}`} className="btn btn-outline btn-sm flex-1 flex items-center justify-center gap-1">
                  <Eye size={16} /> View Details
                </Link>
                {/* <button className="btn btn-outline btn-sm flex-1 flex items-center justify-center gap-1">
                  <Eye size={16} /> View Details
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
