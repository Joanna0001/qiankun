import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import imagemin from 'vite-plugin-imagemin'
import { visualizer } from 'rollup-plugin-visualizer/dist/plugin/index.js'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    qiankun('vite-sub-app', {
      useDevMode: true
    }), // 子应用名称，需与主应用注册的名称一致
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    }),
    imagemin({
      // JPG 压缩配置
      mozjpeg: {
        quality: 80,  // 压缩质量，范围 0-100
        progressive: true  // 使用渐进式加载
      },
      
      // PNG 压缩配置
      optipng: {
        optimizationLevel: 7  // 优化级别，范围 0-7
      },
      
      // GIF 压缩配置
      gifsicle: {
        optimizationLevel: 7,  // 优化级别
        interlaced: false  // 不使用交错
      },
      
      // SVG 压缩配置
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'  // 移除 viewBox 属性
          },
          {
            name: 'removeEmptyAttrs',  // 移除空属性
            active: false  // 不启用
          }
        ]
      }
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
  // 根据环境设置 base
  base: process.env.NODE_ENV === 'production' 
    ? '/vite-sub-app/'  // 生产环境路径
    : '/',              // 开发环境路径
  server: {
    port: 5001, // 与主应用entry一致
    cors: true, // 允许跨域
    headers: {
      'Access-Control-Allow-Origin': '*', // 主应用访问权限
    },
    // 添加热更新配置
    hmr: {
      overlay: true
    },
    // 添加开发服务器优化
    watch: {
      usePolling: true,
      interval: 1000
    },
    // 优化热更新
    warmup: {
      clientFiles: [
        './src/main.js',
        './src/App.vue'
      ]
    }
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
      external: ['vue', 'vue-router', 'pinia', '@vueuse/core'], // 添加更多外部依赖
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          'pinia': 'Pinia',
          '@vueuse/core': 'VueUse'
        },
        // 优化分包配置
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia', '@vueuse/core'],
          'utils': ['axios', 'lodash-es'],
          'ui': ['element-plus'] // 如果使用 UI 库
        }
      },
    },
    // 添加构建优化配置
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2
      },
      format: {
        comments: false
      }
    },
    // 优化资源处理
    assetsInlineLimit: 4096, // 小于 4kb 的资源内联
    cssCodeSplit: true, // CSS 代码分割
    reportCompressedSize: false, // 禁用压缩大小报告
    // 优化 chunk 大小警告
    chunkSizeWarningLimit: 2000
  },
  // 强制预构建依赖
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      '@vueuse/core',
      'axios'
    ],
    exclude: ['your-large-dependency'],
    // 添加预构建优化
    esbuildOptions: {
      target: 'es2015'
    }
  }
})
