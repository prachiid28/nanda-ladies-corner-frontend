function Hero() {
  return (
    <section className="relative">

      <img
        src="https://placehold.co/1600x700"
        alt="Banner"
        className="w-full h-[650px] object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center">

        <div className="max-w-7xl mx-auto px-8 text-white">

          <p className="uppercase tracking-[6px] mb-3">
            Welcome To
          </p>

          <h1 className="text-6xl font-bold mb-6">
            Nanda Ladies Corner
          </h1>

          <p className="text-xl max-w-xl mb-8">
            Makeup • Jewellery • Gifts • Toys • Handbags • Accessories
          </p>

          <button className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-full transition">
            Explore Collection
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;