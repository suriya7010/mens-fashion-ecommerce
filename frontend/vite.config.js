// vite.config.js
// ─────────────────────────────────────────────────────────────
// Vite configuration file. Place this in the ROOT of your
// frontend folder (same level as package.json).
//
// The proxy setting tells Vite:
//   "Any request to /api/... should be forwarded to
//    http://localhost:5000/api/..."
//
// This is why your fetch("/api/products") works in development
// without needing to write the full URL every time.
// ─────────────────────────────────────────────────────────────

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // frontend runs on this port
    proxy: {
      // Any request starting with /api will be forwarded
      "/api": {
        target: "http://localhost:5000", // your Express backend
        changeOrigin: true,              // required for virtual hosted sites
      },
    },
  },
});
