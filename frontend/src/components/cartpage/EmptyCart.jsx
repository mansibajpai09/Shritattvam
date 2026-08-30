import { Link } from 'react-router-dom'
function EmptyCart() {
  return (
    <div className="flex flex-col items-center py-16 text-center md:py-24">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-card text-brown-muted/40">
        <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </div>
      <h2 className="mt-6 font-serif text-2xl font-medium text-brown">Your Cart is Empty</h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-brown-muted">
        Discover our premium pooja essentials and bring divine rituals into your home.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Continue Shopping
      </Link>
    </div>
  )
}
export default EmptyCart