import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <article
      className="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/product/${product.id}`);
      }}
    >
      <div className="product-card-image">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <span className="product-card-category">{product.category}</span>
      </div>
      <div className="product-card-body">
        <h3>{product.title}</h3>
        <div className="product-card-footer">
          <span className="price">${product.price}</span>
          <span className="view-link">View →</span>
        </div>
      </div>
    </article>
  );
}
