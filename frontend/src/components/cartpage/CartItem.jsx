import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'
import QuantitySelector from './QuantitySelector'

function CartItem({ item }) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const { product, quantity } = item

  const lineTotal = product.price * quantity

  return (
    <div className="border-b border-brown/8 py-6 last:border-b-0">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_90px_120px_100px_20px] md:items-center md:gap-5">
        <div className="flex min-w-0 gap-4">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-brown/8 bg-cream-card sm:h-24 sm:w-24">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-2"
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-serif text-sm font-medium text-brown sm:text-base">
              {product.name}
            </h3>

            <p className="mt-1 text-xs text-brown-muted">
              {product.subtitle}
            </p>

            {product.inStock && (
              <p className="mt-2 text-xs text-sage-dark">
                ✓ In stock
              </p>
            )}

            <p className="mt-2 text-sm font-semibold text-brown md:hidden">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>

        <p className="hidden text-sm font-semibold text-brown md:block">
          {formatCurrency(product.price)}
        </p>

        <div className="flex items-center justify-between md:justify-center">
          <span className="text-xs text-brown-muted md:hidden">
            Quantity
          </span>

          <QuantitySelector
            quantity={quantity}
            onIncrease={() =>
              increaseQuantity(product.id)
            }
            onDecrease={() =>
              decreaseQuantity(product.id)
            }
          />
        </div>

        <div className="flex items-center justify-between md:justify-end">
          <span className="text-xs text-brown-muted md:hidden">
            Total
          </span>

          <span className="text-sm font-semibold text-brown">
            {formatCurrency(lineTotal)}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            removeFromCart(product.id)
          }
          className="absolute right-4 mt-[-90px] text-brown-muted/60 hover:text-red-700/70 md:static md:mt-0"
          aria-label={`Remove ${product.name}`}
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default CartItem