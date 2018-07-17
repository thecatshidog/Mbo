const path = require('path');
const utils = require('./utils');
const config = require('../config');
const webpack = require('webpack');
// 自助生成html，因为有hash这样的值存在，所以可以减少麻烦
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerReport = require('webpack-bundle-analyzer');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const webpackConfig = {
    entry: {
      app: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash:7].js',
      publicPath: process.env.NODE_ENV === 'production'
                  ? config.build.assetsPublicPath
                  : config.dev.assetsPublicPath
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': resolve('src'),
        'components': resolve('src/components')
      }
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },{
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('imgs/[name].[hash:7].[ext]')
          }
        }]
      },{
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }]
      }]
    },
    // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度，其实就是一个js模块的load加载器
    // manifest就是webpack运行时代码块部分
    optimization: {
      runtimeChunk: {
        name: "manifest"
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new WorkboxPlugin.GenerateSW({
        // 这些选项帮助 ServiceWorkers 快速启用
        // 不允许遗留任何“旧的” ServiceWorkers
        clientsClaim: true,
        skipWaiting: true
       }),
       new ManifestPlugin(),
       new webpack.NamedModulesPlugin(),
    ]
}

if (process.env.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = BundleAnalyzerReport.BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;