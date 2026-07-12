# crate — React E-Commerce SPA

A multi-route e-commerce frontend built with React + `react-router-dom`. Browse products, view details, manage a cart, and check out — all without a page reload. Data comes live from `https://dummyjson.com/products`.

## Features

**Phase 1 — Base**
- `BrowserRouter` with `/` (Home) and `/shop` (product grid)
- Clicking a product navigates to `/product/:id`
- Product detail page fetches its data via `useParams()` + `fetch`

**Phase 2 — Cart & Navbar**
- `CartContext` (Context API, no Redux) wraps the app
- "Add to Cart" dispatches the item into global state
- Global Navbar persists across routes with a live-updating cart badge

**Phase 3 — Stretch**
- Cart state syncs to `localStorage` and survives a refresh
- Mock `/login` route with "Login as Guest"
- Protected `/checkout` route — redirects unauthenticated users to `/login`

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  context/
    CartContext.jsx    # cart state, add/remove/update, localStorage sync
    AuthContext.jsx     # mock guest auth state, localStorage sync
  components/
    Navbar.jsx           # persistent nav + cart badge
    ProductCard.jsx       # shop grid item
    ProtectedRoute.jsx    # redirect guard for /checkout
  pages/
    Home.jsx
    Shop.jsx               # GET /products
    ProductDetail.jsx      # GET /products/:id via useParams
    Login.jsx               # guest login
    Checkout.jsx             # cart summary + place order
  App.jsx                    # routes + provider tree
  index.css                   # design system
```
