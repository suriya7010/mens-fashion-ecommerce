

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Product = require("./models/Product");

const products = [
  { name: "Slim Fit Black Suit",    description: "Timeless two-piece black suit.",        price: 8999,  category: "Suits",       brand: "Raymond",       stock: 15, size: ["38","40","42","44"], color: "Black",    isFeatured: true  },
  { name: "White Oxford Shirt",     description: "Crisp white cotton formal shirt.",       price: 1299,  category: "Shirts",      brand: "Peter England", stock: 40, size: ["S","M","L","XL"],   color: "White",    isFeatured: false },
  { name: "Navy Formal Trousers",   description: "Flat-front navy blue trousers.",         price: 2499,  category: "Trousers",    brand: "Arrow",         stock: 25, size: ["30","32","34","36"], color: "Navy",     isFeatured: false },
  { name: "Tan Leather Oxfords",    description: "Premium full-grain leather oxfords.",   price: 4999,  category: "Shoes",       brand: "Clarks",        stock: 3,  size: ["7","8","9","10"],    color: "Tan",      isFeatured: true  },
  { name: "Burgundy Silk Tie",      description: "Pure silk tie in deep burgundy.",       price: 799,   category: "Ties",        brand: "Park Avenue",   stock: 50, size: ["One Size"],          color: "Burgundy", isFeatured: false },
  { name: "Charcoal Grey Suit",     description: "Modern slim charcoal grey suit.",       price: 9499,  category: "Suits",       brand: "Raymond",       stock: 2,  size: ["38","40","42"],      color: "Charcoal", isFeatured: true  },
  { name: "Sky Blue Linen Shirt",   description: "Breathable linen shirt for summer.",    price: 1899,  category: "Shirts",      brand: "Louis Philippe", stock: 30, size: ["S","M","L","XL"],   color: "Blue",     isFeatured: false },
  { name: "Leather Belt - Brown",   description: "Genuine leather belt with pin buckle.", price: 599,   category: "Accessories", brand: "Woodland",      stock: 60, size: ["32","34","36","38"], color: "Brown",    isFeatured: false },
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany({});
  console.log("🗑️  Cleared existing products");
  await Product.insertMany(products);
  console.log(`✅ Inserted ${products.length} sample products`);
  mongoose.connection.close();
};

seed();
