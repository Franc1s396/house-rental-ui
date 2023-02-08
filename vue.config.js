const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

let proxyObj = {};
proxyObj['/'] = {
  ws: false,
  target: 'http://localhost/rental-api',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj,
    allowedHosts: "all"
  },
  publicPath:'./'
}
