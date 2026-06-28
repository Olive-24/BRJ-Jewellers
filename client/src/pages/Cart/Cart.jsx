import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Cart.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="brj-cart-page">
        <p className="brj-status-text">
          Please <Link to="/login">log in</Link> to view your bag.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="brj-cart-page">
        <p className="brj-status-text">Loading your bag...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="brj-cart-page">
        <p className="brj-status-text">
          Your bag is empty. <Link to="/">Continue shopping</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="brj-cart-page">
      <h1 className="brj-cart-title">Your Bag</h1>

      <div className="brj-cart-layout">
        <div className="brj-cart-items">
          {cart.map((item) => {
            const product = item.product;
            if (!product) return null;
            const price = product.discountPrice || product.price;

            return (
              <div key={product._id} className="brj-cart-item">
                <Link to={`/product/${product._id}`} className="brj-cart-item-image">
                  <img
                    src={product.images?.[0] || 'https://placehold.co/150x150/F0E9DA/2B2620?text=BRJ'}
                    alt={product.name}
                  />
                </Link>

                <div className="brj-cart-item-info">
                  <Link to={`/product/${product._id}`} className="brj-cart-item-name">
                    {product.name}
                  </Link>
                  <span className="brj-cart-item-category">
                    {product.category} · {product.purity}
                  </span>
                  <span className="brj-cart-item-price">{formatPrice(price)}</span>
                </div>

                <div className="brj-cart-item-qty">
                  <button
                    onClick={() =>
                      updateQuantity(product._id, Math.max(1, item.quantity - 1))
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(product._id, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <span className="brj-cart-item-subtotal">
                  {formatPrice(price * item.quantity)}
                </span>

                <button
                  className="brj-cart-item-remove"
                  onClick={() => removeFromCart(product._id)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>

        <div className="brj-cart-summary">
          <h3>Order Summary</h3>
          <div className="brj-cart-summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="brj-cart-summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="brj-cart-summary-row brj-cart-summary-total">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <button className="brj-checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;