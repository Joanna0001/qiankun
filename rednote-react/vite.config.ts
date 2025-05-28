import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import qiankun from 'vite-plugin-qiankun'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  return {
    base: '/rednote/',
    plugins: [
      !isDev && react(),
      qiankun('rednote-react', {
        useDevMode: true
      })
    ],
    resolve: {
      alias: {
        '@': resolve('./src'), // 使用相对路径
        // 可添加其他别名，例如：
        // 'components': resolve('./src/components')
      }
    },
    server: {
      port: 5002,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          format: 'umd',
          entryFileNames: 'rednote-react.js',
          name: 'rednote-react'
        }
      }
    },
    // 开发环境配置
    optimizeDeps: {
      include: ['react', 'react-dom']
    },
    // 确保开发服务器正确处理模块
    esbuild: {
      jsxInject: `import React from 'react'`
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'window.__POWERED_BY_QIANKUN__': JSON.stringify(true)
    }
  }
})
