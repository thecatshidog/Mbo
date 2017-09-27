var webpack = require('webpack')
var config = require('../config')
var webpackBaseConfig = require('./webpack.base.conf.js')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var utils = require('./utils')

var env = process.env.NODE_ENV === 'testing'
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
                use: ['css-loader', 'postcss-loader' ,'sass-loader']
            })
        }]
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/bundle.[hash].js'),
        publicPath: config.build.assetsPublicPath
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: utils.assetsPath('js/vendor.[hash].js')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/main.[hash].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        })
    ]
})