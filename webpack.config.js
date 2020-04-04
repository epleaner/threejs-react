const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "eval-source-map",
  resolve: {
    alias: {
      Mesh: path.resolve(__dirname, "src/mesh/"),
      Canvas: path.resolve(__dirname, "src/canvas/")
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  }
};
