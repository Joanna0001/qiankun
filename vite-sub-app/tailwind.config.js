/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // 可以扩展主题
        colors: {
          primary: '#3B82F6',
        }
      },
    },
    plugins: [],
    // 确保样式不会影响其他应用
    corePlugins: {
      preflight: false,
    }
  }