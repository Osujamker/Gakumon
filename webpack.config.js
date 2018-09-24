const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
          loader: 'file-loader',
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
    port: 3000,
    proxy : {
      "/api": "http://localhost:5000"
    }
  },
  output: {
    path: path.resolve('./public'),
    filename: 'index_bundle.js',
    publicPath: '/',
  }
};