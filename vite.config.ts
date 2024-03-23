import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/interviews/', // Aquí se especifica la ruta base
  plugins: [react()],
})
