import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Helper to determine if actual credentials have been supplied
export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-ref') &&
    supabaseAnonKey.length > 20 &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
  )
}

/**
 * Supabase client instance.
 * Initialized with environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null

/**
 * Minimal connection check without modifying or inserting data.
 * Checks if Supabase credentials exist and tests authentication service ping.
 */
export async function checkSupabaseConnection() {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      error: 'Supabase credentials not configured in .env (missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY)',
    }
  }

  try {
    const { error } = await supabase.auth.getSession()
    if (error) {
      return { connected: false, error: error.message }
    }
    return { connected: true, error: null }
  } catch (err) {
    return { connected: false, error: err.message || 'Connection failed' }
  }
}
