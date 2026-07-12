import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { isLoggedIn, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || '/checkout';

  function handleGuestLogin() {
    loginAsGuest();
    navigate(redirectTo, { replace: true });
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <span className="eyebrow">Account</span>
        <h1>Sign in to continue</h1>
        <p>
          This is a mock authentication flow — no real account needed. Continue
          as a guest to unlock checkout.
        </p>

        {isLoggedIn ? (
          <div className="state-panel">
            <p>You're already signed in as Guest.</p>
            <button className="primary-btn" onClick={() => navigate('/checkout')}>
              Go to Checkout
            </button>
          </div>
        ) : (
          <button className="primary-btn full-width" onClick={handleGuestLogin}>
            Login as Guest
          </button>
        )}
      </div>
    </section>
  );
}
