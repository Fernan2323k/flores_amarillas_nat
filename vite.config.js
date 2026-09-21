import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/flores_amarillas_nat/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
})