import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' keeps the build fully portable: it can be hosted at any
// domain root or subfolder (Netlify, Vercel, cPanel, GoDaddy...).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    // In dev, run the Express server separately (`npm run server`) on
    // port 3001; Vite forwards /api calls to it so the contact form works
    // identically to production without CORS setup.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
