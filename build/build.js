const path = require('path');
const webpackProdConf = require('./webpack.prod.conf');
const config = require('../config');
const webpack = require('webpack');
const rm = require('rimraf');



/**
 * @desc: rm删除dist/static文件夹，这里获得是绝对路径
 */

process.env.NODE_ENV = "production";
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
        console.log('build is success!');
    })
})
