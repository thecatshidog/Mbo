var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/'
    },
    dev: {
        env: require('./dev.env'),
        port: 8080,
        autoOpenBrowser: 'static',
        assetsSubDirectory: '/',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false
    }
}