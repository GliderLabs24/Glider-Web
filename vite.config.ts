import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Get the absolute path to the client directory
const clientPath = path.resolve(__dirname, "./client");

export default defineConfig({
  root: clientPath,
  base: "/",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: path.resolve(clientPath, "src") + "/"
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./attached_assets")
      }
    ]
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(clientPath, "index.html"),
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['react-router-dom']
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  preview: {
    port: 3000,
    open: true
  }
});
