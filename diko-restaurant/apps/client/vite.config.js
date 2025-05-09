import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@repo/ui': path.resolve(__dirname, '../../libs/ui/src'),
      '@repo/utils': path.resolve(__dirname, '../../libs/utils/src'),
      '@repo/styles': path.resolve(__dirname, '../../libs/styles/src'),
    }
  },
  server: {
    port: 3000
  },
  esbuild: {
    loader: 'jsx',
    include: /\.[jt]sx?$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
