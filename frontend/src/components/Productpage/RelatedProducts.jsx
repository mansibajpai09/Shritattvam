import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { formatCurrency } from '../../utils/formatCurrency'

function RelatedProducts({ currentProductId }) {
  const relatedProducts = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 3)

  if (!relatedProducts.length) return null

  return (
    <section className="mt-16 border-t border-stone-100 pt-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl text-stone-950">
          You May Also Like
        </h2>

        <Link
          to="/collection"
          className="hidden text-sm text-stone-700 hover:text-[#9b681f] sm:block"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group"
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-[#f5eee4]">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-105"
              />
            </div>

            <h3 className="mt-3 text-sm text-stone-800">
              {product.name}
            </h3>

            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="font-semibold text-stone-950">
                {formatCurrency(product.price)}
              </span>

              <span className="text-xs text-stone-600">
                ★ {product.rating}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts