import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Wishlist.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Wishlist = () => {
  const { wishlist, toggleWishlist, loading } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="brj-wishlist-page">
        <p className="brj-status-text">
          Please <Link to="/login">log in</Link> to view your wishlist.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="brj-wishlist-page">
        <p className="brj-status-text">Loading your wishlist...</p>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="brj-wishlist-page">
        <p className="brj-status-text">
          Your wishlist is empty. <Link to="/">Continue shopping</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="brj-wishlist-page">
      <h1 className="brj-wishlist-title">Your Wishlist</h1>

      <div className="brj-wishlist-grid">
        {wishlist.map((product) => {
          const hasDiscount = product.discountPrice && product.discountPrice < product.price;

          return (
            <div key={product._id} className="brj-wishlist-card">
              <button
                className="brj-wishlist-remove"
                onClick={() => toggleWishlist(product._id)}
                aria-label="Remove from wishlist"
              >
                ✕
              </button>

              <Link to={`/product/${product._id}`} className="brj-wishlist-image">
                <img
                  src={product.images?.[0] || 'https://placehold.co/300x300/F0E9DA/2B2620?text=BRJ'}
                  alt={product.name}
                />
              </Link>

              <div className="brj-wishlist-info">
                <Link to={`/product/${product._id}`} className="brj-wishlist-name">
                  {product.name}
                </Link>
                <span className="brj-wishlist-category">
                  {product.category} · {product.purity}
                </span>
                <div className="brj-wishlist-price-row">
                  <span className="brj-wishlist-price">
                    {formatPrice(hasDiscount ? product.discountPrice : product.price)}
                  </span>
                  {hasDiscount && (
                    <span className="brj-wishlist-price-original">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                <button
                  className="brj-wishlist-move-btn"
                  onClick={() => addToCart(product._id, 1)}
                >
                  Move to Bag
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;