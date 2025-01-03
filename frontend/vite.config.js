import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,  // Set your desired port here
  },
  build: {
    outDir: 'dist',  // Output directory for build files
  },
  resolve: {
    alias: {
      '@': '/src',  // Alias for src folder, so you can use @/components instead of relative paths
    },
  },
});
