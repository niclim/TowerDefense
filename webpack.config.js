// For development
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: "inline-sourcemap",
  entry: ["./src/js/entry.js"],
  output: {
    path: path.resolve(__dirname, "app/js"),
    publicPath: "/src/js/",
    filename: "main.min.js"
  },
  plugins: [],
};
