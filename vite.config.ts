import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const env = loadEnv("", ".", "");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: env.VITE_BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^${env.VITE_API_URL}`), ""),
      },
    },
  },
});
