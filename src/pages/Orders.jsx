import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { useAuth } from '../context/AuthContext'
import { fetchUserOrders } from '../services/database'
import { formatCurrency } from '../utils/formatCurrency'

function CheckmarkIcon() {
  return (
    <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function Orders() {
  const { user } = useAuth()
  const location = useLocation()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const newOrderPlaced = location.state?.newOrderPlaced
  const newOrderId = location.state?.orderId

  useEffect(() => {
    let isMounted = true

    async function loadOrders() {
      setLoading(true)
      const { data } = await fetchUserOrders(user?.id)
      if (isMounted) {
        setOrders(data || [])
        setLoading(false)
      }
    }

    loadOrders()

    return () => {
      isMounted = false
    }
  }, [user])

  return (
    <div className="min-h-screen bg-cream-light text-brown flex flex-col">
      <Navbar />
      <Breadcrumb currentPage="My Orders" parentPage="Account" parentLink="/login" />

      <main className="section-container flex-1 py-10 md:py-16">
        {/* New Order Banner */}
        {newOrderPlaced && (
          <div className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 shadow-xs flex items-start gap-4">
            <div className="rounded-full bg-emerald-100 p-2 shrink-0">
              <CheckmarkIcon />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-emerald-950">
                Order Received with Blessings!
              </h3>
              <p className="mt-0.5 text-xs text-emerald-800">
                Your order {newOrderId ? `(#${newOrderId})` : ''} has been safely logged in our Supabase database. Our team is carefully packing your sacred pooja items.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between border-b border-brown/10 pb-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-medium text-brown sm:text-4xl">
              My Orders
            </h1>
            <p className="mt-1 text-xs text-brown-muted">
              {user ? `Logged in as ${user.email}` : 'All recent orders from this device'}
            </p>
          </div>

          <Link
            to="/collection"
            className="text-xs font-semibold uppercase tracking-wider text-gold-dark hover:text-brown transition"
          >
            + Continue Shopping
          </Link>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="py-20 text-center">
            <p className="text-xs uppercase tracking-wider text-brown-muted animate-pulse">
              Retrieving orders from Supabase...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-brown/20 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream-card text-2xl font-serif text-gold-dark">
              ॐ
            </div>
            <h2 className="mt-4 font-serif text-xl font-medium text-brown">
              No orders placed yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-brown-muted">
              When you purchase pooja kits, brass diyas, or sacred incense, your orders and tracking details will appear here.
            </p>
            <div className="mt-6">
              <Link to="/collection" className="btn-primary text-xs py-2.5 px-6 shadow-sm">
                Explore All Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-card transition-all"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brown/10 bg-cream-card/30 px-6 py-4 text-xs">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brown-muted block">
                        Order ID
                      </span>
                      <span className="font-semibold text-brown">{order.id}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brown-muted block">
                        Date Placed
                      </span>
                      <span className="text-brown">
                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-brown-muted block">
                        Total Amount
                      </span>
                      <span className="font-semibold text-brown">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span className="inline-flex items-center rounded-full bg-gold/15 px-3 py-1 text-[11px] font-semibold text-gold-dark">
                      ● {order.status || 'Confirmed'}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6">
                  <div className="divide-y divide-brown/5">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-14 w-14 rounded-lg bg-cream-card object-contain p-2 shrink-0 border border-brown/5"
                          />
                        )}

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-medium text-brown line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="mt-0.5 text-xs text-brown-muted">
                            Quantity: {item.quantity} × {formatCurrency(item.price)}
                          </p>
                        </div>

                        <span className="text-sm font-semibold text-brown shrink-0">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping summary footer */}
                  {order.shipping_address && (
                    <div className="mt-5 border-t border-brown/5 pt-4 text-xs text-brown-muted flex flex-col sm:flex-row sm:justify-between gap-2">
                      <p>
                        <strong className="text-brown font-medium">Deliver to: </strong>
                        {order.customer_name} ({order.shipping_address.address}, {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode})
                      </p>
                      {order.phone && <span>Contact: {order.phone}</span>}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Orders
