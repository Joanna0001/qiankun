import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('vite-sub-app', {
      useDevMode: true
    }), // 子应用名称，需与主应用注册的名称一致
  ],
  // base: 'http://your-domain.com/', // 生产环境需指定运行域名
  // base: '/vite-sub-app/', // 必须与主应用的 activeRule 匹配
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
  // 强制预构建依赖
  optimizeDeps: {
    include: ['vue']
  }
})
