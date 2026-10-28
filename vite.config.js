import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 多頁入口：index.html = 學生版；builder.html = 後台劇本制作器
const here = (p) => resolve(dirname(fileURLToPath(import.meta.url)), p)

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: here('index.html'),
        builder: here('builder.html'),
      },
    },
  },
})
