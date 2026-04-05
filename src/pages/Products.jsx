import { useState, useMemo } from 'react'
import { FiSearch } from 'react-icons/fi'
import useProducts from '../hooks/useProducts'
import useDebounce from '../hooks/useDebounce'
import ProductCard from '../Components/ProductCard'

const CATEGORIES = ['all', 'electronics', "men's clothing", "women's clothing", 'jewelery']

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $50', min: 0, max: 50 },
  { label: '$50 - $200', min: 50, max: 200 },
  { label: '$200 - $500', min: 200, max: 500 },
  { label: '$500+', min: 500, max: Infinity },
]

const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
]

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [priceRange, setPriceRange] = useState(0)
  const [sortBy, setSortBy] = useState('default')

  const debouncedSearch = useDebounce(search, 400)
  const { products, loading, error } = useProducts()

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    if (debouncedSearch) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    const range = PRICE_RANGES[priceRange]
    result = result.filter(p => p.price >= range.min && p.price <= range.max)

    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result.sort((a, b) => b.rating.rate - a.rating.rate)

    return result
  }, [products, activeCategory, debouncedSearch, priceRange, sortBy])

  if (error) return <div className="text-center text-red-400 mt-20">Failed to load products. Try again.</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">All Products</h1>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${
              activeCategory === cat
                ? 'bg-cyan-500 text-gray-950 font-semibold'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500"
        >
          {PRICE_RANGES.map((range, i) => (
            <option key={range.label} value={i}>{range.label}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <span className="text-gray-400 text-sm self-center">{filteredProducts.length} products found</span>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-xl h-72 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center text-gray-400 mt-20 text-xl">No products found</div>
      )}
    </div>
  )
}

export default Products