import { useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { useCartContext } from '../Contexts/CartContext'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart, addToWishlist, isInWishlist } = useCartContext()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(product)
    toast.success('Added to cart!')
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    addToWishlist(product)
    toast.success('Added to wishlist!')
  }

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="bg-gray-900 border border-gray-800 rounded-xl p-4 cursor-pointer hover:border-cyan-500 transition-all duration-300 flex flex-col gap-3"
    >
      <div className="bg-white rounded-lg p-4 flex items-center justify-center h-48">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      <div className="flex-1">
        <p className="text-xs text-cyan-400 uppercase tracking-wide">{product.category}</p>
        <h3 className="text-sm text-gray-200 mt-1 line-clamp-2">{product.title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <FiStar className="text-yellow-400" size={12} />
          <span className="text-xs text-gray-400">{product.rating?.rate} ({product.rating?.count})</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-white">${product.price}</span>
        <div className="flex gap-2">
          <button
            onClick={handleWishlist}
            className={`p-2 rounded-lg transition-colors ${isInWishlist(product.id) ? 'text-pink-400 bg-pink-400/10' : 'text-gray-400 hover:text-pink-400 bg-gray-800'}`}
          >
            <FiHeart size={16} />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-gray-950 transition-colors"
          >
            <FiShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
