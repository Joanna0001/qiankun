import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: "/vite-sub-app/",
  plugins: [
    vue(),
    qiankun('vite-sub-app', {
      useDevMode: true
    }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
          resolveIcons: true
        })
      ],
      dts: 'src/components.d.ts',
    })
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  server: {
    port: 5001,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 将 node_modules 中的代码单独打包
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            if (id.includes('ant-design-vue')) {
              return 'antd-vendor'
            }
            if (id.includes('@vueuse') || id.includes('axios')) {
              return 'utils'
            }
            return 'vendor'
          }
          // 将组件代码单独打包
          if (id.includes('src/components')) {
            return 'components'
          }
          // 将页面代码单独打包
          if (id.includes('src/views') || id.includes('src/pages')) {
            return 'pages'
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      '@vueuse/core',
      'axios'
    ]
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(command === 'build' ? 'production' : 'development')
  }
}))
