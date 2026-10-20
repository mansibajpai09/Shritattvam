import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoIcon from '../assets/final logo.svg'
import { useCart } from '../context/CartContext'
import { scrollToCollections } from '../utils/navigation'

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974a1.125 1.125 0 011.119 1.007z"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function Navbar() {
  const [showBanner, setShowBanner] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  const handleCollectionClick = (e) => {
    if (e) e.preventDefault()
    setIsMobileMenuOpen(false)

    if (location.pathname === '/') {
      scrollToCollections()
    } else {
      navigate('/', { state: { scrollTo: 'collections' } })
    }
  }

  return (
    <header className="sticky top-0 z-50">
      {showBanner && (
        <div className="relative bg-brown-dark px-10 py-2.5 text-center">
          <p className="text-xs font-medium tracking-wide text-white/90">
          <span className="mx-2">|</span>
            Free Shipping on Orders above ₹999
            <span className="mx-2">|</span>
            10% OFF on First Purchase
            <span className="mx-2">|</span>
          </p>

          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            aria-label="Close announcement"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <nav className="border-b border-brown/5 bg-cream-light/95 backdrop-blur-sm">
        <div className="section-container flex min-h-[72px] items-center justify-between gap-6">
          <Link
            to="/"
            className="flex shrink-0 items-center gap-2.5"
          >
            <img
              src={logoIcon}
              alt="ShriTattvam"
              className="h-8 w-8"
            />

            <span className="font-serif text-xl font-semibold text-brown">
              ShriTattvam
            </span>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  to="/collection"
                  className="text-[13px] font-medium uppercase tracking-[0.08em] text-brown-muted hover:text-brown transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleCollectionClick}
                  className="text-[13px] font-medium uppercase tracking-[0.08em] text-brown-muted hover:text-brown transition-colors cursor-pointer bg-transparent border-0 p-0"
                >
                  Collection
                </button>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[13px] font-medium uppercase tracking-[0.08em] text-brown-muted hover:text-brown transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4 text-brown-muted">
            <div className="group relative flex flex-col items-center">
              <button
                type="button"
                aria-label="Search"
                className="hover:text-brown"
              >
                <SearchIcon />
              </button>

              <span className="absolute top-full mt-2 whitespace-nowrap text-xs text-brown opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Search
              </span>
            </div>

            <div className="group relative flex flex-col items-center">
              <Link
                to="/login"
                aria-label="Account"
                className="hover:text-brown"
              >
                <UserIcon />
              </Link>

              <span className="absolute top-full mt-2 whitespace-nowrap text-xs text-brown opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Account
              </span>
            </div>

            <div className="group relative flex flex-col items-center">
              <Link
                to="/cart"
                aria-label={`Cart with ${totalItems} items`}
                className="relative hover:text-brown"
              >
                <BagIcon />

                {totalItems > 0 && (
                  <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-bold text-brown-dark">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              <span className="absolute top-full mt-2 whitespace-nowrap text-xs text-brown opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Cart
              </span>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-1 hover:text-brown lg:hidden"
            >
              {isMobileMenuOpen ? (
                <CloseIcon />
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-brown/10 bg-cream-light/98 px-6 py-4 shadow-sm backdrop-blur-sm lg:hidden">
            <ul className="flex flex-col space-y-3">
              <li>
                <Link
                  to="/collection"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 text-sm font-medium uppercase tracking-wider text-brown-muted hover:text-brown transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleCollectionClick}
                  className="block w-full text-left py-1 text-sm font-medium uppercase tracking-wider text-brown-muted hover:text-brown transition-colors cursor-pointer bg-transparent border-0 p-0"
                >
                  Collection
                </button>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-1 text-sm font-medium uppercase tracking-wider text-brown-muted hover:text-brown transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar