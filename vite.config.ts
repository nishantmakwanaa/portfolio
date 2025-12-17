import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    cors: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure images are handled correctly
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})
