import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the absolute path to the client directory
const clientPath = resolve(__dirname, "./client");

export default defineConfig({
  root: clientPath,
  base: "/",
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: resolve(clientPath, "src") + "/"
      },
      {
        find: "@assets",
        replacement: resolve(__dirname, "./attached_assets")
      }
    ]
  },
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: resolve(clientPath, "index.html"),
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
