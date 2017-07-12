var path = require('path')
var webpackProdConf = require('./webpack.prod.conf')
var config = require('../config')
var webpack = require('webpack')
var rm = require('rimraf')



/**
 * @desc: rm删除dist/static文件夹，这里获得是绝对路径
 */
console.log(path.join(config.build.assetsRoot, config.build.assetsSubDirectory))
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err

    webpack(webpackProdConf, function (err, stats) {
        if (err) throw err
        process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
        }) + '\n\n')
    })
    console.log('build is success')
})
