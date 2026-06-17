// frontend/src/pages/ProductFormPage.jsx
// ─────────────────────────────────────────────────────────────
// Add / Edit product form for the admin panel.
//
// KEY CHANGE: Added "imageUrl" field so the admin can paste
// an image URL (from Unsplash, Google Images, etc.) and it
// gets saved to MongoDB. The homepage then reads this URL
// and displays it on the product card.
//
// HOW TO GET AN IMAGE URL:
//   1. Go to https://unsplash.com and find a product image
//   2. Right-click the image → "Copy image address"
//   3. Paste it into the Image URL field
// ─────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import { fetchProductById, createProduct, updateProduct } from "../services/api";
import "./ProductFormPage.css";

const EMPTY_FORM = {
  name:        "",
  description: "",
  price:       "",
  category:    "Suits",
  brand:       "",
  stock:       "",
  size:        "",
  color:       "",
  imageUrl:    "", // ← NEW: image URL field
  isFeatured:  false,
};

const CATEGORIES = ["Suits", "Shirts", "Trousers", "Shoes", "Accessories", "Ties"];

function ProductFormPage() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const isEditing = Boolean(id);

  const [form,    setForm]    = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [errors,  setErrors]  = useState({});
  const [toast,   setToast]   = useState(null);

  // Pre-fill form when editing
  useEffect(() => {
    if (!isEditing) return;
    setLoading(true);
    fetchProductById(id)
      .then((product) => {
        setForm({
          name:        product.name,
          description: product.description,
          price:       product.price,
          category:    product.category,
          brand:       product.brand,
          stock:       product.stock,
          size:        Array.isArray(product.size) ? product.size.join(", ") : product.size,
          color:       product.color || "",
          imageUrl:    product.imageUrl || "", // ← load existing image URL
          isFeatured:  product.isFeatured || false,
        });
      })
      .catch((err) => setToast({ message: err.message, type: "error" }))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())        errs.name        = "Name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.price || form.price <= 0) errs.price = "Enter a valid price";
    if (!form.brand.trim())       errs.brand       = "Brand is required";
    if (form.stock === "")        errs.stock       = "Enter stock count";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSaving(true);
    try {
      if (isEditing) {
        await updateProduct(id, form);
        setToast({ message: "Product updated!", type: "success" });
      } else {
        await createProduct(form);
        setToast({ message: "Product created! It will now appear on the homepage.", type: "success" });
      }
      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      setToast({ message: err.response?.data?.message || err.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="form-layout">
        <Sidebar />
        <main className="form-main"><div className="form-loading">Loading product…</div></main>
      </div>
    );
  }

  return (
    <div className="form-layout">
      <Sidebar />
      <main className="form-main">

        <div className="form-header">
          <div className="breadcrumb">
            <Link to="/admin" className="breadcrumb-link">Dashboard</Link>
            <span className="breadcrumb-sep">›</span>
            <span>{isEditing ? "Edit Product" : "Add Product"}</span>
          </div>
          <h1 className="form-title">{isEditing ? "Edit Product" : "Add New Product"}</h1>
          <p className="form-sub">
            {isEditing
              ? "Update the product details. Changes appear on the homepage instantly."
              : "Fill in the details. The product appears on the homepage after saving."}
          </p>
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* Name */}
            <div className="form-group full-width">
              <label className="form-label">Product Name *</label>
              <input className={`form-input ${errors.name ? "input-error" : ""}`}
                type="text" name="name" placeholder="e.g. Slim Fit Black Suit"
                value={form.name} onChange={handleChange} />
              {errors.name && <p className="error-msg">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label className="form-label">Description *</label>
              <textarea className={`form-input form-textarea ${errors.description ? "input-error" : ""}`}
                name="description" placeholder="Describe the product…"
                rows={3} value={form.description} onChange={handleChange} />
              {errors.description && <p className="error-msg">{errors.description}</p>}
            </div>

            {/* ── IMAGE URL FIELD ── */}
            <div className="form-group full-width">
              <label className="form-label">Image URL</label>
              <input className="form-input"
                type="url" name="imageUrl"
                placeholder="https://images.unsplash.com/photo-xxx (paste image address)"
                value={form.imageUrl} onChange={handleChange} />
              <p className="field-hint">
                💡 Right-click any image online → "Copy image address" → paste here.
                Leave blank to show a placeholder.
              </p>
              {/* Live preview of the image URL */}
              {form.imageUrl && (
                <div className="img-preview-wrap">
                  <p className="img-preview-label">Preview:</p>
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="img-preview"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </div>
              )}
            </div>

            {/* Price */}
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input className={`form-input ${errors.price ? "input-error" : ""}`}
                type="number" name="price" placeholder="e.g. 4999"
                min="0" value={form.price} onChange={handleChange} />
              {errors.price && <p className="error-msg">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div className="form-group">
              <label className="form-label">Stock Count *</label>
              <input className={`form-input ${errors.stock ? "input-error" : ""}`}
                type="number" name="stock" placeholder="e.g. 25"
                min="0" value={form.stock} onChange={handleChange} />
              {errors.stock && <p className="error-msg">{errors.stock}</p>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-input form-select" name="category"
                value={form.category} onChange={handleChange}>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div className="form-group">
              <label className="form-label">Brand *</label>
              <input className={`form-input ${errors.brand ? "input-error" : ""}`}
                type="text" name="brand" placeholder="e.g. Raymond"
                value={form.brand} onChange={handleChange} />
              {errors.brand && <p className="error-msg">{errors.brand}</p>}
            </div>

            {/* Sizes */}
            <div className="form-group">
              <label className="form-label">Sizes (comma-separated)</label>
              <input className="form-input" type="text" name="size"
                placeholder="e.g. S, M, L, XL" value={form.size} onChange={handleChange} />
            </div>

            {/* Color */}
            <div className="form-group">
              <label className="form-label">Color</label>
              <input className="form-input" type="text" name="color"
                placeholder="e.g. Black" value={form.color} onChange={handleChange} />
            </div>

            {/* Featured */}
            <div className="form-group full-width">
              <label className="checkbox-label">
                <input type="checkbox" name="isFeatured"
                  checked={form.isFeatured} onChange={handleChange} className="checkbox-input" />
                <span className="checkbox-text">Feature this product on the homepage</span>
              </label>
            </div>

          </div>

          <div className="form-actions">
            <Link to="/admin" className="btn-cancel">Cancel</Link>
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? "Saving…" : isEditing ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}

export default ProductFormPage;
