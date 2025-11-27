const brands = [
  "https://i.ibb.co.com/qMJKY8ZW/Screenshot-16.png",
  "https://i.ibb.co.com/TD79yZDh/Asics-Logo-svg.png",
  "https://i.ibb.co.com/0VRfBtsw/Screenshot-15.png",
  "https://i.ibb.co.com/vxNByYLX/puma.png",
  "https://i.ibb.co.com/CsP2M3z0/addidas.png",
];

export default function Brands() {
  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Trusted By</h2>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {brands.map((logo, index) => (
            <div
              key={index}
              className="
                p-4 rounded-2xl bg-white shadow
                transition-all duration-300 
                hover:scale-110 hover:shadow-xl hover:bg-base-100
                cursor-pointer
              "
            >
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
