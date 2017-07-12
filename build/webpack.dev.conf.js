var webpack = require('webpack')
var path = require('path')
var webpackBaseConfig = require('./webpack.base.js')
var merge = require('webpack-merge')

module.exports = merge(webpackBaseConfig, {
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
        contentBase: path.resolve(__dirname, '/dist'),
        publicPath: '/'
    }
})
