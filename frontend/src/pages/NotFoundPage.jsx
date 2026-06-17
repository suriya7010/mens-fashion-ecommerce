// src/pages/NotFoundPage.jsx
// ─────────────────────────────────────────────────────────────
// Shown when the user visits any URL that doesn't match
// a defined route (e.g. /blah, /products/xyz).
//
// The App.jsx route is:  <Route path="*" element={<NotFoundPage />} />
// The "*" matches everything not already matched above it.
// ─────────────────────────────────────────────────────────────

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <p className="notfound-code">404</p>
        <h1 className="notfound-title">Page not found</h1>
        <p className="notfound-sub">
          This page doesn't exist — or it may have been moved.
        </p>
        <div className="notfound-actions">
          {/* navigate(-1) goes back to the previous page in browser history */}
          <button className="notfound-back" onClick={() => navigate(-1)}>
            ← Go back
          </button>
          <Link to="/" className="notfound-home">Take me home</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
