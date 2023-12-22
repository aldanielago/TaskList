import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/aos': 'https://s-install.avcdn.net',
      '/api': 'https://s-install.avcdn.net',
    },
    '/api': {
      target: 'https://s-install.avcdn.net',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
})
