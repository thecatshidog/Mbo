var path = require('path')
var utils = require('./utils')
var config = require('../config')
// 自助生成html，因为有hash这样的值存在，所以可以减少麻烦
var HtmlWebpackPlugin = require('html-webpack-plugin')
// console.log(path.resolve(__dirname, './src/app.js'))
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:7].js',
        publicPath: process.env.NODE_ENV === 'production'
                    ? config.build.assetsPublicPath
                    : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': resolve('src')
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}