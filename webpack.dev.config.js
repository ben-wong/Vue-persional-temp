const path = require('path');
const resolve = (dir) => path.join(__dirname, '.', dir);
const TerserPlugin = require('terser-webpack-plugin'); // production console不打包
const packageinfo = require('./deploy/package.json');
const version = packageinfo.version || '0.0.0';

const webpackConfig = {
  output: {
    filename: `static/js/[name].${version}.js`,
    chunkFilename: `static/js/[name].${version}.js`,
  },
  context: path.resolve(__dirname, './'),
  // 别名
  resolve: {
    alias: {
      '@': resolve('src'),
      'api': resolve('src/api'),
      'public': resolve('public'),
      'views': resolve('src/views'),
      'store': resolve('src/store'),
      'assets': resolve('src/assets'),
      'router': resolve('src/router'),
      'utils': resolve('src/utils'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
    ]
  },
  optimization: { // production console不打包
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          filename: `[name].bundle.${version}.js`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'] // 移除console
          }
        },
      }),
    ]
  }
};

module.exports = webpackConfig;
