import { useState } from 'react'
import { useCart } from '../../context/CartContext'
function CouponInput() {
  const [code, setCode] = useState('')
  const { applyCoupon, couponError } = useCart()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!code.trim()) return
    const success = applyCoupon(code)
    if (success) setCode('')
  }
  return (
    <div className="mt-6 border-t border-brown/8 pt-6">
      <p className="text-sm font-medium text-brown">Have a coupon code?</p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 rounded border border-brown/15 bg-white px-4 py-2.5 text-sm text-brown placeholder:text-brown-muted/40 outline-none transition-colors duration-200 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
        />
        <button type="submit" className="btn-dark shrink-0 px-5 py-2.5">
          Apply
        </button>
      </form>
      {couponError && (
        <p className="mt-2 text-xs text-red-700/70">{couponError}</p>
      )}
    </div>
  )
}
export default CouponInput