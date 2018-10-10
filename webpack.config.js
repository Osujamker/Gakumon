const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
module.exports = {
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/images'),
      components: path.resolve(__dirname, 'src/jsx/Components'),
      css: path.resolve(__dirname, 'src/css'),
      sass: path.resolve(__dirname, 'src/sass')
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My app',
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|svg)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[path][name].[ext]',
          }
        }]
      },
      {
        test: /\.s?ass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    proxy : {
      "/api": "http://localhost:5000"
    },
    disableHostCheck: true,
    port: 3000
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  }
};