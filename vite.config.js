import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/__api': {
        target: 'https://api-bytecookie.click',
        changeOrigin: true,
        secure: false,
        rewrite: p => p.replace(/^\/__api/, ''),
      },
    },
  },
})
