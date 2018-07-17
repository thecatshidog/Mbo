const webpack = require('webpack');
const config = require('../config');
const webpackBaseConfig = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const utils = require('./utils');

const env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : config.build.env
process.env.NODE_ENV = env.NODE_ENV

module.exports = merge(webpackBaseConfig, {
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                use: ['css-loader', 'postcss-loader']
            })
        }]
    },
    mode: 'production',
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[hash].js'),
      publicPath: config.build.assetsPublicPath
    },
    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js($|\?)/i,
          extractComments: true,
        })
      ],
      runtimeChunk: {
        name: 'manifest',
      }
    },
    plugins: [
        new ExtractTextPlugin({
          filename: utils.assetsPath('css/main.[hash].css')
        }),
        new WorkboxPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
          exclude: [/\.map$/],
        }),
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
    ]
})