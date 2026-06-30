import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/products', { params: { search: query } });
        setProducts(data.products);
      } catch (err) {
        setError('Something went wrong while searching.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="brj-search-page">
      <h1 className="brj-search-title">
        Search results for "<span>{query}</span>"
      </h1>
      <p className="brj-search-count">
        {!loading && `${products.length} ${products.length === 1 ? 'result' : 'results'} found`}
      </p>

      {loading && <p className="brj-status-text">Searching...</p>}
      {error && <p className="brj-status-text brj-error-text">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="brj-status-text">
          No products found for "{query}". Try searching for "gold", "ring", or "necklace".
        </p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="brj-product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;