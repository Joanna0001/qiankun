import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: 'src/components.d.ts',
    }),
  ],
  server: {
    port: 5000,
    cors: {
      origin: process.env.VITE_APP_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),
    },
  },
  define: {
    'import.meta.env.VITE_SUB_APP_URL': JSON.stringify(process.env.VITE_SUB_APP_URL),
  },
  cacheDir: '.vite_cache',
  build: {
    sourcemap: true,
  },
})
