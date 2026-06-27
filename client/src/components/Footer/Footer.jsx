import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="brj-footer">
      <div className="brj-footer-main">
        <div className="brj-footer-brand">
          <span className="brj-footer-logo">BRJ</span>
          <p>
            Handcrafted jewellery rooted in tradition, designed for the
            moments that matter most.
          </p>
          <div className="brj-footer-social">
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="Email"><FiMail /></a>
          </div>
        </div>

        <div className="brj-footer-col">
          <h4>Shop</h4>
          <Link to="/category/gold">Gold</Link>
          <Link to="/category/silver">Silver</Link>
          <Link to="/category/diamond">Diamond</Link>
          <Link to="/category/rose-gold">Rose Gold</Link>
          <Link to="/category/platinum">Platinum</Link>
        </div>

        <div className="brj-footer-col">
          <h4>Customer Care</h4>
          <Link to="/contact">Contact Us</Link>
          <Link to="/shipping">Shipping Info</Link>
          <Link to="/returns">Returns &amp; Exchange</Link>
          <Link to="/faq">FAQs</Link>
        </div>

        <div className="brj-footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/stores">Store Locator</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>

        <div className="brj-footer-newsletter">
          <h4>Stay in Touch</h4>
          <p>Get updates on new collections and exclusive offers.</p>
          <form className="brj-footer-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="brj-footer-bottom">
        <p>&copy; {new Date().getFullYear()} BRJ Jewellers. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;