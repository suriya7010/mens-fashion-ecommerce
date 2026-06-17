// frontend/src/services/api.js
// ─────────────────────────────────────────────────────────────
// All API calls use Axios instead of fetch().
//
// WHY AXIOS instead of fetch()?
//   - Automatically parses JSON (no .json() needed)
//   - Better error messages
//   - Cleaner syntax for sending data
//   - Works the same in all browsers
//
// INSTALL: npm install axios
// ─────────────────────────────────────────────────────────────

import axios from "axios";

// Base URL — Vite proxy forwards /api → http://localhost:5000
// So we just write "/api/products" instead of the full URL.
const BASE = "/api/products";

// ── Get dashboard stats ──────────────────────────────────────
export const fetchStats = async () => {
  const res = await axios.get(`${BASE}/stats`);
  return res.data.data;
};

// ── Get all products ─────────────────────────────────────────
// Called by BOTH the homepage and admin dashboard.
// Optional search and category filters.
export const fetchProducts = async (search = "", category = "All") => {
  const params = {};
  if (search)             params.search   = search;
  if (category !== "All") params.category = category;

  const res = await axios.get(BASE, { params });
  return res.data.data; // returns the array of products
};

// ── Get single product by id ─────────────────────────────────
export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE}/${id}`);
  return res.data.data;
};

// ── Create a new product ─────────────────────────────────────
// productData includes imageUrl from the admin form
export const createProduct = async (productData) => {
  const res = await axios.post(BASE, productData);
  return res.data.data;
};

// ── Update a product ─────────────────────────────────────────
export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${BASE}/${id}`, productData);
  return res.data.data;
};

// ── Delete a product ─────────────────────────────────────────
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`);
  return res.data.message;
};