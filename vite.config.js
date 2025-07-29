import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Fix para __dirname en ES modules (necesario para Windows)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    cors: true,
    host: true,
    port: 5173
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast']
          // ❌ ELIMINADO: referencias a framer-motion y lucide-react
          // animations: ['framer-motion'],
          // icons: ['lucide-react']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});