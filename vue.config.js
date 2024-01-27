const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:4500/',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/'}
      }
    }
  }
})
