var path = require('path')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var opn = require('opn')
var config = require('../config')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';


if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var webpackConfig = require('./webpack.dev.conf.js')

var url = 'localhost:' + config.dev.port

var proxy = [{
    path: '/api',
    target: 'http://localhost: 3001',
    host: 'localhost:3001',
    secure: true
}]

var server = new webpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    https: protocol === 'https',
    stats: {
        colors: true
    },
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'public'),
    proxy
})

server.app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})
server.listen(config.dev.port, "localhost", function(req, res) {
    console.log('在localhost：' + config.dev.port + '开启服务,等待webpack开启')
})
