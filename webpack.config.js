const path = require('path')

module.exports = {
  entry: ['./src/js/index.js'],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
  }
}