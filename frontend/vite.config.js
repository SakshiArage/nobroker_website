import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      'lucide-react': fileURLToPath(new URL('./node_modules/lucide-react', import.meta.url)),
      recharts: fileURLToPath(new URL('./node_modules/recharts', import.meta.url)),
    },
  },
});
