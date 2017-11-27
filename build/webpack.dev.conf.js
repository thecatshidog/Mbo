var webpack = require('webpack')
var path = require('path')
var webpackBaseConfig = require('./webpack.base.conf.js')
var merge = require('webpack-merge')
var config = require('../config')

module.exports = merge(webpackBaseConfig, {
    entry: {
        app: [
                `webpack-dev-server/client?http://${config.dev.host}:${config.dev.port}`,
                'webpack/hot/dev-server',
                './src/app.jsx',
            ]
    },
    module: {
        rules: [{
            test: /\.(sass|scss|css)$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 启HRM
    ]
})
