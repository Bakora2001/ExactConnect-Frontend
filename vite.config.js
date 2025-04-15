import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import path module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Add alias for `@/`
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'UNRESOLVED_IMPORT') {
          return;
        }
        warn(warning);
      },
    },
  },
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path'; // Import path module

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'), // Add alias for `@/`
//     },
//   },
//   server: {
//     port: 5173,
//     strictPort: true, // Prevents switching to another port
//   },
//   build: {
//     rollupOptions: {
//       onwarn(warning, warn) {
//         if (warning.code === 'UNRESOLVED_IMPORT') {
//           return;
//         }
//         warn(warning);
//       },
//     },
//   },
// });
