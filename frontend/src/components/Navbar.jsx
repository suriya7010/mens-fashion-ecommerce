// // src/components/Navbar.jsx
// // ─────────────────────────────────────────────
// // A functional component is just a JavaScript
// // function that returns JSX (HTML-like syntax).
// // Props are the "inputs" you pass into a component.
// // ─────────────────────────────────────────────

// import React from "react";
// import "./Navbar.css";

// // This component receives "cartCount" as a prop
// // from App.jsx so it can show the cart badge number.
// function Navbar({ cartCount }) {
//   return (
//     <nav className="navbar">

//       {/* Brand / Logo */}
//       <div className="nav-logo">
//         SARTO <span>&amp; CO.</span>
//       </div>

//       {/* Navigation Links */}
//       <ul className="nav-links">
//         <li><a href="#">New In</a></li>
//         <li><a href="#">Suits</a></li>
//         <li><a href="#">Shirts</a></li>
//         <li><a href="#">Accessories</a></li>
//         <li><a href="#">Sale</a></li>
//       </ul>

//       {/* Action Icons (search, wishlist, cart) */}
//       <div className="nav-actions">
//         <button className="nav-icon" aria-label="Search">🔍</button>
//         <button className="nav-icon" aria-label="Wishlist">🤍</button>
//         <button className="nav-icon cart-icon" aria-label="Cart">
//           🛍️
//           {/* Only show the badge if cartCount is greater than 0 */}
//           {cartCount > 0 && (
//             <span className="cart-badge">{cartCount}</span>
//           )}
//         </button>
//       </div>

//     </nav>
//   );
// }

// export default Navbar;
// src/components/Navbar.jsx
// ─────────────────────────────────────────────────────────────
// The shared navbar used on every page.
//
// KEY CONCEPT — <Link> vs <a>:
//   Normal HTML:   <a href="/cart">Cart</a>
//   React Router:  <Link to="/cart">Cart</Link>
//
// Why use <Link> instead of <a>?
//   <a href="..."> causes a FULL page reload (browser fetches
//   the page from the server again). This is slow and loses
//   all React state.
//
//   <Link to="..."> changes the URL WITHOUT reloading. React
//   Router intercepts it, matches the new URL to a Route,
//   and swaps the component instantly. Fast & state is kept.
//
// useLocation() is a React Router hook that tells you the
// current URL path, so we can highlight the active nav link.
// ─────────────────────────────────────────────────────────────

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount = 0 }) {
  // useLocation() returns the current URL info.
  // location.pathname is just the path: "/", "/cart", "/login"
  const location = useLocation();

  // Helper: returns "active" class if this link's path matches current URL
  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">

      {/* Logo — clicking it goes home */}
      <Link to="/" className="nav-logo">
        SIVA <span>Outfits</span>
      </Link>

      {/* Main navigation links */}
      <ul className="nav-links">
        <li><Link to="/"       className={isActive("/")}>Home</Link></li>
        <li><Link to="/cart"   className={isActive("/cart")}>Cart</Link></li>
        <li><Link to="/login"  className={isActive("/login")}>Login</Link></li>
        <li><Link to="/admin"  className={isActive("/admin")}>Admin</Link></li>
      </ul>

      {/* Right-side icons */}
      <div className="nav-actions">
        {/* Cart icon with badge */}
        <Link to="/cart" className="nav-icon-btn" aria-label="Go to cart">
          🛍️
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </Link>

        {/* Login icon */}
        <Link to="/login" className="nav-icon-btn" aria-label="Login">
          👤
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
