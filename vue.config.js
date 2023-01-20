const { AutoCreateVueRouteWebpackPlugin } = require('@jdu/vue-router-autocomplete');

const publicPath = `/${process.env.VUE_APP_NAME}/`;
module.exports = {
  devServer: {
    compress: true,
    host: 'fe.local.com',
    port: 7001,
    headers: { 'Access-Control-Allow-Origin': '*' },
    hotOnly: false,
    disableHostCheck: true,
    proxy: {
      [`${publicPath}_baseAPI/`]: {
        target: 'http://fe.local.com:8199/',
        changeOrigin: true,
        pathRewrite: { [`${publicPath}_baseAPI`]: '' },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new AutoCreateVueRouteWebpackPlugin({ cwd: __dirname, hideConsole: true }, null, true),
    ],
  },
};
