module.exports = {

  devServer: {
    port: 8080
  },

  // vue项目中关闭eslint
  lintOnSave: false,

  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        business: '@/components/business',
        common: '@/components/common',
        network: '@/network',
        views: '@/views',
      }
    }
  }

}