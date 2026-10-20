import express from 'express'
import { createServer as createViteServer } from 'vite'
import * as dotenv from 'dotenv'
import { eq, desc, sql, lte } from 'drizzle-orm'
import { db } from './src/db/index.ts'
import { products, orders, users } from './src/db/schema.ts'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 3000

// Body parsers with generous limit for photo uploads (base64 images)
app.use(express.json({ limit: '15mb' }))
app.use(express.urlencoded({ extended: true, limit: '15mb' }))

// --- API ROUTES ---

// 1. Dashboard Overview Stats
app.get('/api/dashboard/stats', async (_req, res) => {
  try {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt))
    const allProducts = await db.select().from(products).orderBy(products.id)

    const totalOrders = allOrders.length
    const pendingOrders = allOrders.filter(
      (o) => o.deliveryStatus === 'Order Placed' || o.deliveryStatus === 'Processing' || o.paymentStatus === 'Pending'
    ).length

    const totalSales = allOrders.reduce((sum, o) => {
      return o.paymentStatus === 'Paid' ? sum + o.totalAmount : sum
    }, 0)

    const lowStockProducts = allProducts.filter((p) => p.stock < 10)
    const lowStockCount = lowStockProducts.length

    res.json({
      totalOrders,
      pendingOrders,
      totalSales,
      lowStockCount,
      lowStockProducts,
      recentOrders: allOrders.slice(0, 5),
    })
  } catch (error: any) {
    console.error('Failed to get dashboard stats:', error)
    res.status(500).json({ error: 'Failed to fetch dashboard stats' })
  }
})

// 2. Products List
app.get('/api/products', async (_req, res) => {
  try {
    const list = await db.select().from(products).orderBy(products.id)
    res.json(list)
  } catch (error: any) {
    console.error('Failed to fetch products:', error)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

// 3. Add Product
app.post('/api/products', async (req, res) => {
  try {
    const {
      name,
      subtitle,
      description,
      price,
      originalPrice,
      discount,
      image,
      category,
      stock = 25,
      features = [],
    } = req.body

    if (!name || price == null || !category) {
      return res.status(400).json({ error: 'Name, price and category are required' })
    }

    const [newProduct] = await db
      .insert(products)
      .values({
        name,
        subtitle: subtitle || '',
        description: description || '',
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : null,
        discount: discount ? Number(discount) : 0,
        image: image || '/src/assets/placeholders/product-1.svg',
        category,
        stock: Number(stock),
        inStock: Number(stock) > 0,
        features: Array.isArray(features) ? features : [],
      })
      .returning()

    res.status(201).json(newProduct)
  } catch (error: any) {
    console.error('Failed to add product:', error)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

// 4. Update Product
app.put('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const {
      name,
      subtitle,
      description,
      price,
      originalPrice,
      discount,
      image,
      category,
      stock,
      features,
    } = req.body

    const updateData: any = {
      updatedAt: new Date(),
    }
    if (name !== undefined) updateData.name = name
    if (subtitle !== undefined) updateData.subtitle = subtitle
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = Number(price)
    if (originalPrice !== undefined) updateData.originalPrice = originalPrice ? Number(originalPrice) : null
    if (discount !== undefined) updateData.discount = Number(discount)
    if (image !== undefined) updateData.image = image
    if (category !== undefined) updateData.category = category
    if (stock !== undefined) {
      updateData.stock = Number(stock)
      updateData.inStock = Number(stock) > 0
    }
    if (features !== undefined) updateData.features = features

    const [updated] = await db
      .update(products)
      .set(updateData)
      .where(eq(products.id, id))
      .returning()

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(updated)
  } catch (error: any) {
    console.error('Failed to update product:', error)
    res.status(500).json({ error: 'Failed to update product' })
  }
})

// 5. Adjust Product Stock
app.patch('/api/products/:id/stock', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { stock } = req.body

    if (stock == null) {
      return res.status(400).json({ error: 'Stock number required' })
    }

    const newStock = Math.max(0, Number(stock))
    const [updated] = await db
      .update(products)
      .set({
        stock: newStock,
        inStock: newStock > 0,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning()

    res.json(updated)
  } catch (error: any) {
    console.error('Failed to adjust stock:', error)
    res.status(500).json({ error: 'Failed to adjust stock' })
  }
})

// 6. Delete Product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await db.delete(products).where(eq(products.id, id))
    res.json({ success: true, id })
  } catch (error: any) {
    console.error('Failed to delete product:', error)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

// 7. Orders List
app.get('/api/orders', async (_req, res) => {
  try {
    const list = await db.select().from(orders).orderBy(desc(orders.createdAt))
    res.json(list)
  } catch (error: any) {
    console.error('Failed to fetch orders:', error)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

// 8. Create Order (from Storefront Checkout)
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      totalAmount,
      paymentStatus = 'Pending',
      deliveryStatus = 'Order Placed',
    } = req.body

    if (!customerName || !customerEmail || !shippingAddress || !items || !totalAmount) {
      return res.status(400).json({ error: 'Missing required order details' })
    }

    const orderNumber = 'ST-' + Math.floor(1000 + Math.random() * 9000)

    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber,
        customerName,
        customerEmail,
        customerPhone: customerPhone || '',
        shippingAddress,
        items,
        totalAmount: Number(totalAmount),
        paymentStatus,
        deliveryStatus,
      })
      .returning()

    // Decrement stock for ordered items
    for (const item of items) {
      if (item.productId && item.quantity) {
        try {
          await db
            .update(products)
            .set({
              stock: sql`GREATEST(0, ${products.stock} - ${Number(item.quantity)})`,
              updatedAt: new Date(),
            })
            .where(eq(products.id, item.productId))
        } catch (stockErr) {
          console.warn('Failed to decrement stock for item:', item.productId, stockErr)
        }
      }
    }

    res.status(201).json(newOrder)
  } catch (error: any) {
    console.error('Failed to create order:', error)
    res.status(500).json({ error: 'Failed to create order' })
  }
})

