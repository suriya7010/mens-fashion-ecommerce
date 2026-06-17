// src/components/Hero.jsx
// ─────────────────────────────────────────────
// The big banner section at the top of the page.
// No props needed here — it's purely visual.
// ─────────────────────────────────────────────

import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Left side: text content */}
      <div className="hero-left">
        <p className="hero-eyebrow">Summer Collection 2025</p>
        <h1 className="hero-title">
          Dressed for<br />every <em>occasion.</em>
        </h1>
        <p className="hero-subtitle">
          Discover our new arrivals — tailored suits, formal shirts,
          and premium accessories crafted for the modern gentleman.
        </p>
        <button className="hero-cta">
          Shop Collection →
        </button>
      </div>

      {/* Right side: decorative visual */}
      <div className="hero-right">
        <span className="hero-icon">🧥</span>
        <span className="hero-badge">New Arrivals</span>
      </div>

    </section>
  );
}

export default Hero;
