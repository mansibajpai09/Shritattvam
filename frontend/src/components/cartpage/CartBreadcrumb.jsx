import { Link } from 'react-router-dom'
function CartBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-brown-muted">
        <li>
          <Link to="/" className="transition-colors duration-300 hover:text-brown">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="text-brown-muted/40">
          &gt;
        </li>
        <li className="font-medium text-brown" aria-current="page">
          Cart
        </li>
      </ol>
    </nav>
  )
}
export default CartBreadcrumb