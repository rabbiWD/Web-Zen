export default function Newsletter() {
  return (
    <section className="py-12 bg-primary text-white text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6">Get exclusive offers and updates directly in your inbox.</p>
        <form className="flex flex-col md:flex-row justify-center gap-4">
          <input type="email" placeholder="Enter your email" className="input input-bordered w-full md:w-80" />
          <button className="btn btn-secondary">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
