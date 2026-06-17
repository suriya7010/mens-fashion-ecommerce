// src/pages/LoginPage.jsx
// ─────────────────────────────────────────────────────────────
// Login page — shown at URL: /login
//
// Introduces two more React Router concepts:
//
// 1. useNavigate() — to redirect after login
//    After the user submits the form, we navigate them
//    to the home page programmatically.
//
// 2. Link — to provide a "Back to shop" link without reload
// ─────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  // Form field values stored in state
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // Prevent the browser's default form submit (which reloads the page)
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Simulate a login request (in a real app, you'd call your API here)
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      // After "login" succeeds, redirect to home page
      // navigate("/") sends the user to the home page
      navigate("/");
    }, 1200);
  };

  return (
    <div className="login-page">

      {/* Simple top bar */}
      <div className="login-topbar">
        <Link to="/" className="login-logo">SARTO <span>&amp; CO.</span></Link>
      </div>

      <div className="login-container">

        {/* Left decorative panel */}
        <div className="login-left">
          <p className="login-tagline-eyebrow">Welcome back</p>
          <h2 className="login-tagline">
            Style is a<br />way to say<br /><em>who you are.</em>
          </h2>
          <p className="login-sub">
            Sign in to access your orders,<br />
            saved items, and exclusive offers.
          </p>
        </div>

        {/* Right: the login form */}
        <div className="login-right">
          <div className="login-card">
            <h1 className="login-title">Sign in</h1>
            <p className="login-welcome">
              New here?{" "}
              {/*
                Link navigates without a page reload.
                In a full app, this would go to a /register page.
              */}
              <Link to="/" className="register-link">
                Create an account
              </Link>
            </p>

            {/* Error message */}
            {error && <p className="login-error">⚠ {error}</p>}

            {/* Login form */}
            <form className="login-form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="form-input"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

            </form>

            <div className="login-divider"><span>or</span></div>

            <button className="google-btn">
              <span className="google-icon">G</span>
              Continue with Google
            </button>

            <p className="back-to-shop">
              <Link to="/" className="back-link">← Back to shop</Link>
              &nbsp;·&nbsp;
              <Link to="/cart" className="back-link">View cart</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
