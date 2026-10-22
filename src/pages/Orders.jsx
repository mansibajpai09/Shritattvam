import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Orders() {
  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />

      <main className="section-container py-16 md:py-24">
        <h1 className="font-serif text-3xl text-brown">
          My Orders
        </h1>

        <div className="mt-8 rounded-xl border border-brown/8 bg-white p-8 text-center">
          <p className="text-sm text-brown-muted">
            Your orders will appear here after you place an order.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Orders
