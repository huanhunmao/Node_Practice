// 创建一个可用于构建 web 应用程序的框架，通过将一些属性合并到应用程序函数中，以及通过初始化函数来设置应用程序的初始状态

var mixin = require('merge-descriptors') // 用于将对象属性合并
var proto = require('./app') // 应用程序的原型对象

exports = module.exports = createApplication; // 导出一个用于创建应用程序的函数

// 该函数接受请求、响应和下一个中间件函数，并调用 app.handle 处理请求
function createApplication(){ 
    let app = function (req, res, next) {
        app.handle(req, res, next);
    }

    // 将 proto 对象的属性合并到 app 函数中
    mixin(app, proto, false)

    // 初始化应用程序状态的函数
    app.init()
    return app
}

// 将 proto 对象添加到模块的导出中，这样外部代码可以访问应用程序的原型对象
exports.application = proto;