import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from "./components/ScrollToTop";

import Home from './pages/home'
import Collection from './pages/collection'
import ProductDetails from './pages/productDetails'
import Cart from './pages/cart'
import Checkout from './pages/checkout'
import About from './pages/about'
import Contact from './pages/contact'
import Login from './pages/login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Disclaimer from './pages/Disclaimer'
import ExchangePolicy from './pages/ExchangePolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import AdminDashboard from './pages/admin/Dashboard'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <ScrollToTop />
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/" element={<Home />} />

          <Route
            path="/collection"
            element={<Collection />}
          />
          <Route
            path="/shop"
            element={<Navigate to="/collection" replace />}
          />

          <Route
            path="/product/:productId"
            element={<ProductDetails />}
          />

          {/* Backward-compatible old route */}
          <Route
            path="/product-details"
            element={<Navigate to="/product/1" replace />}
          />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route path="/about" element={<About />} />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/place-order"
            element={<PlaceOrder />}
          
          />
          <Route path="/disclaimer" element={<Disclaimer />} />
<Route path="/exchange-policy" element={<ExchangePolicy />} />
<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
  )
}

export default App