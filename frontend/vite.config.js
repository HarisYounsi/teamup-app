export default defineConfig({
  plugins: [react()],
  base: './', // ← change simplement cette ligne
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
})
