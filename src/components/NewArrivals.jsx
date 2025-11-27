
import { Eye } from "lucide-react";
import Link from "next/link";

// Server Component
export default async function BestSellersServer() {
  // Fetch new arrival products from your API
  const res = await fetch("https://footwear-api-six.vercel.app/api/products/new-arrivals", {
    cache: "no-store", // ensures fresh data on each request
  });

  const products = await res.json();

  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          // Determine if the product is new (added in last 7 days)
          const isNew = new Date(p.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

          return (
            <div
              key={p._id}
              className="card bg-base-100 shadow hover:shadow-lg transition flex flex-col"
            >
              <figure className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="rounded-lg w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                />
                {isNew && (
                  <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    New
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

                  <Link
                    href={`/shop/${p._id}`}
                    className="btn btn-outline btn-sm flex-1 flex items-center justify-center gap-1"
                  >
                    <Eye size={16} /> View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
