import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Lipstick",
    price: 299,
    image: "https://placehold.co/600x700?text=Lipstick",
  },
  {
    id: 2,
    name: "Necklace",
    price: 699,
    image: "https://placehold.co/600x700?text=Jewellery",
  },
  {
    id: 3,
    name: "Gift Box",
    price: 499,
    image: "https://placehold.co/600x700?text=Gift",
  },
  {
    id: 4,
    name: "Teddy Bear",
    price: 599,
    image: "https://placehold.co/600x700?text=Toy",
  },
];

function FeaturedProducts() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-14">
          Latest Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeaturedProducts;