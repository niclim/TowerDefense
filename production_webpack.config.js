// For production

var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: null,
  entry: ["./src/js/entry.js"],
  output: {
    path: path.resolve(__dirname, "app/js"),
    publicPath: "/src/js/",
    filename: "main.min.js"
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};
