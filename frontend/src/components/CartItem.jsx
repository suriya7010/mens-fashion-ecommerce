

import React from "react";
import "./CartItem.css";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  // Helper: format number as Indian Rupees
  const formatPrice = (amount) =>
    "₹" + amount.toLocaleString("en-IN");

  return (
    <div className="cart-item">

      {/* Product Image */}
      <div className="item-image">
        <span className="item-emoji">{item.emoji}</span>
      </div>

      {/* Product Details */}
      <div className="item-details">
        <p className="item-brand">{item.brand}</p>
        <p className="item-name">{item.name}</p>
        <p className="item-meta">
          Size: {item.size} &nbsp;·&nbsp; Color: {item.color}
        </p>

        {/* Bottom row: quantity controls + price + remove */}
        <div className="item-footer">

          {/* Quantity Controls: − qty + */}
          <div className="qty-control">
            <button
              className="qty-btn"
              onClick={() => onDecrease(item.id)}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="qty-number">{item.qty}</span>
            <button
              className="qty-btn"
              onClick={() => onIncrease(item.id)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <div className="item-right">
            {/* Price = unit price × quantity */}
            <span className="item-price">
              {formatPrice(item.price * item.qty)}
            </span>

            {/* Remove button */}
            <button
              className="remove-btn"
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.name} from cart`}
            >
              ✕
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default CartItem;
