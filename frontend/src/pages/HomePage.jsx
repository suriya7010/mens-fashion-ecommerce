// frontend/src/pages/HomePage.jsx
// ─────────────────────────────────────────────────────────────
// The customer-facing homepage.
//
// KEY CHANGES:
//   1. Uses useEffect + Axios to fetch products from MongoDB
//      instead of using a hardcoded array.
//   2. Passes products to ProductCard which shows real images.
//   3. Shows a loading spinner while fetching.
//   4. Shows an error message if the API is unreachable.
//
// DATA FLOW:
//   MongoDB → Express API → Axios (fetchProducts) → useState →
//   renders ProductCard components with real data
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import Footer from "../components/Footer";
import "./HomePage.css";

const CATEGORIES = ["All", "Suits", "Shirts", "Trousers", "Shoes", "Accessories", "Ties"];

function HomePage({ cartCount, onAddToCart }) {
  const navigate = useNavigate();

  // ── State ──
  const [products,        setProducts]        = useState([]);
  const [activeCategory,  setActiveCategory]  = useState("All");
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState("");

  // ── Fetch products from MongoDB when category changes ──
  // useEffect runs this function whenever activeCategory changes.
  // The empty [] at first mount also runs it once on page load.
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");
      try {
        // fetchProducts() calls GET /api/products?category=Suits
        // Axios sends the request to your Express backend
        // which queries MongoDB and returns the products array
        const data = await fetchProducts("", activeCategory);
        setProducts(data);
      } catch (err) {
        // This shows if the backend is not running
        setError("Could not load products. Make sure the backend is running.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [activeCategory]); // re-run whenever activeCategory changes

  return (
    <div className="home-page">
      <Navbar cartCount={cartCount} />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Summer Collection 2025</p>
          <h1 className="hero-title">
            Dressed for<br />every <em>occasion.</em>
          </h1>
          <p className="hero-sub">
            Tailored suits, formal shirts, and premium accessories
            for the modern gentleman.
          </p>
          <div className="hero-btns">
            <button className="hero-cta" onClick={() => navigate("/cart")}>
              View Cart 🛍️
            </button>
            <button className="hero-secondary" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        </div>
        <div className="hero-right">
          <span className="hero-icon">🧥</span>
          <span className="hero-badge">New Arrivals</span>
        </div>
      </section>

      {/* ── Products Section ── */}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">Our Collection</h2>
          <span className="section-meta">
            {loading ? "Loading…" : `${products.length} products`}
          </span>
        </div>

        {/* Category filter buttons */}
        <div className="category-strip">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Loading state ── */}
        {loading && (
          <div className="products-loading">
            <div className="spinner"></div>
            <p>Loading products from database…</p>
          </div>
        )}

        {/* ── Error state ── */}
        {!loading && error && (
          <div className="products-error">
            <p className="error-icon">⚠️</p>
            <p className="error-title">Could not load products</p>
            <p className="error-sub">{error}</p>
            <button
              className="retry-btn"
              onClick={() => setActiveCategory(activeCategory)}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && !error && products.length === 0 && (
          <div className="products-empty">
            <p className="empty-icon">📭</p>
            <p className="empty-title">No products yet</p>
            <p className="empty-sub">
              Go to the{" "}
              <a href="/admin" className="admin-link">Admin Panel</a>
              {" "}and add your first product.
            </p>
          </div>
        )}

        {/* ── Product Grid ── */}
        {!loading && !error && products.length > 0 && (
          <div className="product-grid">
            {products.map((product) => (
              // product._id is the MongoDB document ID
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      <Footer/>
      
    </div>
     
  );
}

export default HomePage;
