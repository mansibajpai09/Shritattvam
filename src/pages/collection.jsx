import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { products } from '../data/products'
import { formatCurrency } from '../utils/formatCurrency'
import { useCart } from '../context/CartContext'
import Breadcrumb from '../components/Breadcrumb'

// All available categories
const CATEGORIES = ['All', 'Pooja Kits', 'Incense', 'Decor', 'Dhoop', 'Combos']

// Sort options
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

// Absolute price bounds from product dataset
const MIN_BOUND = Math.min(...products.map((p) => p.price))
const MAX_BOUND = Math.max(...products.map((p) => p.price))

function Collection() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()

  const [allProducts, setAllProducts] = useState(products)

  // Fetch live products from database
  useEffect(() => {
    fetch('/api/products')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllProducts(data)
        }
      })
      .catch((err) => console.warn('Using local products data:', err))
  }, [])

  // State
  const initialCategory = searchParams.get('category') || 'All'
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  )
  const [minPrice, setMinPrice] = useState(MIN_BOUND)
  const [maxPrice, setMaxPrice] = useState(MAX_BOUND)
  const [sortBy, setSortBy] = useState('newest')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [addedId, setAddedId] = useState(null)

  // Keep search params in sync when category changes
  useEffect(() => {
    const currentParam = searchParams.get('category')
    if (selectedCategory === 'All' && currentParam) {
      searchParams.delete('category')
      setSearchParams(searchParams, { replace: true })
    } else if (selectedCategory !== 'All' && currentParam !== selectedCategory) {
      searchParams.set('category', selectedCategory)
      setSearchParams(searchParams, { replace: true })
    }
  }, [selectedCategory, searchParams, setSearchParams])

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: allProducts.length }
    allProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [allProducts])

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false
        }
        // Price filter
        if (product.price < minPrice || product.price > maxPrice) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          const dateA = new Date(a.createdAt || 0).getTime()
          const dateB = new Date(b.createdAt || 0).getTime()
          return dateB - dateA || b.id - a.id
        }
        if (sortBy === 'oldest') {
          const dateA = new Date(a.createdAt || 0).getTime()
          const dateB = new Date(b.createdAt || 0).getTime()
          return dateA - dateB || a.id - b.id
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price
        }
        return 0
      })
  }, [selectedCategory, minPrice, maxPrice, sortBy])

  // Active filters check
  const isFiltered =
    selectedCategory !== 'All' || minPrice > MIN_BOUND || maxPrice < MAX_BOUND

  const handleClearAllFilters = () => {
    setSelectedCategory('All')
    setMinPrice(MIN_BOUND)
    setMaxPrice(MAX_BOUND)
  }

  const handleResetPrice = () => {
    setMinPrice(MIN_BOUND)
    setMaxPrice(MAX_BOUND)
  }

  const handleAddToCart = (productId) => {
    addToCart(productId, 1)
    setAddedId(productId)
    setTimeout(() => {
      setAddedId(null)
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-cream-light text-brown">
      <Navbar />
      <Breadcrumb currentPage="Shop" />

      <main className="section-container py-8 md:py-12">
        {/* Header Section */}
        <div className="border-b border-brown/10 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                ShriTattvam Catalogue
              </p>
              <h1 className="mt-1 font-serif text-3xl font-medium text-brown sm:text-4xl">
                All Products
              </h1>
              <p className="mt-2 text-sm text-brown-muted max-w-xl">
                Explore our full collection of sacred pooja essentials, pure fragrances, and artisanal brassware.
              </p>
            </div>

            {/* Dynamic Count and Sorting Controls */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 pt-2 md:pt-0">
              <span className="text-xs font-medium text-brown-muted tabular-nums">
                {isFiltered
                  ? `Showing ${filteredProducts.length} of ${allProducts.length} products`
                  : `Showing all ${allProducts.length} products`}
              </span>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-brown/15 bg-white px-3.5 py-2 text-xs font-medium text-brown shadow-sm transition hover:border-gold hover:text-gold-dark lg:hidden"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span>Filters</span>
                {isFiltered && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-brown-dark">
                    !
                  </span>
                )}
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="sr-only">
                  Sort products
                </label>
                <div className="relative">
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="cursor-pointer appearance-none rounded-lg border border-brown/15 bg-white py-2 pl-3 pr-8 text-xs font-medium text-brown shadow-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-brown-muted">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {isFiltered && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 text-xs">
              <span className="font-medium text-brown-muted">Active filters:</span>

              {selectedCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brown/15 bg-white px-3 py-1 text-brown transition hover:border-gold hover:text-gold-dark"
                >
                  <span>Category: <strong>{selectedCategory}</strong></span>
                  <span aria-hidden="true" className="text-sm font-semibold">×</span>
                </button>
              )}

              {(minPrice > MIN_BOUND || maxPrice < MAX_BOUND) && (
                <button
                  type="button"
                  onClick={handleResetPrice}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brown/15 bg-white px-3 py-1 text-brown transition hover:border-gold hover:text-gold-dark"
                >
                  <span>Price: <strong>{formatCurrency(minPrice)} – {formatCurrency(maxPrice)}</strong></span>
                  <span aria-hidden="true" className="text-sm font-semibold">×</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-xs font-medium text-gold-dark underline underline-offset-2 transition hover:text-brown ml-2"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Catalogue Body: Sidebar + Grid */}
        <div className="mt-8 flex gap-8 lg:gap-10 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 rounded-xl border border-brown/8 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-brown/10">
              <h2 className="font-serif text-lg font-medium text-brown">Filters</h2>
              {isFiltered && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="text-xs font-medium text-gold-dark hover:underline hover:text-brown"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brown-muted mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat
                  const count = categoryCounts[cat] || 0
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-brown-dark text-white font-semibold'
                          : 'text-brown-muted hover:bg-cream-card hover:text-brown'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[11px] tabular-nums ${
                          isSelected ? 'text-gold' : 'text-brown-muted/60'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mt-8 pt-6 border-t border-brown/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brown-muted">
                  Price Range
                </h3>
                {(minPrice > MIN_BOUND || maxPrice < MAX_BOUND) && (
                  <button
                    type="button"
                    onClick={handleResetPrice}
                    className="text-[11px] font-medium text-gold-dark hover:underline hover:text-brown"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Price display */}
              <div className="mb-4 flex items-center justify-between text-xs font-semibold text-brown tabular-nums">
                <span>{formatCurrency(minPrice)}</span>
                <span className="text-brown-muted/40">—</span>
                <span>{formatCurrency(maxPrice)}</span>
              </div>

              {/* Min/Max dual range sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] text-brown-muted/80 mb-1">
                    <span>Min Price</span>
                    <span className="tabular-nums font-medium text-brown">{formatCurrency(minPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={MIN_BOUND}
                    max={MAX_BOUND}
                    step={50}
                    value={minPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val <= maxPrice) setMinPrice(val)
                    }}
                    className="h-1.5 w-full cursor-pointer accent-gold bg-cream-card rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-brown-muted/80 mb-1">
                    <span>Max Price</span>
                    <span className="tabular-nums font-medium text-brown">{formatCurrency(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={MIN_BOUND}
                    max={MAX_BOUND}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val >= minPrice) setMaxPrice(val)
                    }}
                    className="h-1.5 w-full cursor-pointer accent-gold bg-cream-card rounded-lg"
                  />
                </div>
              </div>

              {/* Quick Price Range Chips */}
              <div className="mt-5 pt-4 border-t border-brown/5">
                <p className="text-[11px] font-medium text-brown-muted/70 mb-2">Quick Select:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice(MIN_BOUND)
                      setMaxPrice(500)
                    }}
                    className={`rounded border px-2 py-1.5 text-center text-[11px] transition ${
                      minPrice === MIN_BOUND && maxPrice === 500
                        ? 'border-gold bg-gold/10 font-semibold text-brown'
                        : 'border-brown/10 text-brown-muted hover:border-gold/50'
                    }`}
                  >
                    Under ₹500
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice(500)
                      setMaxPrice(1500)
                    }}
                    className={`rounded border px-2 py-1.5 text-center text-[11px] transition ${
                      minPrice === 500 && maxPrice === 1500
                        ? 'border-gold bg-gold/10 font-semibold text-brown'
                        : 'border-brown/10 text-brown-muted hover:border-gold/50'
                    }`}
                  >
                    ₹500 – ₹1.5k
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice(1500)
                      setMaxPrice(MAX_BOUND)
                    }}
                    className={`rounded border px-2 py-1.5 text-center text-[11px] transition ${
                      minPrice === 1500 && maxPrice === MAX_BOUND
                        ? 'border-gold bg-gold/10 font-semibold text-brown'
                        : 'border-brown/10 text-brown-muted hover:border-gold/50'
                    }`}
                  >
                    ₹1.5k+
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPrice}
                    className="rounded border border-brown/10 px-2 py-1.5 text-center text-[11px] text-brown-muted hover:border-gold/50 transition"
                  >
                    All Range
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              /* Empty state */
              <div className="rounded-2xl border border-dashed border-brown/20 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream-card text-gold-dark mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-medium text-brown">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-brown-muted max-w-md mx-auto">
                  We couldn't find any pooja essentials matching your current category or price filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="mt-6 btn-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              /* Product cards grid */
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl border border-brown/8 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    {/* Top Image Box */}
                    <div className="relative aspect-square overflow-hidden bg-cream-card">
                      <Link
                        to={`/product/${product.id}`}
                        state={{ from: 'Shop', fromPath: '/collection' }}
                        className="block h-full w-full p-4 sm:p-5"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* Discount or tag */}
                      {product.discount > 0 && (
                        <span className="absolute left-3 top-3 rounded bg-brown-dark/90 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-gold shadow-sm">
                          {product.discount}% OFF
                        </span>
                      )}

                      {/* Desktop Hover Quick Add */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product.id)}
                        className="absolute bottom-3 left-3 right-3 z-10 hidden rounded-md bg-brown-dark py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-gold hover:text-brown-dark lg:block lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                      >
                        {addedId === product.id ? 'Added to Cart ✓' : 'Add to Cart'}
                      </button>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold-dark">
                            {product.category}
                          </span>
                          {product.rating && (
                            <span className="text-[11px] font-medium text-brown-muted/80">
                              ★ {product.rating}
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/product/${product.id}`}
                          state={{ from: 'Shop', fromPath: '/collection' }}
                          className="block mt-1"
                        >
                          <h2 className="font-serif text-sm font-medium text-brown transition-colors duration-200 group-hover:text-gold-dark sm:text-base line-clamp-1">
                            {product.name}
                          </h2>
                        </Link>

                        <p className="mt-1 text-xs text-brown-muted line-clamp-1">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Price and Mobile Add */}
                      <div className="mt-4 flex items-center justify-between border-t border-brown/5 pt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-sm font-semibold text-brown sm:text-base tabular-nums">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-brown-muted/60 line-through tabular-nums">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(product.id)}
                          className="rounded border border-brown/15 bg-cream-light px-2.5 py-1 text-xs font-semibold text-brown transition hover:bg-gold hover:text-brown-dark lg:hidden"
                        >
                          {addedId === product.id ? '✓' : '+ Add'}
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

      {/* Mobile Filters Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-cream-light p-6 shadow-xl z-10 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-brown/10 pb-4">
              <h2 className="font-serif text-lg font-medium text-brown">Filter Products</h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-brown-muted hover:text-brown"
                aria-label="Close filters"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Categories */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-brown-muted mb-3">
                Categories
              </h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat
                  const count = categoryCounts[cat] || 0
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition ${
                        isSelected
                          ? 'bg-brown-dark text-white font-semibold'
                          : 'text-brown-muted hover:bg-white hover:text-brown'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={isSelected ? 'text-gold' : 'text-brown-muted/60'}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="mt-8 border-t border-brown/10 pt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-brown-muted">
                  Price Range
                </h3>
                {(minPrice > MIN_BOUND || maxPrice < MAX_BOUND) && (
                  <button
                    type="button"
                    onClick={handleResetPrice}
                    className="text-xs font-medium text-gold-dark"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="mb-4 flex items-center justify-between text-xs font-semibold text-brown tabular-nums">
                <span>{formatCurrency(minPrice)}</span>
                <span className="text-brown-muted/40">—</span>
                <span>{formatCurrency(maxPrice)}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[11px] text-brown-muted mb-1">
                    <span>Min Price</span>
                    <span className="tabular-nums font-medium">{formatCurrency(minPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={MIN_BOUND}
                    max={MAX_BOUND}
                    step={50}
                    value={minPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val <= maxPrice) setMinPrice(val)
                    }}
                    className="h-1.5 w-full cursor-pointer accent-gold bg-cream-card rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-brown-muted mb-1">
                    <span>Max Price</span>
                    <span className="tabular-nums font-medium">{formatCurrency(maxPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min={MIN_BOUND}
                    max={MAX_BOUND}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => {
                      const val = Number(e.target.value)
                      if (val >= minPrice) setMaxPrice(val)
                    }}
                    className="h-1.5 w-full cursor-pointer accent-gold bg-cream-card rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="mt-auto pt-8 border-t border-brown/10 space-y-3">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full btn-dark py-3 text-xs uppercase tracking-wider"
              >
                Show {filteredProducts.length} Results
              </button>

              {isFiltered && (
                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="w-full text-center text-xs text-brown-muted underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Collection
