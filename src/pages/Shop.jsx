import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setStatus('loading');
        const res = await fetch('https://dummyjson.com/products?limit=30');
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setProducts(data.products || []);
          setStatus('ready');
        }
      } catch (err) {
        if (!cancelled) setStatus('error');
      }
    }

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className="state-panel">
        <div className="spinner" />
        <p>Loading products…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="state-panel">
        <p>Couldn't load products. Check your connection and try again.</p>
      </div>
    );
  }

  return (
    <section className="shop-page">
      <div className="shop-header">
        <h2>Shop</h2>
        <span className="shop-count">{products.length} items</span>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
