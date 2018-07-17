# Mbo

react脚手架

[![GitHub tag](https://img.shields.io/badge/Mbo-1.1.0-green.svg)](https://github.com/thecatshidog/Mbo/tree/v1.1.0)
[![Conda](https://img.shields.io/conda/pn/conda-forge/python.svg)]()
[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)
### 脚手架做了哪些事情

### js功能

#### babel-plugin-transform-runtime插件

使用这个插件是为了自动检查代码中是否有Promise、Map之类等新类型，如果有就自动插入对应的polyfill(垫片)。
这些polyfill来自babel-runtime库，babel-runtime这个库本身只是将core.js和regenerator-runtime库做了一个粘合和映射。所以经常有下面这样的代码，下面这个代码其实就是我们需要在代码开头插入的helper代码，不过通过插件自动插入了。
```
const Promise = require('babel-runtime/core-js/promise')
```
所以，这个插件的作用就是自动，按需从babel-runtime中加载polyfill。

而且需要注意的是，这个插件没有在全局变量上插入Promise、Symbol之类的保留字，而是用其他的变量引用，然后通过一个函数返回引用。这样我们就可以引用其他的库，而不会导致代码冲突。(其他引入的库可能污染全局或者prototype)

值得注意的是，babel-runtime是不支持内置对象原型上的方法转换的，所以还是需要引入core-js.js，这样的babel-runtime+core-js方案，比引入polyfill代码量要少。

#### babel-preset-env插件

这里使用这个插件而不是es2015，es2017之类的，是因为babel官方也开始推荐babel-preset-env插件，而开始不继续维护es20XX库。这个库通过配置，按需加载plugin和polyfill，其实也会引用es2015，es2017的插件，不过是按需加载。

代码中，先将react代码通过babel-preset-react编译之后，然后通过babel-preset-env进行编译，下面是对应babelrc配置。

target: 指定了在浏览器中编译条件。(这里还可以在node，app等中指定编译条件)。
modules: 指定模块类型，譬如AMD，CMD，CommonJS，这里讲modules设为false，将模块化交给webpack去处理，毕竟webpack是模块处理器。

```
"presets": [
        ["env", {
            "modules": false,
            "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
            }
        }],
        "react"
    ],
```

在这里，preset-env不设置自动引入babel-polyfill，因为这个包比使用runtime要更大一点，我们直接引入core-js.js解决include数组之类的问题，然后runtime会去做regenerator-runtime的粘合.

#### babel-preset-react插件

翻译react

最后还得注意一点，以上的配置不是万能的，可能还是需要对应的安装ES6语法糖的插件

### css功能

#### sass-loader

可以使用sass进行开发

#### postcss-loader

可以开心的使用flexbox语法，而且向前做了很大的兼容，这点和vue-cli相同。

### feature

1、使用RouteWithSubRoutes的方案，将路由统一的放在routes文件夹中配置，这样可以避免路由分散，在深入多级路由的时候，只需要配置RouteWithSubRoutes就行了，这点对应的看pages/Route2中的index.jsx就可以了。

2、接下来应该会通过Container组件，来做登陆组件，以实现route的onEnter函数。（route-v4没有钩子函数）

3、public文件夹中通过devServer的contentBase配置，可以拉到资源，一般配置index.html、favicon.ico、manifest.json。

### TODO

- [x] config在开发环境下注入
- [x] 支持打包时，替换CDN地址
- [x] 支持pre-commit,在git commit之前做代码lint检测
- [x] 添加bin目录，支持CI自动部署方案脚本，在打包机器打包后分发,Docker打包部署
- [x] 重构eslint的需求
- [x] 重写README.md
- [x] 重写PWA的支持
- [x] 支持代码分割，添加代码分割解决方案
- [x] 项目示例代码重写
- [x] 重写redux的逻辑，使用rematch框架，探索新的写法
- [x] 优化webpack打开页面，前期无法连接websocket的error提醒


参考文章：

1、[再见，babel-preset-2015](https://zhuanlan.zhihu.com/p/29506685)

2、[Babel polyfill 知多少](https://zhuanlan.zhihu.com/p/29058936)

3、[devServer配置手册](https://doc.webpack-china.org/configuration/dev-server/#devserver-contentbase)

4、[webpack：从入门到真实项目配置](https://juejin.im/post/59bb37fa6fb9a00a554f89d2)

5、[webpack4简单入门](https://juejin.im/post/5ad75bf6f265da5059168b1d)

6、[webpack4-react16-demo](https://github.com/durban89/webpack4-react16-reactrouter-demo)