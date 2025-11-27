import Link from "next/link";

const categories = [
  { name: "Men", img: "https://i.ibb.co.com/hRPHvMk6/men.jpg", link: "/men" },
  { name: "Women", img: "https://i.ibb.co.com/DmQtX30/women.jpg", link: "/women" },
  { name: "Kids", img: "https://i.ibb.co.com/v6sZxkp8/kids.png", link: "/kids" },
];

export default function FeaturedCategories() {
  return (
    <section className="py-12 container mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.link} className="card bg-base-100 shadow hover:shadow-lg transition h-70">
            <figure><img src={cat.img} alt={cat.name} className="rounded-lg object-cover" /></figure>
            <div className="card-body items-center">
              <h3 className="card-title">{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
