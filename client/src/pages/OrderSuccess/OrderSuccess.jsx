import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const OrderSuccess = () => {
  const location = useLocation();
  const { orderNumber, total } = location.state || {};

  return (
    <div className="brj-success-page">
      <div className="brj-success-card">
        <div className="brj-success-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for shopping with BRJ Jewellers.</p>

        {orderNumber && (
          <div className="brj-success-details">
            <div>
              <span>Order Number</span>
              <strong>{orderNumber}</strong>
            </div>
            {total && (
              <div>
                <span>Total Paid</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            )}
          </div>
        )}

        <p className="brj-success-note">
          A confirmation has been sent to your registered email. Your order will be
          processed within 1-2 business days.
        </p>

        <Link to="/" className="brj-success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;