module.exports = {
  lintOnSave: false,

  devServer: {
    host: "0.0.0.0",
    port: 9080,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {
      // app is an express instance
    }
  },

  configureWebpack: config => {
    // config.target = "electron-renderer";
  },

  pluginOptions: {
    graphqlMock: true,
    apolloEngine: false
  }
};
