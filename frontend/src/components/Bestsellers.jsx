import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatCurrency } from '../utils/formatCurrency'

function ProductCard({ product }) {
  return (
    <article className="group min-w-[220px] md:min-w-0">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-cream-card shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover">
          <div className="aspect-square overflow-hidden p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="mt-3 px-1">
          <h3 className="font-serif text-[15px] leading-snug text-brown group-hover:text-gold-dark">
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