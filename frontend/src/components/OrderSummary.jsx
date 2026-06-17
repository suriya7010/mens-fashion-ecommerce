// src/components/OrderSummary.jsx
// ─────────────────────────────────────────────────────
// The right-side summary box showing subtotal,
// shipping, discount, total, promo code input,
// and the checkout button.
//
// Props:
//   subtotal   → total before shipping/discount
//   discount   → discount amount (0 if no promo applied)
//   onApplyPromo → function to call when promo is submitted
//   itemCount  → number of items (to disable checkout if 0)
// ─────────────────────────────────────────────────────

import React, { useState } from "react";
import "./OrderSummary.css";

function OrderSummary({ subtotal, discount, onApplyPromo, itemCount }) {
  // Local state just for the promo input field
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(false);

  // Shipping is free if subtotal is ₹2000 or more
  const shipping = subtotal >= 2000 ? 0 : 199;
  const total = subtotal + shipping - discount;

  const formatPrice = (amount) =>
    "₹" + Math.round(amount).toLocaleString("en-IN");

  // Called when user clicks "Apply" on promo code
  const handleApplyPromo = () => {
    const result = onApplyPromo(promoCode);
    if (result.success) {
      setPromoMessage(result.message);
      setPromoSuccess(true);
    } else {
      setPromoMessage(result.message);
      setPromoSuccess(false);
    }
  };

  const handleCheckout = () => {
    alert(`Order placed! Total: ${formatPrice(total)} 🎉`);
  };

  return (
    <div className="order-summary">
      <h2 className="summary-title">Order summary</h2>

      {/* Price breakdown rows */}
      <div className="summary-rows">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className={`summary-row ${shipping === 0 ? "free" : ""}`}>
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>

        {/* Only show discount row if a discount is applied */}
        {discount > 0 && (
          <div className="summary-row discount-row">
            <span>Discount</span>
            <span>− {formatPrice(discount)}</span>
          </div>
        )}

        <div className="summary-row total-row">
          <span>Total</span>
          <span>{formatPrice(Math.max(0, total))}</span>
        </div>
      </div>

      {/* Free shipping message */}
      {subtotal > 0 && subtotal < 2000 && (
        <p className="free-shipping-hint">
          Add {formatPrice(2000 - subtotal)} more for free shipping!
        </p>
      )}

      {/* Promo Code Input */}
      <div className="promo-section">
        <div className="promo-row">
          <input
            className="promo-input"
            type="text"
            placeholder="Promo code (try SARTO10)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            // Allow pressing Enter to apply
            onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
          />
          <button className="promo-btn" onClick={handleApplyPromo}>
            Apply
          </button>
        </div>
        {/* Show success or error message */}
        {promoMessage && (
          <p className={`promo-message ${promoSuccess ? "success" : "error"}`}>
            {promoMessage}
          </p>
        )}
      </div>

      {/* Checkout Button — disabled if cart is empty */}
      <button
        className="checkout-btn"
        onClick={handleCheckout}
        disabled={itemCount === 0}
      >
        {itemCount === 0 ? "Cart is empty" : "Proceed to checkout"}
      </button>

      <p className="secure-note">🔒 Secure checkout · Free returns</p>
    </div>
  );
}

export default OrderSummary;
