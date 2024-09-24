// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore specific warnings or handle them differently
        if (warning.code === 'UNRESOLVED_IMPORT') {
          // Suppress unresolved import warnings
          return;
        }
        // Handle the rest of the warnings normally
        warn(warning);
      }
    }
  }
});
