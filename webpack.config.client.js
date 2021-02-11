const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src/client/index.js"),
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "src/public/index.html")
    })
  ],
  devServer: {
    hot: true,
    port: 8080
  }
}
