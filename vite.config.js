import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
export default defineConfig({
  base: process.env.PUBLIC_BASE_PATH || "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@content": fileURLToPath(new URL("./content", import.meta.url)),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
  },
});
