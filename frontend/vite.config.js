import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Change ça de './' vers '/'
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
})