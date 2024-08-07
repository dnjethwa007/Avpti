import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/user': 'http://localhost:4000', // Forward requests to your backend server
    },
  },
});
