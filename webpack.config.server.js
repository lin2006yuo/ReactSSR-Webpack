const path = require("path")

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, "src/client/server_app.js"),
  output: {
    filename: "server_app.js",
    path: path.join(__dirname, "dist"),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
}
