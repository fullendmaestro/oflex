import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";

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
});
