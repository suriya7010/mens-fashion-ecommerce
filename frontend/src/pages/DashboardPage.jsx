// src/pages/DashboardPage.jsx
// ─────────────────────────────────────────────────────────────
// The main admin dashboard page. Shows:
//   - Stats row (total products, stock, featured, low stock)
//   - Search + filter bar
//   - Products table with Edit and Delete buttons
//
// useEffect is used to fetch data from the backend API
// when the component first renders (and whenever filters change).
//
// useEffect(fn, [deps])
//   fn    → the function to run
//   deps  → the dependency array. Runs again whenever these values change.
//   []    → empty array means "run only once, on first render"
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import { fetchProducts, fetchStats, deleteProduct } from "../services/api";
import "./DashboardPage.css";

const CATEGORIES = ["All", "Suits", "Shirts", "Trousers", "Shoes", "Accessories", "Ties"];

function DashboardPage() {
  const navigate = useNavigate();

  // ── State ──
  const [products,    setProducts]    = useState([]);
  const [stats,       setStats]       = useState(null);
  const [search,      setSearch]      = useState("");
  const [category,    setCategory]    = useState("All");
  const [loading,     setLoading]     = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); // product to delete
  const [toast,       setToast]       = useState(null);   // { message, type }

  // ── Load stats once on mount ──
  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((err) => console.error("Stats error:", err));
  }, []);

  // ── Load products when search or category changes ──
  // useCallback memoizes the function so it doesn't recreate on every render
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts(search, category);
      setProducts(data);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    // Debounce search: wait 400ms after user stops typing before fetching
    const timer = setTimeout(loadProducts, search ? 400 : 0);
    return () => clearTimeout(timer);
  }, [loadProducts, search]);

  // ── Show toast helper ──
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // ── Handle delete ──
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct(deleteTarget._id);
      setProducts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      // Refresh stats after deletion
      fetchStats().then(setStats).catch(() => {});
      showToast(`"${deleteTarget.name}" deleted successfully`);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  // Format price as Indian Rupees
  const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">

        {/* ── Header ── */}
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Product Dashboard</h1>
            <p className="dash-sub">Manage your store inventory</p>
          </div>
          <Link to="/admin/products/new" className="add-product-btn">
            + Add Product
          </Link>
        </div>

        {/* ── Stat Cards ── */}
        <div className="stats-grid">
          <StatCard title="Total Products" value={stats?.totalProducts ?? "—"} icon="📦" accent="gold"  />
          <StatCard title="Total Stock"    value={stats?.totalStock    ?? "—"} icon="🏪" accent="blue"  />
          <StatCard title="Featured"       value={stats?.featuredCount ?? "—"} icon="⭐" accent="green" />
          <StatCard title="Low Stock (< 5)"value={stats?.lowStock      ?? "—"} icon="⚠️" accent="red"   />
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="filter-bar">
          <input
            className="search-input"
            type="text"
            placeholder="Search by name or brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cat-tab ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Products Table ── */}
        <div className="table-wrap">
          {loading ? (
            <div className="table-loading">Loading products…</div>
          ) : products.length === 0 ? (
            <div className="table-empty">
              <p className="empty-icon">📭</p>
              <p className="empty-title">No products found</p>
              <p className="empty-sub">Try a different search or add a new product.</p>
              <Link to="/admin/products/new" className="add-product-btn" style={{ marginTop: "1rem" }}>
                + Add Product
              </Link>
            </div>
          ) : (
            <table className="product-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <div className="product-cell">
                        <div className="product-initial">
                          {product.name.charAt(0)}
                        </div>
                        <div>
                          <p className="product-name">{product.name}</p>
                          <p className="product-color">{product.color}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge">{product.category}</span>
                    </td>
                    <td className="cell-muted">{product.brand}</td>
                    <td className="cell-price">{fmt(product.price)}</td>
                    <td>
                      {/* Red if stock is low */}
                      <span className={`stock-num ${product.stock < 5 ? "low" : ""}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`featured-dot ${product.isFeatured ? "yes" : "no"}`}>
                        {product.isFeatured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        {/* Edit — navigate to the edit form with this product's id */}
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                        >
                          Edit
                        </button>
                        {/* Delete — show confirmation modal first */}
                        <button
                          className="btn-delete"
                          onClick={() => setDeleteTarget(product)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="table-count">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </p>

      </main>

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <ConfirmModal
          productName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Toast notification ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default DashboardPage;
