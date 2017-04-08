// For development
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: "inline-sourcemap",
  entry: ["./src/js/entry.js"],
  module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader"
          }
      ]
  },
  output: {
    path: path.resolve(__dirname, "app/js"),
    publicPath: "/src/js/",
    filename: "main.min.js"
  },
  plugins: [],
};
