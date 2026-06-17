

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./CartPage.css";

function CartPage({ cartItems = [], setCartItems }) {
  const navigate = useNavigate();
  const [imgErrors, setImgErrors] = useState({}); // track broken images per item

  // ── Increase qty ──
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // ── Decrease qty (min 1) ──
  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, qty: Math.max(1, item.qty - 1) }
          : item
      )
    );
  };

  // ── Remove item ──
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // ── Handle broken image URLs ──
  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  // ── Totals ──
  const subtotal  = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping  = subtotal > 0 && subtotal < 2000 ? 199 : 0;
  const total     = subtotal + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const fmt       = (n) => "₹" + Number(n).toLocaleString("en-IN");

  return (
    <div className="cart-page">
      <Navbar cartCount={itemCount} />

      <div className="cart-layout">

        {/* ── LEFT: Cart items ── */}
        <div className="cart-left">
          <h1 className="cart-heading">
            Your cart{" "}
            <span className="cart-meta">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
          </h1>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p className="empty-icon">🛍️</p>
              <p className="empty-title">Your cart is empty</p>
              <p className="empty-sub">Browse the shop and add some items.</p>
              <Link to="/" className="shop-btn">Shop now</Link>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">

                  {/* ── FIX: Product image from imageUrl ── */}
                  <div className="item-img-wrap">
                    {item.imageUrl && !imgErrors[item._id] ? (
                      // Show real product image stored in MongoDB
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="item-img"
                        onError={() => handleImgError(item._id)}
                      />
                    ) : (
                      // Fallback placeholder if no image or broken URL
                      <div className="item-img-placeholder">
                        <span>👔</span>
                      </div>
                    )}
                  </div>

                  {/* ── Item details ── */}
                  <div className="item-info">
                    <p className="item-brand">{item.brand}</p>
                    <p className="item-name">{item.name}</p>
                    <p className="item-meta">
                      {item.color && `Color: ${item.color}`}
                      {item.color && item.category && " · "}
                      {item.category}
                    </p>

                    <div className="item-actions">
                      {/* Quantity stepper */}
                      <div className="qty-wrap">
                        <button className="qty-btn" onClick={() => handleDecrease(item._id)}>−</button>
                        <span className="qty-num">{item.qty}</span>
                        <button className="qty-btn" onClick={() => handleIncrease(item._id)}>+</button>
                      </div>

                      <div className="item-right">
                        <span className="item-price">{fmt(item.price * item.qty)}</span>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemove(item._id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Order summary ── */}
        <div className="cart-summary">
          <h2 className="summary-title">Order summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className={`summary-row ${shipping === 0 && subtotal > 0 ? "free" : ""}`}>
            <span>Shipping</span>
            <span>{subtotal === 0 ? "—" : shipping === 0 ? "Free" : fmt(shipping)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>

          {subtotal > 0 && subtotal < 2000 && (
            <p className="shipping-hint">
              Add {fmt(2000 - subtotal)} more for free shipping
            </p>
          )}

          <button
            className="checkout-btn"
            disabled={cartItems.length === 0}
            onClick={() => navigate("/login")}
          >
            {cartItems.length === 0 ? "Cart is empty" : "Proceed to checkout →"}
          </button>

          <Link to="/" className="continue-link">← Continue shopping</Link>
        </div>

      </div>
    </div>
  );
}

export default CartPage;

