// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



// import { defineConfig } from 'vite';

// export default defineConfig({
//   base: './',
//   build: {
//     outDir: 'dist',
//   },
// });



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
//   base: './',
//   plugins: [react()],
//   build: {
//     outDir: 'dist',
//   },
// });




import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

