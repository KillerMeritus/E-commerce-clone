import { useEffect } from 'react'
import { getProducts } from './services/api'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import Navbar from './Components/Navbar/Navbar'

function App() {
  useEffect(() => {
    getProducts().then(res => console.log(res.data))
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </>
  )
}

export default App

