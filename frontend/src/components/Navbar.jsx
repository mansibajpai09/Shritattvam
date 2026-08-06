import { useState } from 'react'
import logoIcon from '../assets/logo-icon.svg'
const navLinks = ['New', 'ALL', 'Poojakit', 'Incense Stick', 'Combos', 'Collections']
function SearchIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}
function UserIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )
}
function HeartIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}
function BagIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
function Navbar() {
  const [showBanner, setShowBanner] = useState(true)
  return (
    <header className="sticky top-0 z-50">
      {showBanner && (
        <div className="relative bg-brown-dark px-4 py-2.5 text-center">
          <p className="text-xs font-medium tracking-wide text-white/90 md:text-[13px]">
            Free Shipping on Orders above ₹999&nbsp;&nbsp;|&nbsp;&nbsp;10% OFF on First Purchase&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="#shop" className="underline underline-offset-2 transition-opacity hover:opacity-80">
              Shop Now
            </a>
          </p>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
            aria-label="Close announcement"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      <nav className="border-b border-brown/5 bg-cream-light/95 backdrop-blur-sm">
        <div className="section-container flex h-[72px] items-center justify-between">
          <a href="/" className="flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-80">
            <img src={logoIcon} alt="" className="h-8 w-8" />
            <span className="font-serif text-xl font-semibold tracking-tight text-brown">
              ShriTatvam
            </span>
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-[13px] font-medium uppercase tracking-[0.08em] text-brown-muted transition-colors duration-300 hover:text-brown"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5 text-brown-muted">
            {[SearchIcon, UserIcon, HeartIcon, BagIcon].map((Icon, i) => (
              <button
                key={i}
                type="button"
                className="transition-colors duration-300 hover:text-brown"
                aria-label={['Search', 'Account', 'Wishlist', 'Cart'][i]}
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Navbar