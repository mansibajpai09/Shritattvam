import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { products as localProducts } from '../data/products'

/**
 * Fetch products: checks Supabase 'products' table first if configured,
 * otherwise falls back cleanly to the static catalogue.
 */
export async function fetchProducts() {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })

      if (!error && data && data.length > 0) {
        return data
      }
    } catch (err) {
      console.warn('Supabase products fetch fallback to local:', err)
    }
  }
  return localProducts
}

/**
 * Create a new order in Supabase
 */
export async function createOrder({
  userId,
  customerName,
  customerEmail,
  shippingAddress,
  phone,
  items,
  subtotal,
  discount,
  shipping,
  total,
}) {
  const orderPayload = {
    user_id: userId || null,
    customer_name: customerName,
    customer_email: customerEmail,
    shipping_address: shippingAddress,
    phone,
    items,
    subtotal,
    discount,
    shipping,
    total,
    status: 'Confirmed',
    created_at: new Date().toISOString(),
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderPayload])
      .select()

    if (error) throw error
    return { data: data?.[0] || orderPayload, error: null }
  } catch (err) {
    console.error('Failed to save order to Supabase:', err)
    return { data: null, error: err }
  }
}

/**
 * Fetch user's orders from Supabase
 */
export async function fetchUserOrders(userId) {
  try {
    let query = supabase.from('orders').select('*')
    if (userId) {
      query = query.eq('user_id', userId)
    }
    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return { data: data || [], error: null }
  } catch (err) {
    console.error('Failed to fetch orders from Supabase:', err)
    return { data: [], error: err }
  }
}

/**
 * Upload a product or receipt file to Supabase Storage
 */
export async function uploadToStorage(bucketName, filePath, file) {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) throw error

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path)

    return {
      path: data.path,
      url: publicUrlData.publicUrl,
      error: null,
    }
  } catch (err) {
    console.error('Storage upload failed:', err)
    return { path: null, url: null, error: err }
  }
}
