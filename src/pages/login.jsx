import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

function GoogleIcon() {
  return (
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
  )
}

function Login() {
  const { user, isConfigured, signIn, signUp, signInWithGoogle, signOut } = useAuth()
  const navigate = useNavigate()

  const [mode, setMode] = useState('signin') // 'signin' or 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setIsSubmitting(true)

    if (mode === 'signin') {
      const { error } = await signIn({ email, password })
      setIsSubmitting(false)
      if (error) {
        setErrorMsg(error.message || 'Failed to sign in. Please verify your credentials.')
      } else {
        navigate('/')
      }
    } else {
      const { error } = await signUp({ email, password, fullName })
      setIsSubmitting(false)
      if (error) {
        setErrorMsg(error.message || 'Failed to create account.')
      } else {
        setSuccessMsg(
          isConfigured
            ? 'Account created! Please check your email inbox to confirm your registration.'
            : 'Account created and signed in successfully!'
        )
        if (!isConfigured) {
          navigate('/')
        }
      }
    }
  }

  const handleGoogleLogin = async () => {
    setErrorMsg('')
    const { error } = await signInWithGoogle()
    if (error) {
      setErrorMsg(error.message || 'Google sign-in could not be completed.')
    }
  }

  return (
    <div className="min-h-screen bg-cream-light text-brown flex flex-col">
      <Navbar />

      <main className="section-container flex-1 flex items-center justify-center py-12 md:py-20">
        <div className="w-full max-w-md rounded-2xl border border-brown/10 bg-white p-7 shadow-card sm:p-9">
          {user ? (
            /* Logged In View */
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-2xl font-serif text-gold-dark font-bold">
                {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'S'}
              </div>

              <h1 className="mt-4 font-serif text-2xl font-medium text-brown">
                Welcome, {user.user_metadata?.full_name || user.email?.split('@')[0]}
              </h1>

              <p className="mt-1 text-xs text-brown-muted">{user.email}</p>

              <div className="mt-6 space-y-3">
                <Link
                  to="/orders"
                  className="btn-dark w-full py-3 text-xs uppercase tracking-wider font-semibold block"
                >
                  View My Orders
                </Link>

                <Link
                  to="/collection"
                  className="btn-outline w-full py-2.5 text-xs uppercase tracking-wider block"
                >
                  Browse Catalogue
                </Link>

                <button
                  type="button"
                  onClick={() => signOut()}
                  className="w-full text-xs text-red-700 hover:underline pt-2 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            /* Auth Form */
            <div>
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                  ShriTattvam Account
                </p>
                <h1 className="mt-1 font-serif text-2xl font-medium text-brown sm:text-3xl">
                  {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
                </h1>
                <p className="mt-1 text-xs text-brown-muted">
                  {mode === 'signin'
                    ? 'Sign in to access your sacred orders and addresses.'
                    : 'Join ShriTattvam to track orders and save your wishlist.'}
                </p>
              </div>

              {/* Mode Tabs */}
              <div className="mt-6 flex rounded-lg border border-brown/10 bg-cream-light p-1 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin')
                    setErrorMsg('')
                  }}
                  className={`flex-1 rounded-md py-2 transition ${
                    mode === 'signin'
                      ? 'bg-white text-brown font-semibold shadow-xs'
                      : 'text-brown-muted hover:text-brown'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup')
                    setErrorMsg('')
                  }}
                  className={`flex-1 rounded-md py-2 transition ${
                    mode === 'signup'
                      ? 'bg-white text-brown font-semibold shadow-xs'
                      : 'text-brown-muted hover:text-brown'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Feedback messages */}
              {errorMsg && (
                <div className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 border border-emerald-200">
                  {successMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                      Full Name
                    </label>
                    <input
                      className="checkout-input mt-1"
                      type="text"
                      required
                      placeholder="e.g. Rameshwar Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                    Email Address
                  </label>
                  <input
                    className="checkout-input mt-1"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-brown-muted font-semibold">
                    Password
                  </label>
                  <input
                    className="checkout-input mt-1"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-dark w-full py-3.5 text-xs uppercase tracking-wider font-semibold shadow-sm transition disabled:opacity-50"
                >
                  {isSubmitting
                    ? 'Processing...'
                    : mode === 'signin'
                    ? 'Sign In with Supabase'
                    : 'Create Account'}
                </button>
              </form>

              {/* Social Login Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-brown/10" />
                </div>
                <span className="relative bg-white px-3 text-[11px] uppercase tracking-wider text-brown-muted">
                  Or continue with
                </span>
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-brown/15 bg-white py-2.5 text-xs font-semibold text-brown transition hover:bg-cream-light shadow-2xs"
              >
                <GoogleIcon />
                <span>Google</span>
              </button>

              <div className="mt-6 text-center">
                <Link
                  to="/collection"
                  className="text-xs text-brown-muted hover:text-brown underline underline-offset-4"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
