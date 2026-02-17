import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** @type {import('vite').UserConfig} */
export default {
  plugins: [react(), tailwindcss()],
  root: ".",
  publicDir: "public",
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
};


