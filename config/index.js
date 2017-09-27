var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: './static',
        assetsPublicPath: '/'
    },
    dev: {
        env: require('./dev.env'),
        host: 'localhost',
        port: 3000,
        assetsSubDirectory: '/',
        assetsPublicPath: '/',
        cssSourceMap: false
    }
}