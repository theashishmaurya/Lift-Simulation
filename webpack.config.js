const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
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
  plugins: [new HtmlWebpackPlugin()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist", // instead of publicPath: '/build/'
  },
};
