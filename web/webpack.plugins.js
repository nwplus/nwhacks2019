const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// Define webpack plugins used in dev and prod configurations here
module.exports = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new HtmlWebpackPlugin({
    template: './index.html',
    favicon: './assets/favicon.ico',
    filename: 'index.html',
    inject: true,
  }),
  new Dotenv({
    path: '../.env',
    systemvars: true,
  }),
  new MinifyPlugin(),
];
