import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import { products } from '../data/products'
import { formatCurrency } from '../utils/formatCurrency'
import { useCart } from '../context/CartContext'

// Icons
function FilterIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-gold fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974a1.125 1.125 0 011.119 1.007z" />
    </svg>
  )
}

function Collection() {
  const { addToCart } = useCart()

  // Calculate global min and max prices from data
  const dataMinPrice = useMemo(() => Math.min(...products.map((p) => p.price)), [])
  const dataMaxPrice = useMemo(() => Math.max(...products.map((p) => p.price)), [])

  // Categories list
  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.category)))
    return ['All', ...list]
  }, [])

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState({
    min: dataMinPrice,
    max: dataMaxPrice,
  })
  const [sortBy, setSortBy] = useState('newest')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [addedProductId, setAddedProductId] = useState(null)

  // Prevent background scroll when mobile filter is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileFilterOpen])

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All')
    setPriceRange({ min: dataMinPrice, max: dataMaxPrice })
    setSortBy('newest')
  }

  // Active filter count (excluding default state)
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCategory !== 'All') count++
    if (priceRange.min > dataMinPrice || priceRange.max < dataMaxPrice) count++
    return count
  }, [selectedCategory, priceRange, dataMinPrice, dataMaxPrice])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false
      }
      // Price range filter
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false
      }
      return true
    })

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'oldest':
        result.sort((a, b) => a.id - b.id)
        break
      case 'rating-desc':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
      default:
        // Highest ID or explicit createdAt
        result.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt)
          }
          return b.id - a.id
        })
        break
    }

    return result
  }, [selectedCategory, priceRange, sortBy])

  // Handle Quick Add to Cart
  const handleQuickAdd = (e, productId) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(productId, 1)
    setAddedProductId(productId)
    setTimeout(() => {
      setAddedProductId(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-cream-light text-brown flex flex-col">
      <Navbar />
      <Breadcrumb currentPage="All Products" parentPage="Shop" parentLink="/collection" />

      <main className="section-container flex-1 py-8 md:py-12">
        {/* Top Header Bar */}
        <div className="mb-8 border-b border-brown/10 pb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                Sacred & Spiritual Goods
              </p>
              <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-brown sm:text-4xl">
                All Products
              </h1>
              <p className="mt-1.5 text-xs text-brown-muted sm:text-sm">
                Showing{' '}
                <span className="font-semibold text-brown">{filteredProducts.length}</span>{' '}
                {filteredProducts.length === 1 ? 'product' : 'products'}
                {activeFiltersCount > 0 && ` (filtered from ${products.length})`}
              </p>
            </div>

            {/* Controls Bar: Sort + Mobile Filter Toggle */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-brown/20 bg-white px-4 py-2.5 text-xs font-semibold tracking-wide text-brown shadow-sm transition hover:border-gold hover:text-gold-dark lg:hidden"
              >
                <FilterIcon />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-brown-dark">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="hidden text-xs font-medium text-brown-muted sm:inline">
                  Sort by:
                </label>
                <div className="relative">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="cursor-pointer appearance-none rounded-lg border border-brown/20 bg-white py-2.5 pl-3.5 pr-8 text-xs font-medium text-brown shadow-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Highest Rated</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                  <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-brown-muted">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-brown-muted font-medium">Active filters:</span>
              {selectedCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-brown transition hover:bg-gold/20"
                >
                  <span>Category: {selectedCategory}</span>
                  <CloseIcon />
                </button>
              )}
              {(priceRange.min > dataMinPrice || priceRange.max < dataMaxPrice) && (
                <button
                  type="button"
                  onClick={() => setPriceRange({ min: dataMinPrice, max: dataMaxPrice })}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-brown transition hover:bg-gold/20"
                >
                  <span>
                    Price: {formatCurrency(priceRange.min)} – {formatCurrency(priceRange.max)}
                  </span>
                  <CloseIcon />
                </button>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-gold-dark underline underline-offset-2 hover:text-brown transition"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Catalogue Body: Sidebar + Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-10">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-7 pr-2">
            <div className="flex items-center justify-between border-b border-brown/10 pb-3">
              <h2 className="font-serif text-lg font-medium text-brown">Filter By</h2>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-medium text-gold-dark hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brown-muted">
                Category
              </h3>
              <div className="mt-3 space-y-1.5">
                {categories.map((cat) => {
                  const count =
                    cat === 'All'
                      ? products.length
                      : products.filter((p) => p.category === cat).length
                  const isSelected = selectedCategory === cat

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                        isSelected
                          ? 'bg-brown text-white shadow-sm'
                          : 'text-brown hover:bg-brown/5'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[11px] ${
                          isSelected ? 'text-white/80' : 'text-brown-muted'
                        }`}
                      >
                        ({count})
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="border-t border-brown/10 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brown-muted">
                  Price Range
                </h3>
                {(priceRange.min > dataMinPrice || priceRange.max < dataMaxPrice) && (
                  <button
                    type="button"
                    onClick={() => setPriceRange({ min: dataMinPrice, max: dataMaxPrice })}
                    className="text-[11px] text-gold-dark hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Slider (Max Price Control) */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-brown-muted mb-1.5 font-medium">
                  <span>Up to:</span>
                  <span className="font-bold text-brown">{formatCurrency(priceRange.max)}</span>
                </div>
                <input
                  type="range"
                  min={dataMinPrice}
                  max={dataMaxPrice}
                  step={50}
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange((prev) => ({
                      ...prev,
                      max: Math.max(prev.min, Number(e.target.value)),
                    }))
                  }
                  className="w-full accent-gold cursor-pointer"
                />
              </div>

              {/* Min & Max Inputs */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-brown-muted">
                    Min (₹)
                  </label>
                  <input
                    type="number"
                    min={dataMinPrice}
                    max={priceRange.max}
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: Math.max(dataMinPrice, Number(e.target.value) || 0),
                      }))
                    }
                    className="mt-1 w-full rounded border border-brown/20 bg-white px-2.5 py-1.5 text-xs text-brown outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-brown-muted">
                    Max (₹)
                  </label>
                  <input
                    type="number"
                    min={priceRange.min}
                    max={dataMaxPrice}
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: Math.min(dataMaxPrice, Number(e.target.value) || dataMaxPrice),
                      }))
                    }
                    className="mt-1 w-full rounded border border-brown/20 bg-white px-2.5 py-1.5 text-xs text-brown outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Quick Price Shortcuts */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {[
                  { label: 'Under ₹500', min: dataMinPrice, max: 500 },
                  { label: '₹500 - ₹1,000', min: 500, max: 1000 },
                  { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
                  { label: '₹2,000+', min: 2000, max: dataMaxPrice },
                ].map((preset) => {
                  const isActive =
                    priceRange.min === preset.min && priceRange.max === preset.max
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setPriceRange({ min: preset.min, max: preset.max })}
                      className={`rounded px-2 py-1 text-[11px] font-medium transition ${
                        isActive
                          ? 'bg-gold text-brown-dark font-semibold'
                          : 'bg-white border border-brown/15 text-brown-muted hover:border-gold hover:text-brown'
                      }`}
                    >
                      {preset.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              /* Empty Results State */
              <div className="rounded-2xl border border-dashed border-brown/20 bg-cream-card/50 px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  <FilterIcon />
                </div>
                <h3 className="mt-4 font-serif text-xl font-medium text-brown">
                  No products match your criteria
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-brown-muted sm:text-sm">
                  We couldn't find any products in this price range or category. Try clearing your
                  filters or adjusting the price bounds to view our complete collection.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="btn-primary text-xs py-2.5 px-6 shadow-sm"
                  >
                    Clear All Filters
                  </button>
                  {selectedCategory !== 'All' && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('All')}
                      className="btn-outline text-xs py-2 px-5"
                    >
                      Show All Categories
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Product Cards Grid */
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-y-7">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-brown/10 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    {/* Image Area with Link */}
                    <div className="relative aspect-square overflow-hidden bg-cream-card p-4">
                      <Link
                        to={`/product/${product.id}`}
                        state={{ from: 'Shop', fromPath: '/collection' }}
                        className="block h-full w-full"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
                        {product.discount > 0 && (
                          <span className="rounded bg-gold px-1.5 py-0.5 text-[10px] font-bold text-brown-dark shadow-xs">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Rating Badge */}
                      {product.rating && (
                        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[11px] font-medium text-brown shadow-xs pointer-events-none">
                          <StarIcon />
                          <span>{product.rating}</span>
                        </div>
                      )}

                      {/* Desktop Hover Quick Add to Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, product.id)}
                        className={`hidden lg:flex absolute bottom-3 left-3 right-3 z-20 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold shadow-md transition-all duration-300 ${
                          addedProductId === product.id
                            ? 'bg-green-700 text-white opacity-100 translate-y-0'
                            : 'bg-brown-dark text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-brown'
                        }`}
                      >
                        <BagIcon />
                        <span>
                          {addedProductId === product.id ? 'Added to Cart!' : 'Add to Cart'}
                        </span>
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                        {product.category}
                      </p>

                      <Link
                        to={`/product/${product.id}`}
                        state={{ from: 'Shop', fromPath: '/collection' }}
                        className="mt-1"
                      >
                        <h3 className="font-serif text-sm font-medium text-brown transition-colors hover:text-gold-dark sm:text-base line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>

                      {product.subtitle && (
                        <p className="mt-1 text-xs text-brown-muted line-clamp-1">
                          {product.subtitle}
                        </p>
                      )}

                      {/* Price & Mobile Add to Cart */}
                      <div className="mt-auto pt-3 flex items-center justify-between border-t border-brown/5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-semibold text-brown text-sm sm:text-base">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-brown-muted/70 line-through">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        {/* Mobile Add to Cart Button */}
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(e, product.id)}
                          aria-label={`Add ${product.name} to cart`}
                          className={`lg:hidden flex h-8 w-8 items-center justify-center rounded-lg transition ${
                            addedProductId === product.id
                              ? 'bg-green-700 text-white'
                              : 'bg-brown/10 text-brown hover:bg-gold hover:text-brown-dark'
                          }`}
                        >
                          <BagIcon />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filters Slide-Over Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-cream-light p-6 shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-brown/10 pb-4">
              <h2 className="font-serif text-lg font-medium text-brown">Filter Products</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="rounded-lg p-1 text-brown-muted hover:text-brown"
                aria-label="Close filters"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 space-y-6 py-6">
              {/* Category */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brown-muted">
                  Category
                </h3>
                <div className="mt-3 space-y-1.5">
                  {categories.map((cat) => {
                    const count =
                      cat === 'All'
                        ? products.length
                        : products.filter((p) => p.category === cat).length
                    const isSelected = selectedCategory === cat

                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                          isSelected
                            ? 'bg-brown text-white shadow-sm'
                            : 'text-brown hover:bg-brown/5'
                        }`}
                      >
                        <span>{cat}</span>
                        <span className={isSelected ? 'text-white/80' : 'text-brown-muted'}>
                          ({count})
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="border-t border-brown/10 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brown-muted">
                    Price Range
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPriceRange({ min: dataMinPrice, max: dataMaxPrice })}
                    className="text-[11px] text-gold-dark hover:underline"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-brown-muted mb-1 font-medium">
                    <span>Up to:</span>
                    <span className="font-bold text-brown">{formatCurrency(priceRange.max)}</span>
                  </div>
                  <input
                    type="range"
                    min={dataMinPrice}
                    max={dataMaxPrice}
                    step={50}
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: Math.max(prev.min, Number(e.target.value)),
                      }))
                    }
                    className="w-full accent-gold cursor-pointer"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-brown-muted">
                      Min (₹)
                    </label>
                    <input
                      type="number"
                      min={dataMinPrice}
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: Math.max(dataMinPrice, Number(e.target.value) || 0),
                        }))
                      }
                      className="mt-1 w-full rounded border border-brown/20 bg-white px-2.5 py-1.5 text-xs text-brown outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-brown-muted">
                      Max (₹)
                    </label>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={dataMaxPrice}
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: Math.min(dataMaxPrice, Number(e.target.value) || dataMaxPrice),
                        }))
                      }
                      className="mt-1 w-full rounded border border-brown/20 bg-white px-2.5 py-1.5 text-xs text-brown outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-brown/10 pt-4 flex gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 rounded-lg border border-brown/20 py-2.5 text-xs font-semibold text-brown hover:bg-brown/5 transition"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 rounded-lg bg-brown-dark py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brown transition"
              >
                View ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Collection
