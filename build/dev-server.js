var path = require('path')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')
var opn = require('opn')
var config = require('../config')


if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var webpackConfig = require('./webpack.dev.conf.js')

var url = 'localhost:' + config.dev.port

var proxy = [{
    path: '/*/*',
    target: 'http://localhost: 9000',
    host: 'localhost:9000',
    secure: true
}]

var server = new webpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    stats: {
        colors: true
    },
    proxy
})

server.app.get('*', function(req, res) {
    res.sendFile(__dirname + 'index.html')
})
server.listen(8080, "localhost", function(req, res) {
    console.log('开启服务')
})
