var autoprefixer = require('autoprefixer')

/**
 * postcss-loader配置
 * 修复flexbox的bug
 * 为css添加前缀
 */

module.exports = {
    plugins: [
      require('precss')({
        parser: require('postcss-scss'),
      }),
      require('postcss-flexbugs-fixes'),
      autoprefixer({
          browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
          ],
          flexbox: 'no-2009',
      })
    ]
}