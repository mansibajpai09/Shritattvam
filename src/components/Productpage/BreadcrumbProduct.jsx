import { Link } from 'react-router-dom'

function Breadcrumb({ product }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-500"
    >
      <Link
        to="/"
        className="hover:text-stone-900"
      >
        Home
      </Link>

      <span>/</span>

      <Link
        to="/collection"
        className="hover:text-stone-900"
      >
        Collection
      </Link>

      <span>/</span>

      <span className="text-stone-900">
        {product.name}
      </span>
    </nav>
  )
}

export default Breadcrumb