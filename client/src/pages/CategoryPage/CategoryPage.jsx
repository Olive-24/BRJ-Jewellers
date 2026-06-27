import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CategoryPage.css';

const styleOptions = ['Antique', 'Temple', 'Contemporary', 'Traditional', 'Minimalist', 'Bridal'];
const occasionOptions = ['Daily Wear', 'Wedding', 'Festive', 'Party', 'Office Wear'];

const slugToCategory = {
  gold: 'Gold',
  silver: 'Silver',
  diamond: 'Diamond',
  'rose-gold': 'Rose Gold',
  platinum: 'Platinum',
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const categoryName = slugToCategory[slug] || slug;

  // Filter states (initialized from URL params if present)
  const [style, setStyle] = useState(searchParams.get('style') || '');
  const [occasion, setOccasion] = useState(searchParams.get('occasion') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { category: categoryName };
        if (style) params.style = style;
        if (occasion) params.occasion = occasion;
        if (maxPrice) params.maxPrice = maxPrice;
        if (sort) params.sort = sort;

        const subCategory = searchParams.get('subCategory');
        if (subCategory) params.subCategory = subCategory;

        const { data } = await api.get('/products', { params });
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
      } catch (err) {
        setError('Could not load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName, style, occasion, maxPrice, sort, searchParams]);

  const clearFilters = () => {
    setStyle('');
    setOccasion('');
    setMaxPrice('');
    setSort('');
    setSearchParams({});
  };

  return (
    <div className="brj-category-page">
      <div className="brj-category-header">
        <h1>{categoryName}</h1>
        <p>{totalProducts} {totalProducts === 1 ? 'piece' : 'pieces'} found</p>
      </div>

      <div className="brj-category-layout">
        {/* Filters Sidebar */}
        <aside className="brj-filters">
          <div className="brj-filter-group">
            <h4>Style</h4>
            {styleOptions.map((opt) => (
              <label key={opt} className="brj-filter-option">
                <input
                  type="radio"
                  name="style"
                  checked={style === opt}
                  onChange={() => setStyle(opt)}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="brj-filter-group">
            <h4>Occasion</h4>
            {occasionOptions.map((opt) => (
              <label key={opt} className="brj-filter-option">
                <input
                  type="radio"
                  name="occasion"
                  checked={occasion === opt}
                  onChange={() => setOccasion(opt)}
                />
                {opt}
              </label>
            ))}
          </div>

          <div className="brj-filter-group">
            <h4>Max Price</h4>
            <input
              type="range"
              min="500"
              max="200000"
              step="500"
              value={maxPrice || 200000}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="brj-price-slider"
            />
            <span className="brj-price-label">
              Up to ₹{Number(maxPrice || 200000).toLocaleString('en-IN')}
            </span>
          </div>

          <button className="brj-clear-filters" onClick={clearFilters}>
            Clear Filters
          </button>
        </aside>

        {/* Products */}
        <div className="brj-category-main">
          <div className="brj-sort-bar">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort: Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {loading && <p className="brj-status-text">Loading...</p>}
          {error && <p className="brj-status-text brj-error-text">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="brj-status-text">No products match these filters.</p>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="brj-product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;