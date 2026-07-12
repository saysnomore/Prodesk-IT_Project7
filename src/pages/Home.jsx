import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="home-hero">
      <div className="home-hero-text">
        <span className="eyebrow">Everyday inventory, sorted</span>
        <h1>
          Browse the crate.
          <br />
          Fill your cart.
          <br />
          Check out in seconds.
        </h1>
        <p>
          A small catalog of real products pulled live from the DummyJSON API —
          built to demonstrate routing, global cart state, and a checkout flow
          that survives a page refresh.
        </p>
        <Link to="/shop" className="primary-btn">
          Go to Shop
        </Link>
      </div>
      <div className="home-hero-visual" aria-hidden="true">
        <div className="crate-box">
          <div className="crate-slat" />
          <div className="crate-slat" />
          <div className="crate-slat" />
          <div className="crate-label">01</div>
        </div>
      </div>
    </section>
  );
}
