export default function Newsletter() {
return ( <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-center"> <div className="container mx-auto px-4"> <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Subscribe to Our Newsletter</h2> <p className="mb-8 text-lg drop-shadow-sm">Get exclusive offers and updates directly in your inbox.</p>

    <form className="flex flex-col md:flex-row justify-center gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="input input-bordered w-full md:w-96 bg-white text-gray-800 placeholder-gray-400 shadow-lg focus:ring-2 focus:ring-white focus:outline-none transition"
      />
      <button
        className="btn bg-white text-purple-600 font-bold hover:bg-purple-50 hover:text-purple-700 shadow-lg transition"
      >
        Subscribe
      </button>
    </form>
  </div>
</section>


);
}

