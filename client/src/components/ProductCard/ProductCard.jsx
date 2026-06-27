import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiStar } from 'react-icons/fi';
import './ProductCard.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

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
          className={`brj-card-wishlist ${isWishlisted ? 'active' : ''}`}
          onClick={() => setIsWishlisted(!isWishlisted)}
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

        <button className="brj-card-cta">Add to Bag</button>
      </div>
    </div>
  );
};

export default ProductCard;