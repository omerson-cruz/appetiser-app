module.exports = {
  configureWebpack: {
    devtool: "#source-map",
  },
  transpileDependencies: ["vuetify"],
  publicPath:
    process.env.NODE_ENV === "production" ? "/appetiser-signin-signup" : "/",
};
