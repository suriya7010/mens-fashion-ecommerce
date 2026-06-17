

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Suits", "Shirts", "Trousers", "Shoes", "Accessories", "Ties"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      default: 0,
      min: 0,
    },
    size: {
      type: [String],
      default: [],
    },
    color: {
      type: String,
      default: "",
    },

    
    imageUrl: {
      type: String,
      default: "", 
    },
    // ───────────────────────────────────────────────────────

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);