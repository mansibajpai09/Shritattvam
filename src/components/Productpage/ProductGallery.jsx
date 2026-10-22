function ProductGallery({ product }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[90px_minmax(0,1fr)]">
      {/* Thumbnail */}
      <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:flex-col">
        <button
          type="button"
          className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-[#b8863b] bg-[#f5eee4] p-2"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </button>
      </div>

      {/* Main Product Image */}
      <div className="order-1 aspect-square overflow-hidden rounded-xl bg-[#f5eee4] sm:order-2">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-6 transition-transform duration-500 hover:scale-105 sm:p-10"
        />
      </div>
    </div>
  )
}

export default ProductGallery