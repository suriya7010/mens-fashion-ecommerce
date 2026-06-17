// frontend/src/components/ProductCard.jsx
// ─────────────────────────────────────────────────────────────
// Displays one product card.
// KEY CHANGE: Uses product.imageUrl from MongoDB.
// If no image URL is set, shows a clean placeholder instead.
// ─────────────────────────────────────────────────────────────

import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const { name, brand, price, imageUrl, category, tag } = product;

  // If image fails to load (broken URL), show placeholder
  const [imgError, setImgError] = useState(false);

  const formatPrice = (amount) =>
    "₹" + Number(amount).toLocaleString("en-IN");

  return (
    <div className="product-card">

      {/* ── Product Image ── */}
      <div className="card-image">
        {imageUrl && !imgError ? (
          // Show the real image from MongoDB imageUrl field
          <img
            src={imageUrl}
            alt={name}
            className="card-img"
            onError={() => setImgError(true)} // fallback if URL is broken
          />
        ) : (
          // Placeholder when no image is set
          <div className="card-placeholder">
            <span className="placeholder-icon">👔</span>
            <span className="placeholder-text">No image</span>
          </div>
        )}

        {/* Tag badge (New / Sale) */}
        {tag && (
          <span className={`card-tag ${tag === "Sale" ? "tag-sale" : "tag-new"}`}>
            {tag}
          </span>
        )}

        {/* Add to cart — shows on hover */}
        <button
          className="card-add-btn"
          onClick={() => onAddToCart(product)}
          aria-label={`Add ${name} to cart`}
        >
          + Add to cart
        </button>
      </div>

      {/* ── Product Info ── */}
      <div className="card-body">
        <p className="card-brand">{brand}</p>
        <p className="card-name">{name}</p>
        <div className="card-footer">
          <span className="card-price">{formatPrice(price)}</span>
          <span className="card-category">{category}</span>
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
