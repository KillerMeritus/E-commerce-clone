import { useState, useEffect } from 'react'
import { getProducts, getProductsByCategory } from '../services/api'

const useProducts = (category = null) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const fetchFn = category ? getProductsByCategory(category) : getProducts()

    fetchFn
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [category])

  return { products, loading, error }
}

export default useProducts