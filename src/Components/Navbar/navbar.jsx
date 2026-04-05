import { Link, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiZap } from 'react-icons/fi'
import { useCartContext } from '../../Contexts/CartContext'

const Navbar = () => {
  const { cartCount, wishlist } = useCartContext()
  const navigate = useNavigate()

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-cyan-400">
          <FiZap />
          TechDen
        </Link>

        <div className="hidden md:flex gap-6 text-gray-300">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link to="/products" className="hover:text-cyan-400 transition-colors">Products</Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/wishlist')} className="relative text-gray-300 hover:text-pink-400 transition-colors">
            <FiHeart size={22} />
            {wishlist?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          <button onClick={() => navigate('/cart')} className="relative text-gray-300 hover:text-cyan-400 transition-colors">
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
