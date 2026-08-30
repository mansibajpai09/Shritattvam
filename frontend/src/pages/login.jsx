import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  return (
    <div className="min-h-screen bg-cream-light">
      <Navbar />

      <main className="section-container flex justify-center py-14 md:py-24">
        <div className="w-full max-w-md rounded-xl border border-brown/8 bg-white p-6 shadow-card sm:p-8">
          <h1 className="font-serif text-3xl text-brown">
            Welcome Back
          </h1>

          <form className="mt-8 space-y-4">
            <input
              className="checkout-input"
              type="email"
              placeholder="Email address"
            />

            <input
              className="checkout-input"
              type="password"
              placeholder="Password"
            />

            <button className="btn-dark w-full py-3.5">
              Sign In
            </button>
          </form>

          <Link
            to="/"
            className="mt-5 block text-center text-sm text-brown-muted hover:text-brown"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
