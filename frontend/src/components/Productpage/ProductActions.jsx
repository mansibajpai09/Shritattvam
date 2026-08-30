import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import QuantitySelector from './QuantitySelector'

function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    addToCart(product.id, quantity)

    setAdded(true)

    window.setTimeout(() => {
      setAdded(false)
    }, 1800)
  }

  const handleBuyNow = () => {
    addToCart(product.id, quantity)
    navigate('/checkout')
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-[#eef5e8] px-3 py-1.5 text-sm font-medium text-green-700">
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className="flex h-12 items-center justify-center gap-3 rounded-lg bg-[#21150c] px-5 text-sm font-medium text-white transition hover:bg-[#3b2616] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>🛒</span>
          {added ? 'Added to Cart' : 'Add to Cart'}
        </button>

        <button
          type="button"
          disabled={!product.inStock}
          onClick={handleBuyNow}
          className="h-12 rounded-lg bg-[#d9a452] px-5 text-sm font-semibold text-stone-950 transition hover:bg-[#c99445] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>

      <div className="flex justify-end border-t border-stone-100 pt-4">
        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
              })
            }
          }}
          className="flex items-center gap-2 text-sm text-stone-700 hover:text-[#9b681f]"
        >
          <span>⌯</span>
          Share
        </button>
      </div>
    </div>
  )
}

export default ProductActions