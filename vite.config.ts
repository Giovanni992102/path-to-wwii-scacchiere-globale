import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const projectRoot = fs.realpathSync(fileURLToPath(new URL('.', import.meta.url)));

export default defineConfig(() => {
  return {
    root: projectRoot,
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': projectRoot,
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalized = id.replace(/\\/g, '/');
            if (normalized.includes('node_modules')) {
              if (normalized.includes('react') || normalized.includes('react-dom')) {
                return 'vendor-react';
              }
              if (normalized.includes('d3')) {
                return 'vendor-d3';
              }
              if (normalized.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              return 'vendor-libs';
            }
          },
        },
      },
      chunkSizeWarningLimit: 10000,
    },
  };
});
