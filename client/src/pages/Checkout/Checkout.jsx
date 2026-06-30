import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import './Checkout.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Checkout = () => {
  const { cart, cartTotal, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
  
    try {
      const { data } = await api.post(
        '/orders',
        {
          shippingAddress: form,
          paymentMethod,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
  
      navigate('/order-success', {
        state: { orderNumber: data.orderNumber, total: data.totalAmount },
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (!user) {
    return (
      <div className="brj-checkout-page">
        <p className="brj-status-text">
          Please <Link to="/login">log in</Link> to checkout.
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="brj-checkout-page">
        <p className="brj-status-text">
          Your bag is empty. <Link to="/">Continue shopping</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="brj-checkout-page">
      <h1 className="brj-checkout-title">Checkout</h1>

      <form className="brj-checkout-layout" onSubmit={handlePlaceOrder}>
        <div className="brj-checkout-form-section">
          <h3>Shipping Address</h3>

          <label>
            Full Name
            <input name="fullName" value={form.fullName} onChange={handleChange} required />
          </label>

          <label>
            Address
            <input name="address" value={form.address} onChange={handleChange} required />
          </label>

          <div className="brj-checkout-row">
            <label>
              City
              <input name="city" value={form.city} onChange={handleChange} required />
            </label>
            <label>
              State
              <input name="state" value={form.state} onChange={handleChange} required />
            </label>
          </div>

          <div className="brj-checkout-row">
            <label>
              Pincode
              <input name="pincode" value={form.pincode} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </label>
          </div>

          <h3 className="brj-checkout-payment-title">Payment Method</h3>
          <div className="brj-payment-options">
            <label className={`brj-payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
              />
              Cash on Delivery
            </label>
            <label className={`brj-payment-option ${paymentMethod === 'card' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
              />
              Credit / Debit Card
            </label>
            <label className={`brj-payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={() => setPaymentMethod('upi')}
              />
              UPI
            </label>
          </div>
          <p className="brj-payment-note">
            This is a demo checkout — no real payment will be processed.
          </p>
        </div>

        <div className="brj-checkout-summary">
          <h3>Order Summary</h3>
          {cart.map((item) => {
            const product = item.product;
            if (!product) return null;
            const price = product.discountPrice || product.price;
            return (
              <div key={product._id} className="brj-checkout-summary-item">
                <span>{product.name} × {item.quantity}</span>
                <span>{formatPrice(price * item.quantity)}</span>
              </div>
            );
          })}
          <div className="brj-checkout-summary-total">
            <span>Total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <button type="submit" className="brj-place-order-btn" disabled={placing}>
            {placing ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;