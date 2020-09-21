const webpackConfig = require('./webpack.dev.config');
// const chalk = require('chalk');
// const path = require('path');
const os = require('os');
const packageinfo = require('./deploy/package.json');
// const PathRewriter = require('http-proxy-middleware/lib/path-rewriter');

const version = packageinfo.version || '0.0.0';

function getIPAdress() {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

const IPAdress = getIPAdress();

// function resolve(dir) {
//   return path.join(__dirname, dir);
// }

let vueConfig = {
  pwa: {
    iconPaths: {
      favicon32: 'logo.png',
      favicon16: 'logo.png',
      appleTouchIcon: 'logo.png',
      maskIcon: 'logo.png',
      msTileImage: 'logo.png',
    }
  },
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: true,
  css: {
    // extract: true, //这个为true，不会热更新，注释掉之后会热更新
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
        ]
      }
    }
  },
  configureWebpack: webpackConfig,
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    publicPath: '',
    host: IPAdress,
    proxy: `http://${IPAdress}:3000/`,
    open: true,
    hot: process.env.NODE_ENV !== 'production'
  },
  chainWebpack: config => {
    // console.log('-----plugins----', config.output);
    config.plugins.delete('workbox');
    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css').tap(args => [{
        filename: `static/css/[name].${version}.css`,
        chunkFilename: `static/css/[name].${version}.css`,
      }]);
    }
    // set svg-sprite-loader
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/icons'))
    //   .end();
    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end();
    // const svgRule = config.module.rule('svg')
    // // 清除已有的所有 loader。
    // // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    // debugger
    // svgRule.uses.clear()
    // svgRule
    //   .test(/\.svg$/)
    //   .include.add(path.resolve('src/assets/images'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })

    // const fileRule = config.module.rule('file')
    // fileRule.uses.clear()
    // fileRule
    //   .test(/\.svg$/)
    //   .exclude.add(path.resolve('src/assets/images'))
    //   .end()
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .options({
    //     name: path.posix.join('assets', 'images/[name].[hash:7].[ext]')
    //   })
  }
};

module.exports = vueConfig;
