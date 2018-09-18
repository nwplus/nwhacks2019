// Jest needs a few extra plugins that do weird things in builds (dynamic-import
// transform breaks bundle splitting, for example)
// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('babel-jest').createTransformer({
  presets: [
    'env',
    'react',
  ],
  plugins: [
    'transform-class-properties',
    'babel-plugin-transform-runtime',
    'babel-plugin-transform-dynamic-import',
  ],
});
