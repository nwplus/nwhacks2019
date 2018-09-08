const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const plugins = require('./webpack.plugins');

// Define webpack development settings here
module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  // sourcemaps are currently broken
  // devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
  },
  // Handles missing fs module
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        // Load js files
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-0', 'react'],
            },
          },
        ],
      },
      {
        // Load SASS stylesheets
        test: /\.sass/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        // In case we use external libraries that have old-school CSS
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Package any static assets
        test: /\.png($|\?)|\.jpg($|\?)|\.ico($|\?)|\.otf($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: plugins.concat([
    new webpack.DefinePlugin({
      // suppress react devtools console warning
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
    }),
    new BundleAnalyzerPlugin(),
  ]),
};
