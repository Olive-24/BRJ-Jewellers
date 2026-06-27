import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

const categories = [
  { name: 'Gold', image: 'https://placehold.co/200x200/D4AF37/FAF6EF?text=Gold' },
  { name: 'Silver', image: 'https://placehold.co/200x200/C0C0C0/2B2620?text=Silver' },
  { name: 'Diamond', image: 'https://placehold.co/200x200/E8E8E8/2B2620?text=Diamond' },
  { name: 'Rose Gold', image: 'https://placehold.co/200x200/E0BFB8/2B2620?text=Rose+Gold' },
  { name: 'Platinum', image: 'https://placehold.co/200x200/E5E4E2/2B2620?text=Platinum' },
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products/featured');
        setFeaturedProducts(data);
      } catch (err) {
        setError('Could not load featured products. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="brj-home">
      {/* Hero Section */}
      <section
        className="brj-hero"
        style={{
          backgroundImage:
            "url('https://placehold.co/1600x800/1B4332/FAF6EF?text=BRJ+Jewellers')",
        }}
      >
        <div className="brj-hero-overlay">
          <span className="brj-hero-eyebrow">The Heritage Collection</span>
          <h1 className="brj-hero-heading">Crafted Trust, Timeless Elegance</h1>
          <p className="brj-hero-sub">
            Discover handcrafted jewellery for every milestone of your story.
          </p>
          <Link to="/category/gold" className="brj-hero-cta">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="brj-categories">
        <h2 className="brj-section-title">Shop by Category</h2>
        <div className="brj-category-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.name.toLowerCase().replace(' ', '-')}`}
              className="brj-category-tile"
            >
              <img src={cat.image} alt={cat.name} />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="brj-featured">
        <h2 className="brj-section-title">Featured Pieces</h2>

        {loading && <p className="brj-status-text">Loading featured products...</p>}
        {error && <p className="brj-status-text brj-error-text">{error}</p>}

        {!loading && !error && (
          <div className="brj-product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Trust Badges */}
      <section className="brj-trust">
        <div className="brj-trust-item">
          <h3>Certified Jewellery</h3>
          <p>Every piece comes with authenticity certification</p>
        </div>
        <div className="brj-trust-item">
          <h3>Free Shipping</h3>
          <p>Complimentary delivery across India</p>
        </div>
        <div className="brj-trust-item">
          <h3>Lifetime Exchange</h3>
          <p>Exchange your jewellery anytime, hassle-free</p>
        </div>
        <div className="brj-trust-item">
          <h3>30-Day Returns</h3>
          <p>Not satisfied? Return within 30 days</p>
        </div>
      </section>
    </div>
  );
};

export default Home;