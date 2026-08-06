import { useState } from 'react'
import product1 from '../assets/placeholders/product-1.svg'
import product2 from '../assets/placeholders/product-2.svg'
import product3 from '../assets/placeholders/product-3.svg'
import product4 from '../assets/placeholders/product-4.svg'
import product5 from '../assets/placeholders/product-5.svg'
const products = [
  { id: 1, name: 'Divine Pooja Kit (Small)', price: '₹1,499', image: product1 },
  { id: 2, name: 'Sandalwood Incense', price: '₹349', image: product2 },
  { id: 3, name: 'Brass Lotus Diya', price: '₹899', image: product3 },
  { id: 4, name: 'Herbal Dhoop Sticks', price: '₹299', image: product4 },
  { id: 5, name: 'Brass Bell', price: '₹649', image: product5 },
]
function HeartIcon({ filled }) {
  return (
    <svg
      className={`h-[18px] w-[18px] transition-colors duration-300 ${filled ? 'fill-gold text-gold' : 'fill-none text-brown-muted hover:text-gold'}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}
function ProductCard({ product, isWishlisted, onToggleWishlist }) {
  return (
    <article className="group shrink-0 w-[220px] md:w-auto">
      <a href={`#product-${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-cream-card shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              onToggleWishlist(product.id)
            }}
            className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-1.5 backdrop-blur-sm transition-transform duration-300 hover:scale-110"
            aria-label={`Add ${product.name} to wishlist`}
          >
            <HeartIcon filled={isWishlisted} />
          </button>
          <div className="aspect-square overflow-hidden p-4">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="mt-3 px-1">
          <h3 className="font-serif text-[15px] leading-snug text-brown transition-colors duration-300 group-hover:text-gold-dark">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-brown">{product.price}</p>
        </div>
      </a>
    </article>
  )
}
function Bestsellers() {
  const [wishlist, setWishlist] = useState(new Set())
  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }
  return (
    <section className="py-16 md:py-20" id="bestsellers">
      <div className="section-container">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="section-heading">BestSellers</h2>
          <a href="#all-products" className="view-all-link">View All</a>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-5 md:overflow-visible md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.has(product.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
export default Bestsellers