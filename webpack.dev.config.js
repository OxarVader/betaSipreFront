const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    home: path.resolve(__dirname, "src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js", //corresponde a los nombres key de los archivos
    publicPath: "", //"http://localhost:9000/",
    chunkFilename: "js/[id].[chunkhash].js",
  },
  devServer: {
    //contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    port: 9000,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/",
          },
        },
      },
    ],
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
        title: "WebPackServer",
        template: path.resolve(__dirname, "index.html"),
    }),
  ],
};
