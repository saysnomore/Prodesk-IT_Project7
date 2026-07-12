import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="state-panel">
        <h2>Order placed 🎉</h2>
        <p>Thanks for shopping the crate. This was a demo checkout — nothing was charged.</p>
        <Link to="/shop" className="primary-btn">
          Keep browsing
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="state-panel">
        <h2>Your cart is empty</h2>
        <p>Add a few things from the shop to see them here.</p>
        <Link to="/shop" className="primary-btn">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <div className="cart-list">
        {items.map((item) => (
          <div className="cart-row" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <div className="cart-row-info">
              <h4>{item.title}</h4>
              <span className="price">${item.price}</span>
            </div>
            <div className="quantity-stepper">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                −
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
            <span className="line-total">${(item.price * item.quantity).toFixed(2)}</span>
            <button className="remove-link" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="checkout-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-actions">
          <button className="ghost-btn" onClick={clearCart}>
            Clear cart
          </button>
          <button className="primary-btn" onClick={() => setPlaced(true)}>
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}
