import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/formatCurrency'
import Breadcrumb from '../components/Breadcrumb'
import { createOrder } from '../services/database'

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
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: user?.user_metadata?.full_name?.split(' ')[0] || '',
    lastName: user?.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setIsSubmitting(true)

    const customerName = `${formData.firstName} ${formData.lastName}`.trim() || 'Devotee Customer'
    const orderItems = cartItems.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
    }))

    const { data: newOrder, error } = await createOrder({
      userId: user?.id || null,
      customerName,
      customerEmail: formData.email,
      phone: formData.phone,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      items: orderItems,
      subtotal,
      discount,
      shipping,
      total,
    })

    setIsSubmitting(false)

    if (error) {
      setErrorMsg('Failed to place order. Please try again.')
      return
    }

    clearCart()
    navigate('/orders', {
      state: {
        newOrderPlaced: true,
        orderId: newOrder?.id,
      },
    })
  }

  return (
    <div className="min-h-screen bg-cream-light text-brown flex flex-col">
      <Navbar />
      <Breadcrumb currentPage="Checkout" parentPage="Cart" parentLink="/cart" />

      <main className="section-container flex-1 py-8 md:py-14">
        <div className="mb-8">
          <Link
            to="/cart"
            className="text-xs font-semibold uppercase tracking-wider text-brown-muted hover:text-brown transition"
          >
            ← Back to Cart
          </Link>

          <h1 className="mt-3 font-serif text-3xl text-brown sm:text-4xl">
            Checkout
          </h1>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-xs text-red-700 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-2xl border border-brown/10 bg-white p-6 sm:p-8 shadow-card">
            <h2 className="font-serif text-xl font-medium text-brown">
              Shipping Information
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                  First Name *
                </label>
                <input
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="checkout-input mt-1"
                  placeholder="e.g. Aarav"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                  Last Name *
                </label>
                <input
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="checkout-input mt-1"
                  placeholder="e.g. Sharma"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="checkout-input mt-1"
                  placeholder="aarav.sharma@example.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                  Street Address *
                </label>
                <input
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="checkout-input mt-1"
                  placeholder="Flat/House No., Colony, Landmark"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                  City *
                </label>
                <input
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="checkout-input mt-1"
                  placeholder="Varanasi"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                  State *
                </label>
                <input
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className="checkout-input mt-1"
                  placeholder="Uttar Pradesh"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                  PIN Code *
                </label>
                <input
                  name="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className="checkout-input mt-1"
                  placeholder="221001"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                  Phone Number *
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="checkout-input mt-1"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <h2 className="mt-10 font-serif text-xl font-medium text-brown">
              Payment Method
            </h2>

            <div className="mt-4 rounded-xl border border-brown/15 bg-cream-card/50 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  defaultChecked
                  className="accent-gold h-4 w-4"
                />
                <label htmlFor="cod" className="text-sm font-semibold text-brown cursor-pointer">
                  Cash on Delivery / UPI on Delivery
                </label>
              </div>
              <p className="mt-1 pl-7 text-xs text-brown-muted">
                Pay safely in cash or via QR code when your sacred pooja package arrives at your doorstep.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-dark mt-8 w-full py-4 text-xs uppercase tracking-wider font-semibold shadow-md transition disabled:opacity-50"
            >
              {isSubmitting ? 'Securing Order with Supabase...' : `Complete Order — ${formatCurrency(total)}`}
            </button>
          </section>

          {/* Order Summary Sidebar */}
          <aside className="h-fit rounded-2xl border border-brown/10 bg-white p-6 shadow-card sm:p-7 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl font-medium text-brown">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 max-h-96 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 items-center border-b border-brown/5 pb-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-14 w-14 rounded-lg bg-cream-card object-contain p-2 shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-brown line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-brown-muted">
                      Qty: {item.quantity} × {formatCurrency(item.product.price)}
                    </p>
                  </div>

                  <p className="text-xs font-semibold text-brown shrink-0">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-brown-muted">Subtotal ({totalItems} items)</span>
                <span className="font-medium text-brown">{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>Discount Applied</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-brown-muted">Shipping</span>
                <span className="font-medium text-brown">
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>
            </div>

            <div className="mt-5 flex justify-between border-t border-brown/10 pt-4 items-baseline">
              <span className="font-serif text-base font-medium text-brown">
                Total Payable
              </span>
              <span className="font-serif text-2xl font-bold text-brown">
                {formatCurrency(total)}
              </span>
            </div>
          </aside>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default Checkout