import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // This makes all asset paths relative
  build: {
    assetsDir: "", // This puts assets directly in output root
  },
});
