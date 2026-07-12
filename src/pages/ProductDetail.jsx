import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setJustAdded(false);
    setQuantity(1);

    async function fetchProduct() {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setProduct(data);
          setStatus('ready');
        }
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleAddToCart() {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  if (status === 'loading') {
    return (
      <div className="state-panel">
        <div className="spinner" />
        <p>Loading product…</p>
      </div>
    );
  }

  if (status === 'error' || !product) {
    return (
      <div className="state-panel">
        <p>We couldn't find that product.</p>
        <button className="ghost-btn" onClick={() => navigate('/shop')}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <section className="product-detail">
      <button className="back-link" onClick={() => navigate('/shop')}>
        ← Back to Shop
      </button>

      <div className="product-detail-grid">
        <div className="product-detail-image">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        <div className="product-detail-info">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-price-row">
            <span className="price-large">${product.price}</span>
            {product.rating && <span className="rating">★ {product.rating}</span>}
          </div>

          <div className="quantity-row">
            <label htmlFor="qty">Quantity</label>
            <div className="quantity-stepper">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span id="qty">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button className="primary-btn full-width" onClick={handleAddToCart}>
            {justAdded ? 'Added to cart ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </section>
  );
}
