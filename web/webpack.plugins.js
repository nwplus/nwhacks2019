const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Define webpack plugins used in dev and prod configurations here
module.exports = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: true,
  }),
  new MinifyPlugin(),
];
