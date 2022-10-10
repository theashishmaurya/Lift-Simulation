const path = require("path");
module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: "/node_modules",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/js"),
    publicPath: "/dist/js/", // instead of publicPath: '/build/'
  },
};
