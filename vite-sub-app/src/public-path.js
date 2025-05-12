// 在子应用入口文件顶部添加
// 在Vite子应用中，需动态设置publicPath
if (window.__POWERED_BY_QIANKUN__) {
  // @ts-ignore
  __vite_base__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}