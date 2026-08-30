import { useCart } from '../../context/CartContext'
import { formatCurrency } from '../../utils/formatCurrency'
function FreeShippingProgress() {
  const { isFreeShippingEligible, amountToFreeShipping, freeShippingProgress } = useCart()
  return (
    <div className="mb-8 rounded-lg border border-sage/20 bg-sage-light px-5 py-4 md:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
          <p className="text-sm font-medium text-sage-dark">
            {isFreeShippingEligible
              ? "You're eligible for free shipping!"
              : `Add ${formatCurrency(amountToFreeShipping)} more to get FREE shipping.`}
          </p>
        </div>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/80">
        <div
          className="h-full rounded-full bg-sage transition-all duration-500 ease-out"
          style={{ width: `${freeShippingProgress}%` }}
        />
      </div>
    </div>
  )
}
export default FreeShippingProgress