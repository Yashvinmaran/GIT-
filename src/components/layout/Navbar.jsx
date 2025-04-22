// components/layout/Navbar.js
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    navigate('/');
  };
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const closeDropdowns = () => {
      setShowUserDropdown(false);
    };
    
    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);
  
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  
  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          <Link to="/" className="navbar-logo">
           
            <span>FasalBazaar</span>
          </Link>
        </div>
        
        <div className={`navbar-center ${isMobileMenuOpen ? 'active' : ''}`}>
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for vegetables, fruits, grains..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          
          <nav className="main-nav">
            <ul>
              <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li className="dropdown">
                <span>Categories</span>
                <div className="dropdown-content">
                  <Link to="/category/vegetables" onClick={() => setIsMobileMenuOpen(false)}>Vegetables</Link>
                  <Link to="/category/fruits" onClick={() => setIsMobileMenuOpen(false)}>Fruits</Link>
                  <Link to="/category/grains" onClick={() => setIsMobileMenuOpen(false)}>Grains</Link>
                  <Link to="/category/pulses" onClick={() => setIsMobileMenuOpen(false)}>Pulses</Link>
                  <Link to="/category/organic" onClick={() => setIsMobileMenuOpen(false)}>Organic</Link>
                </div>
              </li>
              <li><Link to="/sell" onClick={() => setIsMobileMenuOpen(false)}>Sell</Link></li>
              {/* <li><Link to="/yield-calculator" onClick={() => setIsMobileMenuOpen(false)}>Yield Calculator</Link></li> */}
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link></li>
            </ul>
          </nav>
        </div>
        
        <div className="navbar-right">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="user-menu" onClick={stopPropagation}>
              <button className="user-menu-button" onClick={toggleUserDropdown}>
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="user-avatar" />
                ) : (
                  <FaUser />
                )}
                <span className="username">{user.name.split(' ')[0]}</span>
              </button>
              
              {showUserDropdown && (
                <div className="user-dropdown">
                  <Link to="/profile" onClick={() => setShowUserDropdown(false)}>
                    <FaUser /> My Profile
                  </Link>
                  <Link to="/orders" onClick={() => setShowUserDropdown(false)}>
                    <FaClipboardList /> My Orders
                  </Link>
                  {user.isFarmer && (
                    <Link to="/my-listings" onClick={() => setShowUserDropdown(false)}>
                      My Listings
                    </Link>
                  )}
                  <button onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;