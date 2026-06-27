import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiShoppingBag, FiUser, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const navCategories = [
  {
    name: 'Gold',
    subCategories: ['Rings', 'Earrings', 'Necklaces', 'Chains', 'Bangles', 'Mangalsutra'],
    styles: ['Antique', 'Temple', 'Contemporary', 'Traditional'],
  },
  {
    name: 'Silver',
    subCategories: ['Bangles', 'Anklets', 'Nose Pins', 'Bracelets'],
    styles: ['Contemporary', 'Minimalist', 'Temple'],
  },
  {
    name: 'Diamond',
    subCategories: ['Rings', 'Earrings', 'Bracelets', 'Pendants'],
    styles: ['Bridal', 'Contemporary'],
  },
  {
    name: 'Rose Gold',
    subCategories: ['Pendants', 'Rings', 'Bracelets'],
    styles: ['Minimalist', 'Contemporary'],
  },
  {
    name: 'Platinum',
    subCategories: ['Rings', 'Chains', 'Earrings'],
    styles: ['Bridal', 'Minimalist', 'Contemporary'],
  },
];

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-');

  return (
    <header className="brj-header">
      <div className="brj-topbar">
        <p>Complimentary engraving on all gold jewellery &nbsp;|&nbsp; Free shipping across India</p>
      </div>

      <div className="brj-mainbar">
        <button
          className="brj-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>

        <Link to="/" className="brj-logo">
          <span className="brj-logo-mark">BRJ</span>
          <span className="brj-logo-tagline">Jewellers</span>
        </Link>

        <div className="brj-searchbar">
          <FiSearch className="brj-search-icon" />
          <input type="text" placeholder="Search for rings, necklaces, gifts..." />
        </div>

        <div className="brj-icons">
          <Link to="/wishlist" className="brj-icon-btn" aria-label="Wishlist">
            <FiHeart />
          </Link>
          <Link to="/cart" className="brj-icon-btn" aria-label="Cart">
            <FiShoppingBag />
          </Link>
          {user ? (
            <div className="brj-account-menu">
                <button className="brj-icon-btn" aria-label="Account">
                <FiUser />
                </button>
                <div className="brj-account-dropdown">
                <span className="brj-account-name">Hi, {user.name.split(' ')[0]}</span>
                <button onClick={logout} className="brj-logout-btn">Logout</button>
                </div>
            </div>
            ) : (
            <Link to="/login" className="brj-icon-btn" aria-label="Account">
                <FiUser />
            </Link>
            )}
        </div>
      </div>

      <nav className={`brj-nav ${mobileOpen ? 'brj-nav-open' : ''}`}>
        <ul>
          {navCategories.map((cat) => (
            <li
              key={cat.name}
              className="brj-nav-item"
              onMouseEnter={() => setActiveMenu(cat.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link to={`/category/${slugify(cat.name)}`}>{cat.name}</Link>

              {activeMenu === cat.name && (
                <div className="brj-megamenu">
                  <div className="brj-megamenu-col">
                    <h4>Shop by Type</h4>
                    <ul>
                      {cat.subCategories.map((sub) => (
                        <li key={sub}>
                          <Link to={`/category/${slugify(cat.name)}?subCategory=${sub}`}>
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="brj-megamenu-col">
                    <h4>Shop by Style</h4>
                    <ul>
                      {cat.styles.map((style) => (
                        <li key={style}>
                          <Link to={`/category/${slugify(cat.name)}?style=${style}`}>
                            {style}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="brj-megamenu-feature">
                    <span className="brj-megamenu-feature-label">The {cat.name} Edit</span>
                    <p>Discover our finest {cat.name.toLowerCase()} pieces, crafted for every occasion.</p>
                    <Link to={`/category/${slugify(cat.name)}`} className="brj-megamenu-cta">
                      Explore Collection →
                    </Link>
                  </div>
                </div>
              )}
            </li>
          ))}
          <li className="brj-nav-item">
            <Link to="/category/wedding">Wedding</Link>
          </li>
          <li className="brj-nav-item">
            <Link to="/category/gifting">Gifting</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;