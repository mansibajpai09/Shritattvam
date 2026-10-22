import { Link } from 'react-router-dom'
import { useCart, STANDARD_SHIPPING } from '../../context/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'
import GoldDivider from './GoldDivider'
import CouponInput from './CouponInput'
const paymentMethods = ['Visa', 'MC', 'Amex', 'UPI', 'RuPay']
function OrderSummary() {
  const {
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    totalSavings,
    isFreeShippingEligible,
    appliedCoupon,
    removeCoupon,
  } = useCart()
  return (
    <aside className="rounded-lg border border-brown/8 bg-white p-6 shadow-card md:p-7">
      <h2 className="font-serif text-xl font-medium text-brown">Order Summary</h2>
      <div className="mt-4">
        <GoldDivider />
      </div>
      <dl className="mt-6 space-y-3.5">
        <div className="flex items-center justify-between text-sm">
          <dt className="text-brown-muted">Subtotal ({totalItems} items)</dt>
          <dd className="font-medium text-brown">{formatCurrency(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <dt className="text-brown-muted">Coupon Discount</dt>
            <dd className="font-medium text-sage-dark">-{formatCurrency(discount)}</dd>
          </div>
        )}
        {appliedCoupon && (
          <div className="flex items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-card px-3 py-1 text-xs font-medium text-brown">
              {appliedCoupon.code}
              <button
                type="button"
                onClick={removeCoupon}
                className="text-brown-muted transition-colors hover:text-brown"
                aria-label="Remove coupon"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <dt className="text-brown-muted">Shipping</dt>
          <dd className="font-medium text-brown">
            {isFreeShippingEligible ? formatCurrency(STANDARD_SHIPPING) : formatCurrency(shipping)}
          </dd>
        </div>
        {isFreeShippingEligible && (
          <div className="flex items-center justify-between text-sm">
            <dt className="text-sage-dark">Applied: Free Shipping</dt>
            <dd className="font-medium text-sage-dark">-{formatCurrency(STANDARD_SHIPPING)}</dd>
          </div>
        )}
      </dl>
      <div className="my-5 border-t border-brown/8" />
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-brown">Total</p>
          <p className="text-[11px] text-brown-muted">(Inclusive of all taxes)</p>
        </div>
        <p className="font-serif text-2xl font-semibold text-brown">{formatCurrency(total)}</p>
      </div>
      {totalSavings > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-sage-light px-4 py-3">
          <svg className="h-4 w-4 shrink-0 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
          <p className="text-xs font-medium text-sage-dark">
            You saved {formatCurrency(totalSavings)} on this order!
          </p>
        </div>
      )}
      <CouponInput />
      <Link to="/checkout" className="btn-dark mt-6 flex w-full items-center justify-center gap-2 py-3.5">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
        Proceed to Checkout
      </Link>
      {/* Trust section */}
      <div className="mt-6 space-y-4 border-t border-brown/8 pt-6">
        <p className="flex items-center justify-center gap-1.5 text-xs text-brown-muted">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          Secure Checkout
        </p>
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-wider text-brown-muted/70">
            We Accept
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded border border-brown/10 bg-cream-light px-2.5 py-1 text-[10px] font-medium text-brown-muted"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-cream-card p-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </span>
          <div>
            <p className="text-sm font-medium text-brown">Safe, Secure &amp; Trusted</p>
            <p className="mt-0.5 text-xs leading-relaxed text-brown-muted">
              Your payments and personal details are 100% secure.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
export default OrderSummary