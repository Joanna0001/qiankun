import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 需要安装 @types/node

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5000,
    cors: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 关键配置
    }
  }
})
