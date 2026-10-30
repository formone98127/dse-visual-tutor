import { resolve, dirname } from 'node:path'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { CONTENT_VERSION, CONTENT_STAMP } from './src/data/contentVersion.js'

// 多頁入口：index.html = 學生版；builder.html = 後台劇本制作器
const here = (p) => resolve(dirname(fileURLToPath(import.meta.url)), p)

/** Write public/content-version.json so the phone app can bust WebView cache. */
function contentVersionPlugin() {
  const write = () => {
    const dir = here('public')
    mkdirSync(dir, { recursive: true })
    writeFileSync(
      resolve(dir, 'content-version.json'),
      JSON.stringify(
        {
          version: CONTENT_VERSION,
          stamp: CONTENT_STAMP,
          builtAt: new Date().toISOString(),
        },
        null,
        2,
      ),
    )
  }
  return {
    name: 'content-version',
    buildStart: write,
    configureServer() {
      write()
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), contentVersionPlugin()],
  // Phone app (Expo) opens this site over Wi‑Fi — listen on all network interfaces
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: here('index.html'),
        builder: here('builder.html'),
      },
    },
  },
})
