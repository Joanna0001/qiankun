import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // 将 @ 映射到 src 目录
      // 可添加其他别名，例如：
      // 'components': resolve(__dirname, './src/components')
    }
  }
})
