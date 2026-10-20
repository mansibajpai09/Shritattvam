import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import CartHeader from '../components/cartpage/CartHeader'
import FreeShippingProgress from '../components/cartpage/FreeShippingProgress'
import CartItems from '../components/cartpage/CartItems'
import OrderSummary from '../components/cartpage/OrderSummary'
import EmptyCart from '../components/cartpage/EmptyCart'
import CartTrustFeatures from '../components/cartpage/CartTrustFeatures'
import Breadcrumb from "../components/Breadcrumb";

import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems } = useCart()
  const isEmpty = cartItems.length === 0

  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />
      <Breadcrumb currentPage="Cart" />

      <main className="section-container py-8 md:py-12">
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            <CartHeader />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_400px]">
              <div className="min-w-0">
                <FreeShippingProgress />
                <CartItems />
              </div>

              <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
                <OrderSummary />
              </div>
            </div>
          </>
        )}
      </main>

      {!isEmpty && <CartTrustFeatures />}

      <Footer />
    </div>
  )
}

export default Cart
