// src/components/Footer.jsx

import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <p className="footer-logo">SARTO &amp; CO.</p>
          <p className="footer-tagline">Dressed for every occasion.</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <p className="footer-col-title">Shop</p>
            <a href="#">New Arrivals</a>
            <a href="#">Suits</a>
            <a href="#">Shirts</a>
            <a href="#">Sale</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-title">Help</p>
            <a href="#">Sizing Guide</a>
            <a href="#">Shipping Info</a>
            <a href="#">Returns</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Sarto &amp; Co. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
