import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Set base URL for production if needed
  base: '/',  // Change this based on your production deployment path

  build: {
    outDir: 'dist',  // Output directory for build files
    assetsDir: 'assets',  // Directory for static assets
    sourcemap: false,  // Disable source maps in production
    minify: 'terser',  // Minify code for production
  },

  resolve: {
    alias: {
      '@': '/src',  // Alias for src folder
    },
  },
});
