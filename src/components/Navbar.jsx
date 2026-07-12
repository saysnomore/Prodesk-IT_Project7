import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { itemCount } = useCart();
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          crate<span className="brand-dot">.</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
            Shop
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'active' : '')}>
            Checkout
          </NavLink>
        </nav>

        <div className="navbar-right">
          {isLoggedIn ? (
            <button className="ghost-btn" onClick={logout}>
              Log out
            </button>
          ) : (
            <NavLink to="/login" className="ghost-btn">
              Log in
            </NavLink>
          )}

          <NavLink to="/checkout" className="cart-icon-link" aria-label="View cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1.4" />
              <circle cx="18" cy="21" r="1.4" />
              <path d="M2.5 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
