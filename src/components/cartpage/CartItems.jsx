import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'

function CartItems() {
  const { cartItems } = useCart()

  return (
    <div>
      <div className="hidden border-b border-brown/8 pb-3 md:grid md:grid-cols-[minmax(0,1fr)_90px_120px_100px_20px] md:gap-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brown-muted/60">
          Product
        </span>

        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brown-muted/60">
          Price
        </span>

        <span className="text-center text-[11px] font-semibold uppercase tracking-[0.1em] text-brown-muted/60">
          Quantity
        </span>

        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brown-muted/60">
          Total
        </span>

        <span />
      </div>

      {cartItems.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
        />
      ))}

      <div className="mt-6 border-t border-brown/8 pt-6">
        <Link
          to="/collection"
          className="btn-outline inline-flex items-center gap-2 text-sm"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default CartItems