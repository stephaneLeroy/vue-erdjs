import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import nodeConfig from './vite.config.node'

// https://vitejs.dev/config/
export default defineConfig({
    ...nodeConfig,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
    optimizeDeps: {
        exclude: ["vue-erdjs"]
    }
})
