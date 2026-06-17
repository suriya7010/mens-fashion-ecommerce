

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage       from "./pages/HomePage";
import CartPage       from "./pages/CartPage";
import LoginPage      from "./pages/LoginPage";
import DashboardPage  from "./pages/DashboardPage";
import ProductFormPage from "./pages/ProductFormPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      // FIX: use product._id (MongoDB ID) not product.id
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        // Product already in cart — just increase quantity
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      // New product — spread the FULL product object so imageUrl,
      // name, price, brand, etc. are all available in CartPage
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"    element={<HomePage cartCount={cartCount} onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<DashboardPage />} />
        <Route path="/admin/products/new"      element={<ProductFormPage />} />
        <Route path="/admin/products/edit/:id" element={<ProductFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

