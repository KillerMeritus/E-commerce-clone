import { createContext, useContext } from 'react'
import useCart from '../hooks/useCart'
import useWishlist from '../hooks/useWishlist'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const cart = useCart()
  const wishlist = useWishlist()

  return (
    <CartContext.Provider value={{ ...cart, ...wishlist }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}