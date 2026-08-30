import { useCart } from '../../context/CartContext'
import GoldDivider from './GoldDivider'
function CartHeader() {
  const { totalItems } = useCart()
  return (
    <header className="mb-8">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-brown md:text-4xl">
        Your Cart ({totalItems})
      </h1>
      <div className="mt-5 max-w-md">
        <GoldDivider />
      </div>
    </header>
  )
}
export default CartHeader