// 9. Update Order Status (Payment Status & Delivery Status)
app.patch('/api/orders/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { paymentStatus, deliveryStatus } = req.body

    const updateData: any = {}
    if (paymentStatus) updateData.paymentStatus = paymentStatus
    if (deliveryStatus) updateData.deliveryStatus = deliveryStatus

    const [updated] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning()

    if (!updated) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json(updated)
  } catch (error: any) {
    console.error('Failed to update order status:', error)
    res.status(500).json({ error: 'Failed to update order' })
  }
})

// 10. Photo Upload endpoint (accepts data URL or image payload and stores it)
app.post('/api/upload', (req, res) => {
  try {
    const { image } = req.body
    if (!image) {
      return res.status(400).json({ error: 'No image provided' })
    }
    // Return the image data URL directly for high-fidelity rendering
    res.json({ url: image })
  } catch (error: any) {
    res.status(500).json({ error: 'Upload failed' })
  }
})

// 11. Sync authenticated user to database
app.post('/api/users/sync', async (req, res) => {
  try {
    const { uid, email, displayName } = req.body
    if (!uid || !email) {
      return res.status(400).json({ error: 'UID and email required' })
    }

    const [user] = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'customer',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          displayName: displayName || email.split('@')[0],
        },
      })
      .returning()

    res.json(user)
  } catch (error: any) {
    console.error('Failed to sync user:', error)
    res.status(500).json({ error: 'Failed to sync user' })
  }
})

// Mount Vite middleware in development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production'

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    })
    app.use(vite.middlewares)
  } else {
    app.use(express.static('dist'))
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' })
    })
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ShriTattvam Server listening on http://0.0.0.0:${PORT}`)
  })
}

startServer().catch((err) => {
  console.error('Failed to start server:', err)
})
