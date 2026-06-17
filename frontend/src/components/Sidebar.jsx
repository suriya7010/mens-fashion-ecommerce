

import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "sidebar-link active" : "sidebar-link";

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">S</span>
        <div>
          <p className="logo-name">SIVA OUTFITS</p>
          <p className="logo-sub">Admin Panel</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-section-label">Main Menu</p>

        <Link to="/admin" className={isActive("/admin")}>
          <span className="link-icon">◈</span>
          <span>Dashboard</span>
        </Link>

        <Link to="/admin/products/new" className={isActive("/admin/products/new")}>
          <span className="link-icon">＋</span>
          <span>Add Product</span>
        </Link>

        {/* Link back to the customer website */}
        <Link to="/" className="sidebar-link" style={{ marginTop: "auto" }}>
          <span className="link-icon">🏪</span>
          <span>View Store</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <div className="admin-avatar">A</div>
        <div>
          <p className="admin-name">Admin</p>
          <p className="admin-role">Store Manager</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
