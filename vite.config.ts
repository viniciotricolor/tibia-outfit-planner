import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wiki-images': {
        target: 'https://www.tibiawiki.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wiki-images/, '/images'),
      },
    },
  },
  build: {
    sourcemap: false,
  },
})
