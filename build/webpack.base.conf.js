var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
// 自助生成html，因为有hash这样的值存在，所以可以减少麻烦
var HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const vendor = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom'
]

module.exports = {
    entry: {
        app: './src/app.jsx',
        vendor: vendor,
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // manifest文件是将每次打包都会更改的东西单独提取出来，保证没有更改的代码无需重新打包，这样可以加快打包速度，其实就是一个js模块的load加载器
        // manifest就是webpack运行时代码块部分
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest'],
            minChunks: Infinity,
        })
    ]
}