function ProductCard({ image, name, price }) {
  return (
    <div className="bg-white rounded-3xl shadow hover:shadow-xl overflow-hidden transition">

      <img
        src={image}
        alt={name}
        className="w-full h-72 object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-semibold">
          {name}
        </h3>

        <p className="text-pink-600 font-bold text-lg mt-2">
          ₹{price}
        </p>

        <button className="mt-5 text-pink-600 font-semibold">
          View Details →
        </button>

      </div>

    </div>
  );
}

export default ProductCard;