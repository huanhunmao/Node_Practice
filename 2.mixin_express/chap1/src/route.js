// 创建一个简单的路由处理系统，允许用户通过不同的 HTTP 请求方法向特定路径注册处理函数

module.exports = Route 
var methods = require('methods') // 该模块包含 HTTP 请求方法的字符串数组，如 'GET'、'POST' 等
var flatten = require('array-flatten') // 用于将嵌套的数组扁平化
var Layer = require('./Layer')

// 定义了一个 Route 构造函数，接受一个路径参数，并初始化了一些属性，如路径 (path) 和处理函数栈 (stack)
function Route(path){
    this.path = path
    this.stack = []

    this.methods = {}
}

Route.prototype.dispatch = function dispatch(req,res,done){}

// 遍历 HTTP 请求方法数组 ['GET','POST','PUT' ...]，为每个方法动态添加对应的函数到 Route.prototype 中
methods.forEach(function(method){
    // 例如，如果 method 为 'GET'，则会动态添加 Route.prototype.GET 方法
    Route.prototype[method] = function (){
        // 将传入的参数转换为数组，并通过 array-flatten 模块将可能存在的嵌套数组扁平化
        var handles = flatten(Array.prototype.slice.call(arguments))

        // 遍历处理函数数组 handles
        for(let i = 0; i < handles.length; i++){
            // 获取当前循环迭代的处理函数
            var handle = handles[i]

            if(typeof handle !== 'function'){
                var type = toString.call(handle)
                var msg = 'Route.' + method + '() requires a callback function but got a ' + type
                throw new Error(msg);
            }

            // 通过 Layer 模块创建一个新的路由层 (layer)，其中路径为'/'，参数为空对象 {}，处理函数为当前迭代的处理函数
            var layer = new Layer(this.path, {}, handle, method);

            // 在 Route 对象中记录已添加的方法，以便后续可以知道哪些方法已经注册了处理函数
            this.methods[method] = true;
            // 将创建的路由层添加到 stack 数组中，即将其注册到路由中
            this.stack.push(layer)
        }

        // 返回 this，使链式调用成为可能
        return this
    }
})