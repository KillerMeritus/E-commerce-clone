import { useState } from 'react'

const useWishlist = () => {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId)

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist }
}

export default useWishlist