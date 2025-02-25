const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
      rules: []
  },
  plugins:  [
      new HtmlWebpackPlugin ({
          template: './src/index.js'
      })
  ]

};
