import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../context/AuthContext'
import { formatCurrency } from '../../utils/formatCurrency'

const CATEGORIES = ['Pooja Kits', 'Incense', 'Decor', 'Dhoop', 'Combos']

export default function AdminDashboard() {
  const { user, isAdmin, toggleAdminMode, signInWithGoogle, signOutUser } = useAuth()

  // Tabs: 'overview' | 'products' | 'orders'
  const [activeTab, setActiveTab] = useState('overview')

  // Stats state
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalSales: 0,
    lowStockCount: 0,
    lowStockProducts: [],
    recentOrders: [],
  })

  // Data state
  const [productsList, setProductsList] = useState([])
  const [ordersList, setOrdersList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter & Search
  const [orderStatusFilter, setOrderStatusFilter] = useState('All')
  const [productCategoryFilter, setProductCategoryFilter] = useState('All')
  const [productSearch, setProductSearch] = useState('')

  // Product modal state (Add / Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productFormData, setProductFormData] = useState({
    name: '',
    subtitle: '',
    description: '',
    price: '',
    originalPrice: '',
    discount: '0',
    category: 'Pooja Kits',
    stock: '20',
    image: '',
    featuresText: '',
  })
  const [uploadingImage, setUploadingImage] = useState(false)

  // Fetch all initial dashboard data
  const fetchDashboardData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsRes, productsRes, ordersRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/products'),
        fetch('/api/orders'),
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData)
      }

      if (productsRes.ok) {
        const prodData = await productsRes.json()
        setProductsList(prodData)
      }

      if (ordersRes.ok) {
        const ordData = await ordersRes.json()
        setOrdersList(ordData)
      }
    } catch (err: any) {
      console.error('Error fetching admin data:', err)
      setError('Failed to connect to database. Please check connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Handle stock adjustment directly
  const handleStockAdjust = async (productId: number, newStock: number) => {
    try {
      const res = await fetch(`/api/products/${productId}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: Math.max(0, newStock) }),
      })
      if (res.ok) {
        const updated = await res.json()
        setProductsList((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, stock: updated.stock, inStock: updated.inStock } : p))
        )
        // Refresh stats
        fetch('/api/dashboard/stats').then((r) => r.json()).then(setStats)
      }
    } catch (err) {
      console.error('Failed to update stock:', err)
    }
  }

  // Open modal for editing
  const handleOpenEditProduct = (prod: any) => {
    setEditingProduct(prod)
    setProductFormData({
      name: prod.name,
      subtitle: prod.subtitle || '',
      description: prod.description || '',
      price: String(prod.price),
      originalPrice: prod.originalPrice ? String(prod.originalPrice) : '',
      discount: String(prod.discount || 0),
      category: prod.category,
      stock: String(prod.stock),
      image: prod.image,
      featuresText: Array.isArray(prod.features) ? prod.features.join('\n') : '',
    })
    setIsProductModalOpen(true)
  }

  // Open modal for adding
  const handleOpenAddProduct = () => {
    setEditingProduct(null)
    setProductFormData({
      name: '',
      subtitle: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: '0',
      category: 'Pooja Kits',
      stock: '25',
      image: '/src/assets/placeholders/product-1.svg',
      featuresText: 'Premium quality materials\nAuthentic ritual essentials',
    })
    setIsProductModalOpen(true)
  }

  // Handle image file upload (converts to data URL & uploads)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        const base64Data = reader.result as string
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data }),
        })
        if (res.ok) {
          const data = await res.json()
          setProductFormData((prev) => ({ ...prev, image: data.url }))
        }
      } catch (uploadErr) {
        console.error('Upload failed:', uploadErr)
      } finally {
        setUploadingImage(false)
      }
    }
    reader.readAsDataURL(file)
  }

  // Save product (Add or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    const features = productFormData.featuresText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const payload = {
      name: productFormData.name,
      subtitle: productFormData.subtitle,
      description: productFormData.description,
      price: Number(productFormData.price),
      originalPrice: productFormData.originalPrice ? Number(productFormData.originalPrice) : null,
      discount: Number(productFormData.discount) || 0,
      category: productFormData.category,
      stock: Number(productFormData.stock) || 0,
      image: productFormData.image || '/src/assets/placeholders/product-1.svg',
      features,
    }

    try {
      if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const updated = await res.json()
          setProductsList((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
          setIsProductModalOpen(false)
          fetchDashboardData()
        }
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const created = await res.json()
          setProductsList((prev) => [...prev, created])
          setIsProductModalOpen(false)
          fetchDashboardData()
        }
      }
    } catch (saveErr) {
      console.error('Failed to save product:', saveErr)
    }
  }

  // Delete product
  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setProductsList((prev) => prev.filter((p) => p.id !== id))
        fetchDashboardData()
      }
    } catch (delErr) {
      console.error('Failed to delete product:', delErr)
    }
  }

  // Update order status (Payment or Delivery)
  const handleUpdateOrderStatus = async (
    orderId: number,
    update: { paymentStatus?: string; deliveryStatus?: string }
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      })
      if (res.ok) {
        const updated = await res.json()
        setOrdersList((prev) => prev.map((o) => (o.id === orderId ? updated : o)))
        fetchDashboardData()
      }
    } catch (err) {
      console.error('Failed to update order status:', err)
    }
  }

  // Filtered lists
  const filteredProducts = productsList.filter((p) => {
    const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter
    const matchesSearch =
      !productSearch ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.subtitle?.toLowerCase().includes(productSearch.toLowerCase())
    return matchesCat && matchesSearch
  })

  const filteredOrders = ordersList.filter((o) => {
    if (orderStatusFilter === 'All') return true
    if (orderStatusFilter === 'Pending') return o.paymentStatus === 'Pending' || o.deliveryStatus === 'Order Placed'
    if (orderStatusFilter === 'Paid') return o.paymentStatus === 'Paid'
    if (orderStatusFilter === 'Shipped') return o.deliveryStatus === 'Shipped'
    if (orderStatusFilter === 'Delivered') return o.deliveryStatus === 'Delivered'
    return o.deliveryStatus === orderStatusFilter
  })

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-brown">
      <Navbar />

      <main className="section-container py-8 md:py-12">
        {/* Top Header & Admin Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-brown/10 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Admin Management Console
              </span>
              <span className="rounded bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[10px] font-medium tracking-wide">
                Database Connected
              </span>
            </div>
            <h1 className="mt-1 font-serif text-3xl font-medium text-brown">
              Store & Inventory Dashboard
            </h1>
          </div>

          {/* Quick Actions & Auth */}
          <div className="flex flex-wrap items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 rounded-lg border border-brown/10 bg-white px-3 py-1.5 shadow-sm">
                <div className="h-6 w-6 rounded-full bg-gold/20 flex items-center justify-center text-xs font-bold text-brown">
                  {user.displayName?.[0] || user.email?.[0] || 'A'}
                </div>
                <span className="text-xs font-medium text-brown truncate max-w-[140px]">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={signOutUser}
                  className="text-xs text-brown-muted hover:text-brown underline ml-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                className="inline-flex items-center gap-2 rounded-lg border border-brown/15 bg-white px-3.5 py-2 text-xs font-medium text-brown shadow-sm transition hover:border-gold hover:text-gold-dark"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign In with Google
              </button>
            )}

            <button
              type="button"
              onClick={handleOpenAddProduct}
              className="btn-dark px-4 py-2 text-xs uppercase tracking-wider font-semibold shadow-sm"
            >
              + Add New Product
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-brown/10 mt-6 gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-sm font-semibold uppercase tracking-wider transition-colors relative ${
              activeTab === 'overview'
                ? 'text-brown border-b-2 border-gold-dark'
                : 'text-brown-muted hover:text-brown'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-sm font-semibold uppercase tracking-wider transition-colors relative flex items-center gap-2 ${
              activeTab === 'products'
                ? 'text-brown border-b-2 border-gold-dark'
                : 'text-brown-muted hover:text-brown'
            }`}
          >
            <span>Products & Inventory</span>
            <span className="rounded-full bg-cream-card px-2 py-0.5 text-xs text-brown font-mono">
              {productsList.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-semibold uppercase tracking-wider transition-colors relative flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'text-brown border-b-2 border-gold-dark'
                : 'text-brown-muted hover:text-brown'
            }`}
          >
            <span>Customer Orders</span>
            <span className="rounded-full bg-cream-card px-2 py-0.5 text-xs text-brown font-mono">
              {ordersList.length}
            </span>
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-amber-50 p-4 border border-amber-200 text-sm text-amber-800">
            {error}
          </div>
        )}

        {/* --- TAB 1: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-10">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Total Orders */}
              <div className="rounded-xl border border-brown/8 bg-white p-6 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-brown-muted">
                  Total Orders
                </span>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-semibold text-brown tabular-nums">
                    {stats.totalOrders}
                  </span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    All Time
                  </span>
                </div>
                <p className="mt-2 text-xs text-brown-muted">Processed through storefront</p>
              </div>

              {/* Pending Orders */}
              <div className="rounded-xl border border-brown/8 bg-white p-6 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-brown-muted">
                  Pending Orders
                </span>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-semibold text-amber-700 tabular-nums">
                    {stats.pendingOrders}
                  </span>
                  <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-medium">
                    Needs Action
                  </span>
                </div>
                <p className="mt-2 text-xs text-brown-muted">Awaiting fulfillment or payment</p>
              </div>

              {/* Total Sales */}
              <div className="rounded-xl border border-brown/8 bg-white p-6 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-brown-muted">
                  Total Sales
                </span>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-serif text-3xl font-semibold text-brown tabular-nums">
                    {formatCurrency(stats.totalSales)}
                  </span>
                  <span className="text-xs text-gold-dark bg-gold/10 px-2 py-0.5 rounded font-medium">
                    Revenue
                  </span>
                </div>
                <p className="mt-2 text-xs text-brown-muted">From confirmed customer orders</p>
              </div>

              {/* Low-Stock Products */}
              <div className="rounded-xl border border-brown/8 bg-white p-6 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-brown-muted">
                  Low-Stock Items
                </span>
                <div className="mt-3 flex items-baseline justify-between">
                  <span
                    className={`font-serif text-3xl font-semibold tabular-nums ${
                      stats.lowStockCount > 0 ? 'text-rose-700' : 'text-brown'
                    }`}
                  >
                    {stats.lowStockCount}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${
                      stats.lowStockCount > 0
                        ? 'text-rose-800 bg-rose-50'
                        : 'text-emerald-700 bg-emerald-50'
                    }`}
                  >
                    &lt; 10 Units
                  </span>
                </div>
                <p className="mt-2 text-xs text-brown-muted">Requires replenishment</p>
              </div>
            </div>

            {/* Low Stock Alerts & Recent Orders Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Low Stock Watchlist */}
              <div className="rounded-xl border border-brown/8 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-brown/10">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-brown">
                      Low-Stock Watchlist
                    </h3>
                    <p className="text-xs text-brown-muted">Items running low in inventory</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="text-xs font-medium text-gold-dark hover:underline"
                  >
                    View All Products →
                  </button>
                </div>

                <div className="mt-4 divide-y divide-brown/5">
                  {stats.lowStockProducts.length === 0 ? (
                    <p className="py-6 text-center text-sm text-brown-muted">
                      All inventory stock levels are healthy!
                    </p>
                  ) : (
                    stats.lowStockProducts.map((p: any) => (
                      <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.image}
                            alt=""
                            className="h-10 w-10 rounded object-contain bg-cream-card p-1 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-brown truncate">{p.name}</p>
                            <span className="text-[11px] text-brown-muted">{p.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="rounded bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-800 tabular-nums">
                            {p.stock} left
                          </span>
                          <button
                            type="button"
                            onClick={() => handleStockAdjust(p.id, p.stock + 10)}
                            className="rounded border border-brown/15 bg-white px-2 py-1 text-xs text-brown hover:border-gold hover:text-gold-dark"
                          >
                            +10 Stock
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="rounded-xl border border-brown/8 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-brown/10">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-brown">
                      Recent Activity
                    </h3>
                    <p className="text-xs text-brown-muted">Latest customer transactions</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-medium text-gold-dark hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="mt-4 divide-y divide-brown/5">
                  {stats.recentOrders.length === 0 ? (
                    <p className="py-6 text-center text-sm text-brown-muted">No orders found.</p>
                  ) : (
                    stats.recentOrders.map((o: any) => (
                      <div key={o.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-brown font-mono">
                              {o.orderNumber}
                            </span>
                            <span className="text-xs text-brown-muted">· {o.customerName}</span>
                          </div>
                          <p className="text-[11px] text-brown-muted/70 mt-0.5">
                            {new Date(o.createdAt).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-semibold text-brown tabular-nums">
                            {formatCurrency(o.totalAmount)}
                          </span>
                          <div className="mt-0.5">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                                o.paymentStatus === 'Paid'
                                  ? 'bg-emerald-50 text-emerald-800'
                                  : 'bg-amber-50 text-amber-800'
                              }`}
                            >
                              {o.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: PRODUCTS & INVENTORY --- */}
        {activeTab === 'products' && (
          <div className="mt-8 space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-brown/8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-brown-muted uppercase tracking-wider mr-1">
                  Category:
                </span>
                {['All', ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProductCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      productCategoryFilter === cat
                        ? 'bg-brown-dark text-white'
                        : 'bg-cream-card text-brown-muted hover:text-brown'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full rounded-lg border border-brown/15 bg-cream-light/50 px-3.5 py-1.5 text-xs text-brown outline-none focus:border-gold"
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-xl border border-brown/8 bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f8f5ee] border-b border-brown/10 text-brown uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Inventory Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brown/5 text-brown">
                  {filteredProducts.map((p) => {
                    const isLow = p.stock < 10 && p.stock > 0
                    const isOut = p.stock === 0
                    return (
                      <tr key={p.id} className="hover:bg-cream-card/30 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt=""
                              className="h-12 w-12 rounded-lg object-contain bg-cream-card p-1 shrink-0 border border-brown/5"
                            />
                            <div>
                              <p className="font-serif text-sm font-medium text-brown line-clamp-1">
                                {p.name}
                              </p>
                              <p className="text-[11px] text-brown-muted line-clamp-1">
                                {p.subtitle}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-medium text-brown-muted">
                          {p.category}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-semibold text-brown tabular-nums">
                              {formatCurrency(p.price)}
                            </span>
                            {p.originalPrice && p.originalPrice > p.price && (
                              <span className="text-[10px] text-brown-muted line-through tabular-nums">
                                {formatCurrency(p.originalPrice)}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Direct Stock Steppers */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleStockAdjust(p.id, p.stock - 1)}
                              className="h-6 w-6 rounded border border-brown/20 bg-white flex items-center justify-center font-bold text-brown hover:bg-gold/15"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="0"
                              value={p.stock}
                              onChange={(e) => handleStockAdjust(p.id, Number(e.target.value))}
                              className="w-14 rounded border border-brown/15 bg-white text-center py-1 text-xs font-semibold tabular-nums text-brown outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleStockAdjust(p.id, p.stock + 1)}
                              className="h-6 w-6 rounded border border-brown/20 bg-white flex items-center justify-center font-bold text-brown hover:bg-gold/15"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {isOut ? (
                            <span className="rounded bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-semibold">
                              Out of Stock
                            </span>
                          ) : isLow ? (
                            <span className="rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-semibold">
                              Low Stock ({p.stock})
                            </span>
                          ) : (
                            <span className="rounded bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-semibold">
                              In Stock ({p.stock})
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditProduct(p)}
                              className="rounded border border-brown/15 px-2.5 py-1 text-xs font-medium text-brown hover:border-gold hover:text-gold-dark transition"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p.id)}
                              className="rounded border border-rose-200 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-50 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB 3: CUSTOMER ORDERS --- */}
        {activeTab === 'orders' && (
          <div className="mt-8 space-y-6">
            {/* Status Filter Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs font-semibold text-brown-muted uppercase tracking-wider mr-2 shrink-0">
                Filter Status:
              </span>
              {['All', 'Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setOrderStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                    orderStatusFilter === status
                      ? 'bg-brown-dark text-white'
                      : 'bg-white border border-brown/10 text-brown-muted hover:text-brown'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Orders Cards List */}
            <div className="space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="rounded-xl border border-dashed border-brown/15 bg-white p-12 text-center text-brown-muted">
                  No orders match this filter.
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-brown/10 bg-white p-5 sm:p-6 shadow-sm transition hover:border-gold/40"
                  >
                    {/* Top Row: Order ID, Date, Totals */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brown/5 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-brown">
                          {order.orderNumber}
                        </span>
                        <span className="text-xs text-brown-muted">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-serif text-lg font-semibold text-brown tabular-nums">
                          {formatCurrency(order.totalAmount)}
                        </span>
                      </div>
                    </div>

                    {/* Middle Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                      {/* Customer Details */}
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-brown-muted mb-1">
                          Customer Details
                        </p>
                        <p className="font-medium text-sm text-brown">{order.customerName}</p>
                        <p className="text-xs text-brown-muted">{order.customerEmail}</p>
                        {order.customerPhone && (
                          <p className="text-xs text-brown-muted">{order.customerPhone}</p>
                        )}
                        <p className="text-xs text-brown-muted/80 mt-2 bg-cream-card/50 p-2 rounded border border-brown/5">
                          📍 {order.shippingAddress}
                        </p>
                      </div>

                      {/* Ordered Items */}
                      <div className="md:col-span-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-brown-muted mb-2">
                          Order Items ({order.items?.length || 0})
                        </p>
                        <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                          {order.items?.map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs py-1 border-b border-brown/5"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gold-dark font-mono">
                                  {item.quantity}×
                                </span>
                                <span className="text-brown">{item.name}</span>
                              </div>
                              <span className="font-semibold text-brown tabular-nums">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status Controllers */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-brown/5 pt-4 bg-[#faf7f2]/50 -mx-5 -mb-5 p-4 rounded-b-xl">
                      {/* Payment Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-brown-muted">Payment:</span>
                        <select
                          value={order.paymentStatus}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order.id, { paymentStatus: e.target.value })
                          }
                          className={`rounded border text-xs font-semibold px-2.5 py-1 outline-none cursor-pointer ${
                            order.paymentStatus === 'Paid'
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                              : 'border-amber-300 bg-amber-50 text-amber-800'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </div>

                      {/* Delivery Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-brown-muted">Delivery:</span>
                        <select
                          value={order.deliveryStatus}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order.id, { deliveryStatus: e.target.value })
                          }
                          className="rounded border border-brown/20 bg-white text-xs font-medium px-2.5 py-1 text-brown outline-none cursor-pointer"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* --- ADD / EDIT PRODUCT MODAL --- */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsProductModalOpen(false)}
            />

            <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-brown/10">
                <h2 className="font-serif text-xl font-medium text-brown">
                  {editingProduct ? 'Edit Product & Inventory' : 'Add New Catalogue Product'}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="text-brown-muted hover:text-brown text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-brown mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) =>
                      setProductFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                    placeholder="e.g. Pure Brass Aarti Diya"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brown mb-1">
                      Category *
                    </label>
                    <select
                      value={productFormData.category}
                      onChange={(e) =>
                        setProductFormData((p) => ({ ...p, category: e.target.value }))
                      }
                      className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold bg-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brown mb-1">
                      Inventory Stock Units *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={productFormData.stock}
                      onChange={(e) =>
                        setProductFormData((p) => ({ ...p, stock: e.target.value }))
                      }
                      className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brown mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={productFormData.price}
                      onChange={(e) =>
                        setProductFormData((p) => ({ ...p, price: e.target.value }))
                      }
                      className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brown mb-1">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={productFormData.originalPrice}
                      onChange={(e) =>
                        setProductFormData((p) => ({ ...p, originalPrice: e.target.value }))
                      }
                      className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brown mb-1">
                      Discount %
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={productFormData.discount}
                      onChange={(e) =>
                        setProductFormData((p) => ({ ...p, discount: e.target.value }))
                      }
                      className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Photo Upload & Preview */}
                <div>
                  <label className="block text-xs font-semibold text-brown mb-1">
                    Product Photo (Upload or URL)
                  </label>
                  <div className="flex items-center gap-4">
                    <img
                      src={productFormData.image || '/src/assets/placeholders/product-1.svg'}
                      alt="Preview"
                      className="h-16 w-16 rounded-lg object-contain bg-cream-card p-1 border border-brown/10 shrink-0"
                    />
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="text-xs text-brown-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-cream-card file:text-brown hover:file:bg-gold/20 cursor-pointer"
                      />
                      {uploadingImage && (
                        <p className="text-xs text-gold-dark mt-1">Uploading photo...</p>
                      )}
                      <input
                        type="text"
                        value={productFormData.image}
                        onChange={(e) =>
                          setProductFormData((p) => ({ ...p, image: e.target.value }))
                        }
                        placeholder="Or enter image URL"
                        className="mt-2 w-full rounded border border-brown/15 px-2.5 py-1 text-xs text-brown outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown mb-1">
                    Subtitle / Short Tagline
                  </label>
                  <input
                    type="text"
                    value={productFormData.subtitle}
                    onChange={(e) =>
                      setProductFormData((p) => ({ ...p, subtitle: e.target.value }))
                    }
                    className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                    placeholder="e.g. Sacred aroma for peaceful rituals"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={productFormData.description}
                    onChange={(e) =>
                      setProductFormData((p) => ({ ...p, description: e.target.value }))
                    }
                    className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brown mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    rows={2}
                    value={productFormData.featuresText}
                    onChange={(e) =>
                      setProductFormData((p) => ({ ...p, featuresText: e.target.value }))
                    }
                    className="w-full rounded-lg border border-brown/20 px-3 py-2 text-sm text-brown outline-none focus:border-gold font-mono text-xs"
                    placeholder="100% pure cast brass&#10;Heirloom finish"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-brown/10">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="rounded-lg border border-brown/15 px-4 py-2 text-xs font-medium text-brown hover:bg-cream-card"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-dark px-5 py-2 text-xs uppercase tracking-wider font-semibold"
                  >
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
