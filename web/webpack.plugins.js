const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Define webpack plugins used in dev and prod configurations here
module.exports = [
  new BundleAnalyzerPlugin(),
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: true,
  }),
  new Dotenv({
    path: '../.env',
    systemvars: true,
  }),
  new MinifyPlugin(),
];
