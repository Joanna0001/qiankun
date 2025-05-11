import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5001, // 与主应用entry一致
    cors: true, // 允许跨域
    headers: {
      'Access-Control-Allow-Origin': '*', // 主应用访问权限
    },
  },
  build: {
    // 打包成UMD格式，供Qiankun加载
    lib: {
      entry: 'src/main.js',
      name: 'viteSubApp',
      formats: ['umd'],
      fileName: () => 'vite-sub-app.js',
    },
    rollupOptions: {
      external: ['vue'], // 避免重复打包Vue
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
