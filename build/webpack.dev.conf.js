var webpack = require('webpack')
var path = require('path')
var webpackBaseConfig = require('./webpack.base.js')
var merge = require('webpack-merge')
var config = require('../config')

module.exports = merge(webpackBaseConfig, {
    entry: {
        app: [
                './src/app.js',
                'webpack/hot/dev-server',
                `webpack-dev-server/client?http://${config.dev.host}:${config.dev.port}`,
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
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: config.dev.assetsPublicPath,
        port: 8080,
        compress: true,
        inline: true
    }
})
