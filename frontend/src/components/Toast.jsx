// src/components/Toast.jsx
// ─────────────────────────────────────────────────────────────
// A small pop-up notification that appears at the bottom-right
// after actions like create, update, delete.
//
// Props:
//   message  → text to show
//   type     → "success" | "error"
//   onClose  → called after the toast disappears
// ─────────────────────────────────────────────────────────────

import React, { useEffect } from "react";
import "./Toast.css";

function Toast({ message, type = "success", onClose }) {
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer); // cleanup if component unmounts
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{type === "success" ? "✓" : "✕"}</span>
      <span className="toast-msg">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
}

export default Toast;
