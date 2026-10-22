import { Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function PlaceOrder() {
  const { cartItems } = useCart()

  if (!cartItems.length) {
    return <Navigate to="/cart" replace />
  }

  return (
    <Navigate
      to="/checkout"
      replace
    />
  )
}

export default PlaceOrder
