// src/components/ProductGrid.jsx
// ─────────────────────────────────────────────
// This component renders the category filter
// buttons AND the grid of ProductCards.
//
// useState is a React "hook". It lets a component
// remember data between renders.
// ─────────────────────────────────────────────

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

// All our products live here as a plain array of objects.
// In a real app, you'd fetch these from your backend API.
const ALL_PRODUCTS = [
  { id: 1, name: "Slim Fit Black Suit",    brand: "Raymond",        price: 8999,  oldPrice: null,  category: "Suits",       emoji: "🤵", sizes: ["38","40","42"],        tag: "New"  },
  { id: 2, name: "White Oxford Shirt",     brand: "Peter England",  price: 1299,  oldPrice: 1799,  category: "Shirts",      emoji: "👔", sizes: ["S","M","L","XL"],      tag: "Sale" },
  { id: 3, name: "Navy Formal Trousers",   brand: "Arrow",          price: 2499,  oldPrice: null,  category: "Trousers",    emoji: "👖", sizes: ["30","32","34"],        tag: null   },
  { id: 4, name: "Tan Leather Oxfords",    brand: "Clarks",         price: 4999,  oldPrice: null,  category: "Shoes",       emoji: "👞", sizes: ["8","9","10","11"],     tag: "New"  },
  { id: 5, name: "Burgundy Silk Tie",      brand: "Park Avenue",    price: 799,   oldPrice: 999,   category: "Accessories", emoji: "🎀", sizes: ["One Size"],            tag: "Sale" },
  { id: 6, name: "Charcoal Grey Suit",     brand: "Raymond",        price: 9499,  oldPrice: 11999, category: "Suits",       emoji: "🧥", sizes: ["38","40","42","44"],   tag: "Sale" },
  { id: 7, name: "Sky Blue Linen Shirt",   brand: "Louis Philippe",  price: 1899,  oldPrice: null,  category: "Shirts",      emoji: "👕", sizes: ["S","M","L"],           tag: null   },
  { id: 8, name: "Cognac Derby Shoes",     brand: "Bata",            price: 3499,  oldPrice: null,  category: "Shoes",       emoji: "👟", sizes: ["7","8","9","10"],      tag: "New"  },
];

// The list of category buttons to show above the grid
const CATEGORIES = ["All", "Suits", "Shirts", "Trousers", "Shoes", "Accessories"];

function ProductGrid({ onAddToCart }) {
  // useState(initialValue) returns [currentValue, setterFunction]
  // When setActiveCategory is called, React re-renders the component.
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter products based on selected category.
  // If "All" is selected, show everything.
  const filteredProducts =
    activeCategory === "All"
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section className="product-section">

      {/* Section Header */}
      <div className="section-header">
        <h2 className="section-title">Featured Products</h2>
        <span className="section-count">{filteredProducts.length} items</span>
      </div>

      {/* Category Filter Buttons */}
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

      {/* Product Cards Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          // key tells React how to track each item in the list.
          // Always use a unique id — never use the array index.
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

    </section>
  );
}

export default ProductGrid;
