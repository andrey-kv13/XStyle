import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react';
          if (id.includes('node_modules/framer-motion')) return 'motion';
          if (id.includes('node_modules/embla-carousel')) return 'carousel';
          if (id.includes('node_modules/lucide-react')) return 'icons';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
