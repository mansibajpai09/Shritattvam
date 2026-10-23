import { createClient } from '@supabase/supabase-js'

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Helper to check if production credentials have been configured
export const isSupabaseConfigured = () => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-ref') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.length > 20 &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
  )
}

// Fallback in-memory and localStorage client when real keys are not yet provided
function createFallbackClient() {
  const LOCAL_STORAGE_USERS_KEY = 'shritattvam_supabase_mock_users'
  const LOCAL_STORAGE_SESSION_KEY = 'shritattvam_supabase_mock_session'
  const LOCAL_STORAGE_ORDERS_KEY = 'shritattvam_supabase_mock_orders'

  const getStoredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || '[]')
    } catch {
      return []
    }
  }

  const getStoredOrders = () => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY) || '[]')
    } catch {
      return []
    }
  }

  const getStoredSession = () => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_SESSION_KEY) || 'null')
    } catch {
      return null
    }
  }

  const authListeners = new Set()
  const notifyListeners = (event, session) => {
    authListeners.forEach((callback) => {
      try {
        callback(event, session)
      } catch (e) {
        console.error('Error in mock auth listener', e)
      }
    })
  }

  return {
    isMock: true,
    auth: {
      getSession: async () => {
        const session = getStoredSession()
        return { data: { session }, error: null }
      },
      getUser: async () => {
        const session = getStoredSession()
        return { data: { user: session?.user || null }, error: null }
      },
      signUp: async ({ email, password, options }) => {
        const users = getStoredUsers()
        if (users.find((u) => u.email === email)) {
          return { data: { user: null, session: null }, error: new Error('User already registered') }
        }
        const newUser = {
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          email,
          user_metadata: options?.data || {},
          created_at: new Date().toISOString(),
        }
        users.push({ ...newUser, password })
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users))

        const session = {
          access_token: `mock_jwt_${Date.now()}`,
          user: newUser,
        }
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session))
        notifyListeners('SIGNED_IN', session)
        return { data: { user: newUser, session }, error: null }
      },
      signInWithPassword: async ({ email, password }) => {
        const users = getStoredUsers()
        const found = users.find((u) => u.email === email && u.password === password)
        if (!found) {
          // Allow demo quick login with any email/password if none exist yet
          if (users.length === 0) {
            const demoUser = {
              id: `usr_${Date.now()}`,
              email,
              user_metadata: { full_name: email.split('@')[0] },
              created_at: new Date().toISOString(),
            }
            users.push({ ...demoUser, password })
            localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users))
            const session = { access_token: `mock_jwt_${Date.now()}`, user: demoUser }
            localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session))
            notifyListeners('SIGNED_IN', session)
            return { data: { user: demoUser, session }, error: null }
          }
          return { data: { user: null, session: null }, error: new Error('Invalid email or password') }
        }
        const userSafe = { ...found }
        delete userSafe.password
        const session = {
          access_token: `mock_jwt_${Date.now()}`,
          user: userSafe,
        }
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session))
        notifyListeners('SIGNED_IN', session)
        return { data: { user: userSafe, session }, error: null }
      },
      signInWithOAuth: async ({ provider }) => {
        const demoUser = {
          id: `usr_oauth_${Date.now()}`,
          email: 'devotee@shritattvam.com',
          user_metadata: { full_name: 'Shri Tattvam Devotee', avatar_url: '' },
          created_at: new Date().toISOString(),
        }
        const session = { access_token: `mock_oauth_jwt_${Date.now()}`, user: demoUser }
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session))
        notifyListeners('SIGNED_IN', session)
        return { data: { provider, url: null }, error: null }
      },
      signOut: async () => {
        localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY)
        notifyListeners('SIGNED_OUT', null)
        return { error: null }
      },
      onAuthStateChange: (callback) => {
        authListeners.add(callback)
        const session = getStoredSession()
        callback(session ? 'INITIAL_SESSION' : 'SIGNED_OUT', session)
        return {
          data: {
            subscription: {
              unsubscribe: () => authListeners.delete(callback),
            },
          },
        }
      },
    },
    from: (table) => {
      return {
        select: () => ({
          order: () => ({
            eq: async (field, val) => {
              if (table === 'orders') {
                const orders = getStoredOrders().filter((o) => o[field] === val)
                return { data: orders, error: null }
              }
              return { data: [], error: null }
            },
            then: (resolve) => {
              if (table === 'orders') {
                const orders = getStoredOrders()
                resolve({ data: orders, error: null })
              } else {
                resolve({ data: [], error: null })
              }
            },
          }),
          eq: async (field, val) => {
            if (table === 'orders') {
              const orders = getStoredOrders().filter((o) => o[field] === val)
              return { data: orders, error: null }
            }
            return { data: [], error: null }
          },
          then: (resolve) => {
            if (table === 'orders') {
              const orders = getStoredOrders()
              resolve({ data: orders, error: null })
            } else {
              resolve({ data: [], error: null })
            }
          },
        }),
        insert: async (rows) => {
          const rowList = Array.isArray(rows) ? rows : [rows]
          if (table === 'orders') {
            const current = getStoredOrders()
            const inserted = rowList.map((r) => ({
              id: `ord_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              created_at: new Date().toISOString(),
              ...r,
            }))
            localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify([...inserted, ...current]))
            return { data: inserted, error: null }
          }
          return { data: rowList, error: null }
        },
      }
    },
    storage: {
      from: (bucket) => ({
        upload: async (path) => {
          return {
            data: { path, id: `file_${Date.now()}` },
            error: null,
          }
        },
        getPublicUrl: (path) => ({
          data: {
            publicUrl: `https://mock-supabase.local/storage/v1/object/public/${bucket}/${path}`,
          },
        }),
      }),
    },
  }
}

// Export the singleton supabase client
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createFallbackClient()
