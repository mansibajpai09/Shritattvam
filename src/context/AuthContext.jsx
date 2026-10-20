import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleAuthProvider } from '../lib/firebase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [dbUser, setDbUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [adminBypass, setAdminBypass] = useState(() => {
    return localStorage.getItem('shritattvam_admin_mode') === 'true'
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        try {
          const res = await fetch('/api/users/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
            }),
          })
          if (res.ok) {
            const data = await res.json()
            setDbUser(data)
          }
        } catch (err) {
          console.error('Failed to sync user with DB:', err)
        }
      } else {
        setDbUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider)
      return result.user
    } catch (error) {
      console.error('Google Sign-In Error:', error)
      throw error
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setDbUser(null)
    } catch (error) {
      console.error('Sign-Out Error:', error)
    }
  }

  const toggleAdminMode = () => {
    const next = !adminBypass
    setAdminBypass(next)
    localStorage.setItem('shritattvam_admin_mode', String(next))
  }

  const isAdmin = adminBypass || dbUser?.role === 'admin' || user?.email?.includes('admin')

  return (
    <AuthContext.Provider
      value={{
        user,
        dbUser,
        loading,
        isAdmin,
        adminBypass,
        toggleAdminMode,
        signInWithGoogle,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
