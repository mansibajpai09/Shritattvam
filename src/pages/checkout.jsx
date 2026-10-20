import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import Breadcrumb from '../components/Breadcrumb'

function Checkout() {
  const {
    cartItems,
    subtotal,
    discount,
    shipping,
    total,
    totalItems,
    clearCart,
  } = useCart()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    paymentMethod: 'UPI / Online Payment',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  if (cartItems.length === 0 && !completedOrder) {
    return <Navigate to="/cart" replace />
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const orderPayload = {
      customerName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      customerEmail: formData.email.trim(),
      customerPhone: formData.phone.trim(),
      shippingAddress: `${formData.address.trim()}, ${formData.city.trim()}, ${formData.state.trim()} - ${formData.pinCode.trim()}`,
      items: cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      totalAmount: total,
      paymentStatus: 'Paid',
      deliveryStatus: 'Order Placed',
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      if (!res.ok) {
        throw new Error('Failed to create order on server')
      }

      const createdOrder = await res.json()
      setCompletedOrder(createdOrder)
      clearCart()
    } catch (err) {
      console.error('Order placement error:', err)
      setErrorMessage('Could not place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Confirmation view when order is placed
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-cream-light text-brown">
        <Navbar />
        <main className="section-container py-12 md:py-16">
          <div className="mx-auto max-w-xl rounded-2xl border border-brown/10 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-5">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Order Confirmed
            </span>
            <h1 className="mt-1 font-serif text-3xl font-medium text-brown">
              Thank you for your devotion!
            </h1>
            <p className="mt-2 text-sm text-brown-muted">
              Your sacred essentials order has been recorded in the database.
            </p>

            <div className="mt-6 rounded-xl bg-cream-card/60 p-4 border border-brown/5 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-brown-muted">Order Number:</span>
                <span className="font-mono font-bold text-brown">{completedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brown-muted">Customer:</span>
                <span className="font-medium text-brown">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brown-muted">Total Paid:</span>
                <span className="font-bold text-brown">{formatCurrency(completedOrder.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brown-muted">Status:</span>
                <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 font-semibold">
                  {completedOrder.deliveryStatus}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/collection" className="btn-dark w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-wider">
                Continue Shopping
              </Link>
              <Link to="/admin" className="rounded-lg border border-brown/15 w-full sm:w-auto px-5 py-2.5 text-xs text-brown hover:border-gold hover:text-gold-dark transition font-medium">
                View in Admin Dashboard →
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-light text-brown">
      <Navbar />
      <Breadcrumb currentPage="Checkout" />

      <main className="section-container py-8 md:py-14">
        <div className="mb-8">
          <Link to="/cart" className="text-sm text-brown-muted hover:text-brown transition">
            ← Back to Cart
          </Link>
          <h1 className="mt-4 font-serif text-3xl text-brown sm:text-4xl">
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-xl border border-brown/8 bg-white p-5 sm:p-7 shadow-sm">
            <h2 className="font-serif text-xl text-brown font-medium">
              Shipping & Customer Information
            </h2>

            {errorMessage && (
              <div className="mt-4 rounded-lg bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200">
                {errorMessage}
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-brown mb-1">First Name *</label>
                <input
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="checkout-input w-full"
                  placeholder="e.g. Aarav"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown mb-1">Last Name *</label>
                <input
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="checkout-input w-full"
                  placeholder="e.g. Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown mb-1">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="checkout-input w-full"
                  placeholder="aarav@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown mb-1">Phone Number *</label>
                <input
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="checkout-input w-full"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-brown mb-1">Street Address *</label>
                <input
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="checkout-input w-full"
                  placeholder="House number, building name, street"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown mb-1">City *</label>
                <input
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="checkout-input w-full"
                  placeholder="e.g. Varanasi"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brown mb-1">State *</label>
                <input
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="checkout-input w-full"
                  placeholder="e.g. Uttar Pradesh"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-brown mb-1">PIN Code *</label>
                <input
                  name="pinCode"
                  required
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="checkout-input w-full"
                  placeholder="221001"
                />
              </div>
            </div>

            <h2 className="mt-8 font-serif text-xl text-brown font-medium border-t border-brown/5 pt-6">
              Payment Method
            </h2>

            <div className="mt-4 rounded-lg border border-brown/15 bg-cream-card/40 p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI / Online Payment"
                  checked={formData.paymentMethod === 'UPI / Online Payment'}
                  onChange={handleChange}
                  className="accent-gold h-4 w-4"
                />
                <div>
                  <p className="text-sm font-semibold text-brown">UPI / Net Banking / Cards (Instant Confirmation)</p>
                  <p className="text-xs text-brown-muted">100% secure payment simulated for your devotional order</p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-dark mt-8 w-full py-3.5 text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
            >
              {isSubmitting ? 'Placing Order...' : `Place Order · ${formatCurrency(total)}`}
            </button>
          </section>

          {/* Right Summary Sidebar */}
          <aside className="h-fit rounded-xl border border-brown/8 bg-white p-5 shadow-card sm:p-7 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl text-brown font-medium">Your Order</h2>

            <div className="mt-6 space-y-4 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-14 w-14 rounded-lg bg-cream-card object-contain p-1 border border-brown/5 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-brown line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-brown-muted">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-semibold text-brown tabular-nums">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-brown/8" />

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-brown-muted">Subtotal ({totalItems} items)</span>
                <span className="font-medium text-brown">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-gold-dark">
                  <span>Discount</span>
                  <span>- {formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-brown-muted">Delivery</span>
                <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-brown/10 pt-3 text-sm font-semibold text-brown">
                <span>Total</span>
                <span className="font-serif text-base">{formatCurrency(total)}</span>
              </div>
            </div>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default Checkout