import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatCurrency } from '../utils/formatCurrency'
import { useCart } from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <article className="group min-w-[220px] md:min-w-0">

      {/* Product Image + Add to Cart */}
      <div className="relative overflow-hidden rounded-lg bg-cream-card shadow-card transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-card-hover">

        {/* Product Image */}
        <Link
          to={`/product/${product.id}`}
          className="block"
        >
          <div className="aspect-square overflow-hidden p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="
            absolute
            bottom-4
            left-4
            right-4
            z-10

            rounded-lg
            bg-white
            py-3

            text-center
            text-sm
            font-medium
            text-[#211a14]

            shadow-md

            opacity-0
            translate-y-4

            transition-all
            duration-500
            ease-out

            group-hover:translate-y-0
            group-hover:opacity-100

            hover:bg-[#211a14]
            hover:text-white
          "
        >
          Add to Cart
        </button>
      </div>

      {/* Product Information */}
      <Link
        to={`/product/${product.id}`}
        className="block"
      >
        <div className="mt-3 px-1">
          <h3 className="font-serif text-[15px] leading-snug text-brown transition-colors duration-300 group-hover:text-gold-dark">
            {product.name}
          </h3>

          <p className="mt-1 text-sm font-semibold text-brown">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>

    </article>
  )
}

function Bestsellers() {
  return (
    <section
      className="py-16 md:py-20"
      id="bestsellers"
    >
      <div className="section-container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="section-heading">
            BestSellers
          </h2>

          <Link
            to="/collection"
            className="view-all-link"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Bestsellers