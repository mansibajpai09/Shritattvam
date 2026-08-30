import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { getProductById } from '../data/products'
import { validateCoupon } from '../data/coupons'

export const FREE_SHIPPING_THRESHOLD = 999
export const STANDARD_SHIPPING = 60

const STORAGE_KEY = 'shritatvam-cart'

const initialState = {
  items: [],
  appliedCoupon: null,
  couponError: null,
}

function getInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) return initialState

    const parsed = JSON.parse(saved)

    return {
      ...initialState,
      items: Array.isArray(parsed.items) ? parsed.items : [],
      appliedCoupon: parsed.appliedCoupon || null,
    }
  } catch {
    return initialState
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(
        (item) => item.productId === action.productId
      )

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === action.productId
              ? {
                  ...item,
                  quantity: item.quantity + action.quantity,
                }
              : item
          ),
        }
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: action.productId,
            quantity: action.quantity,
          },
        ],
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.productId
        ),
      }

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.productId === action.productId
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      }

    case 'CLEAR_CART':
      return initialState

    case 'APPLY_COUPON':
      return {
        ...state,
        appliedCoupon: action.coupon,
        couponError: null,
      }

    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null,
        couponError: null,
      }

    case 'SET_COUPON_ERROR':
      return {
        ...state,
        couponError: action.error,
      }

    default:
      return state
  }
}

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialState
  )

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
      })
    )
  }, [state.items, state.appliedCoupon])

  const cartItems = useMemo(() => {
    return state.items
      .map((item) => {
        const product = getProductById(item.productId)

        if (!product) return null

        return {
          ...item,
          product,
        }
      })
      .filter(Boolean)
  }, [state.items])

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0
      ),
    [cartItems]
  )

  const totalItems = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  )

  const discount = useMemo(() => {
    if (!state.appliedCoupon) return 0

    if (state.appliedCoupon.type === 'percentage') {
      return Math.min(
        subtotal,
        Math.round(
          (subtotal * state.appliedCoupon.value) / 100
        )
      )
    }

    return Math.min(subtotal, state.appliedCoupon.value)
  }, [state.appliedCoupon, subtotal])

  const isFreeShippingEligible =
    subtotal >= FREE_SHIPPING_THRESHOLD

  const shipping = isFreeShippingEligible
    ? 0
    : subtotal > 0
      ? STANDARD_SHIPPING
      : 0

  const total = Math.max(
    0,
    subtotal - discount + shipping
  )

  const amountToFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  )

  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  )

  const totalSavings =
    discount +
    (isFreeShippingEligible ? STANDARD_SHIPPING : 0)

  const addToCart = (productId, quantity = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      productId: Number(productId),
      quantity: Math.max(1, quantity),
    })
  }

  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      productId: Number(productId),
    })
  }

  const increaseQuantity = (productId) => {
    dispatch({
      type: 'INCREASE_QUANTITY',
      productId: Number(productId),
    })
  }

  const decreaseQuantity = (productId) => {
    dispatch({
      type: 'DECREASE_QUANTITY',
      productId: Number(productId),
    })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const applyCoupon = (code) => {
    const coupon = validateCoupon(code)

    if (!coupon) {
      dispatch({
        type: 'SET_COUPON_ERROR',
        error: 'Invalid coupon code',
      })

      return false
    }

    dispatch({
      type: 'APPLY_COUPON',
      coupon,
    })

    return true
  }

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' })
  }

  const value = {
    cartItems,
    totalItems,
    subtotal,
    discount,
    shipping,
    total,
    totalSavings,
    isFreeShippingEligible,
    amountToFreeShipping,
    freeShippingProgress,
    appliedCoupon: state.appliedCoupon,
    couponError: state.couponError,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}