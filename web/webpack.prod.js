const path = require('path');
const config = require('./webpack.dev');
const plugins = require('./webpack.plugins');

// Define production (build) webpack configuration here
module.exports = {
  mode: 'production',
  entry: config.entry,
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'bundle.js',
  },
  node: config.node,
  module: config.module,
  plugins,
};
