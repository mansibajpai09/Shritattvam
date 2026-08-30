import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { products } from '../data/products'
import { formatCurrency } from '../utils/formatCurrency'

function Collection() {
  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />

      <main className="section-container py-10 md:py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
            ShriTatvam
          </p>

          <h1 className="mt-2 font-serif text-3xl text-brown sm:text-4xl">
            Our Collection
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-brown-muted">
            Discover thoughtfully selected pooja essentials,
            sacred fragrances and elegant spiritual products.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group min-w-0"
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-cream-card shadow-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-5 transition duration-500 group-hover:scale-105"
                />
              </div>

              <h2 className="mt-3 font-serif text-sm text-brown sm:text-base">
                {product.name}
              </h2>

              <p className="mt-1 text-sm font-semibold text-brown">
                {formatCurrency(product.price)}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Collection
