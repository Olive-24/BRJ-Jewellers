import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductDetail.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState('');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    setQuantity(1);
  }, [id]);

  if (loading) return <p className="brj-status-text">Loading product...</p>;
  if (error) return <p className="brj-status-text brj-error-text">{error}</p>;
  if (!product) return null;

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const wishlisted = isInWishlist(product._id);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
      setFeedback('Added to bag!');
      setTimeout(() => setFeedback(''), 2000);
    } catch (err) {
      navigate('/login');
    }
  };

  const handleWishlistClick = async () => {
    try {
      await toggleWishlist(product._id);
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="brj-detail-page">
      <div className="brj-detail-breadcrumb">
        <Link to="/">Home</Link> /{' '}
        <Link to={`/category/${product.category.toLowerCase().replace(' ', '-')}`}>
          {product.category}
        </Link>{' '}
        / {product.name}
      </div>

      <div className="brj-detail-layout">
        <div className="brj-detail-image-wrap">
          <img
            src={product.images?.[0] || 'https://placehold.co/600x600/F0E9DA/2B2620?text=BRJ'}
            alt={product.name}
          />
        </div>

        <div className="brj-detail-info">
          <span className="brj-detail-category">
            {product.category} · {product.purity}
          </span>
          <h1>{product.name}</h1>

          <div className="brj-detail-rating">
            ★ {product.rating?.toFixed(1)} <span>({product.numReviews} reviews)</span>
          </div>

          <div className="brj-detail-price-row">
            <span className="brj-detail-price">
              {formatPrice(hasDiscount ? product.discountPrice : product.price)}
            </span>
            {hasDiscount && (
              <span className="brj-detail-price-original">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="brj-detail-description">{product.description}</p>

          <div className="brj-detail-specs">
            <div><span>Style</span><strong>{product.style}</strong></div>
            <div><span>Weight</span><strong>{product.weight} g</strong></div>
            <div><span>Occasion</span><strong>{product.occasion}</strong></div>
            <div><span>Gender</span><strong>{product.gender}</strong></div>
          </div>

          <div className="brj-detail-actions">
            <div className="brj-qty-selector">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className="brj-add-to-bag" onClick={handleAddToCart}>
              {feedback || 'Add to Bag'}
            </button>
            <button
              className={`brj-wishlist-btn ${wishlisted ? 'active' : ''}`}
              onClick={handleWishlistClick}
            >
              {wishlisted ? '♥ Wishlisted' : '♡ Wishlist'}
            </button>
          </div>

          <p className="brj-stock-note">
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : 'Currently Out of Stock'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;