// backend/routes/productRoutes.js
// ─────────────────────────────────────────────────────────────
// Full CRUD API. The homepage calls GET /api/products to fetch
// all products from MongoDB and display them.
// ─────────────────────────────────────────────────────────────

const express = require("express");
const router  = express.Router();
const Product = require("../models/Product");

// ── GET /api/products/stats ──────────────────────────────────
// Dashboard summary numbers. Must be BEFORE /:id
router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalStock    = await Product.aggregate([
      { $group: { _id: null, total: { $sum: "$stock" } } },
    ]);
    const featuredCount = await Product.countDocuments({ isFeatured: true });
    const lowStock      = await Product.countDocuments({ stock: { $lt: 5 } });

    res.json({
      success: true,
      data: { totalProducts, totalStock: totalStock[0]?.total || 0, featuredCount, lowStock },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── GET /api/products ────────────────────────────────────────
// Fetch all products. Used by BOTH the homepage and admin panel.
// Supports ?search= and ?category= query params.
router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name:  { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }
    if (category && category !== "All") {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── GET /api/products/:id ────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ── POST /api/products ───────────────────────────────────────
// Create product. Accepts imageUrl field from admin form.
router.post("/", async (req, res) => {
  try {
    if (typeof req.body.size === "string") {
      req.body.size = req.body.size.split(",").map((s) => s.trim()).filter(Boolean);
    }

    const product = new Product(req.body);
    const saved   = await product.save();

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ── PUT /api/products/:id ────────────────────────────────────
// Update product. imageUrl can be updated from admin panel.
router.put("/:id", async (req, res) => {
  try {
    if (typeof req.body.size === "string") {
      req.body.size = req.body.size.split(",").map((s) => s.trim()).filter(Boolean);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ── DELETE /api/products/:id ─────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: `"${product.name}" deleted successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;