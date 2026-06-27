import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');

  const {
    _id,
    name,
    category,
    purity,
    price,
    discountPrice,
    images,
    rating,
    numReviews,
  } = product;

  const hasDiscount = discountPrice && discountPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const wishlisted = isInWishlist(_id);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    try {
      await toggleWishlist(_id);
    } catch (err) {
      navigate('/login');
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(_id, 1);
      setFeedback('Added!');
      setTimeout(() => setFeedback(''), 1500);
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="brj-card">
      <div className="brj-card-image-wrap">
        <Link to={`/product/${_id}`}>
          <img
            src={images?.[0] || 'https://placehold.co/400x400/F0E9DA/2B2620?text=BRJ'}
            alt={name}
            className="brj-card-image"
          />
        </Link>

        {hasDiscount && (
          <span className="brj-card-badge">{discountPercent}% OFF</span>
        )}

        <button
          className={`brj-card-wishlist ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Toggle wishlist"
        >
          <FiHeart />
        </button>
      </div>

      <div className="brj-card-body">
        <span className="brj-card-category">{category} · {purity}</span>
        <Link to={`/product/${_id}`} className="brj-card-name">
          {name}
        </Link>

        <div className="brj-card-rating">
          <FiStar className="brj-card-star" />
          <span>{rating?.toFixed(1)}</span>
          <span className="brj-card-reviews">({numReviews})</span>
        </div>

        <div className="brj-card-price-row">
          <span className="brj-card-price">
            {formatPrice(hasDiscount ? discountPrice : price)}
          </span>
          {hasDiscount && (
            <span className="brj-card-price-original">{formatPrice(price)}</span>
          )}
        </div>

        <button className="brj-card-cta" onClick={handleAddToCart}>
          {feedback || 'Add to Bag'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;