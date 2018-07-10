const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// Define webpack plugins used in dev and prod configurations here
module.exports = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body',

    // Enable this when we get a sweet sweet favicon
    // favicon: 'static/favicon.ico',
  }),
  new Dotenv({
    path: '../.env',
    systemvars: true,
  }),
  new MinifyPlugin(),
];
