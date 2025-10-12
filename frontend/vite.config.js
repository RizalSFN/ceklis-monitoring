import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html"
      }
    }
  },
  // server: {
  //   allowedHosts: [
  //     "a8ef784fe4e6.ngrok-free.app", // tambahkan domain ngrok kamu di sini
  //   ],
  //   host: true, // biar bisa diakses dari jaringan luar
  //   port: 5173, // sesuaikan dengan port kamu
  // },
})
