import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
    }),
    {
      name: "rename-index",
      closeBundle() {
        fs.renameSync("dist/index.html", "dist/popup.html");
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
      output: {
        entryFileNames: "popup.js",
        assetFileNames: "assets/[name].[ext]",
        chunkFileNames: "assets/[name].[hash].js",
      },
    },
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
