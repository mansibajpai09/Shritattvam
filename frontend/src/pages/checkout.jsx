import { Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'
import Breadcrumb from "../components/Breadcrumb";

function Checkout() {
  const {
    cartItems,
    subtotal,
    discount,
    shipping,
    total,
    totalItems,
  } = useCart()

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      <Breadcrumb currentPage="Checkout" />

      <main className="section-container py-8 md:py-14">
        <div className="mb-8">
          <Link
            to="/cart"
            className="text-sm text-brown-muted hover:text-brown"
          >
            ← Back to Cart
          </Link>

          <h1 className="mt-4 font-serif text-3xl text-brown sm:text-4xl">
            Checkout
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="rounded-xl border border-brown/8 bg-white p-5 sm:p-7">
            <h2 className="font-serif text-xl text-brown">
              Shipping Information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <input
                className="checkout-input"
                placeholder="First name"
              />

              <input
                className="checkout-input"
                placeholder="Last name"
              />

              <input
                className="checkout-input sm:col-span-2"
                placeholder="Address"
              />

              <input
                className="checkout-input"
                placeholder="City"
              />

              <input
                className="checkout-input"
                placeholder="State"
              />

              <input
                className="checkout-input"
                placeholder="PIN code"
              />

              <input
                className="checkout-input"
                placeholder="Phone number"
              />
            </div>

            <h2 className="mt-10 font-serif text-xl text-brown">
              Payment
            </h2>

            <div className="mt-5 rounded-lg border border-brown/10 bg-cream-light p-4">
              <p className="text-sm font-medium text-brown">
                Payment gateway
              </p>

              <p className="mt-1 text-xs text-brown-muted">
                Payment integration can be connected here
                when your gateway is ready.
              </p>
            </div>

            <button
              type="button"
              className="btn-dark mt-8 w-full py-3.5"
            >
              Place Order
            </button>
          </section>

          <aside className="h-fit rounded-xl border border-brown/8 bg-white p-5 shadow-card sm:p-7 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl text-brown">
              Your Order
            </h2>

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-16 w-16 rounded-lg bg-cream-card object-contain p-2"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-brown">
                      {item.product.name}
                    </p>

                    <p className="mt-1 text-xs text-brown-muted">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-brown">
                    {formatCurrency(
                      item.product.price * item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="my-6 border-t border-brown/8" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-brown-muted">
                  Subtotal ({totalItems})
                </span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-brown-muted">
                    Discount
                  </span>
                  <span className="text-sage-dark">
                    -{formatCurrency(discount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-brown-muted">
                  Shipping
                </span>
                <span>
                  {shipping === 0
                    ? 'FREE'
                    : formatCurrency(shipping)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-between border-t border-brown/8 pt-5">
              <span className="font-medium text-brown">
                Total
              </span>

              <span className="font-serif text-2xl font-semibold text-brown">
                {formatCurrency(total)}
              </span>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Checkout