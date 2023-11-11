import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      crypto: "crypto-browserify", // Alias 'crypto' to 'crypto-browserify'
      stream: "stream-browserify", // Alias 'stream' to 'stream-browserify'
    },
  },
  base: "",
  plugins: [react()],
});