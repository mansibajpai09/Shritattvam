import ProductFeatures from './ProductFeatures'
import ProductActions from './ProductActions'
import { formatCurrency } from '../../utils/formatCurrency'

function ProductInfo({ product }) {
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-0.5 text-[#c48421]">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>★</span>
          ))}
        </div>

        <span className="text-sm font-medium">
          {product.rating}
        </span>

        <span className="text-sm text-stone-500">
          ({product.reviews} reviews)
        </span>
      </div>

      <h1 className="font-serif text-3xl leading-tight text-stone-950 sm:text-4xl">
        {product.name}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="text-2xl font-semibold text-stone-950">
          {formatCurrency(product.price)}
        </span>

        {product.originalPrice && (
          <span className="text-base text-stone-400 line-through">
            {formatCurrency(product.originalPrice)}
          </span>
        )}

        {product.discount > 0 && (
          <span className="rounded-md bg-[#f5eee3] px-3 py-1 text-xs font-semibold">
            {product.discount}% OFF
          </span>
        )}
      </div>

      <p className="mt-5 max-w-xl text-sm leading-7 text-stone-700">
        {product.description}
      </p>

      <div className="mt-5">
        <ProductFeatures
          features={product.features}
        />
      </div>

      <div className="mt-7">
        <ProductActions product={product} />
      </div>
    </div>
  )
}

export default ProductInfo