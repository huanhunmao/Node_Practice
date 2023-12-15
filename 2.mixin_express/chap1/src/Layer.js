// 用于处理路由层的模块，其中 Layer 对象的实例具有匹配路径和处理请求的功能

module.exports = Layer

function Layer(path, options, fn, method) {
    // 如果使用时没有通过 new 关键字调用，它会自动为你创建一个新的实例
    if(!this instanceof Layer){
        return new Layer(path, options, fn, methods)
    }

    // 初始化
    this.handle = fn 
    this.name = fn.name || '<anonymous>';
    this.params = undefined
    this.path = undefined
    this.method = method
}

// 用于检查传入的路径是否与当前实例的路径匹配
Layer.prototype.match = function match(path){
    return this.route.path === path;
}

// 用于处理请求
Layer.prototype.handle_request = function handle(req, res, next){
        // 它调用了保存在 this.handle 中的处理函数，并捕获了可能发生的异常
    var fn = this.handle

    try{
        fn(req, res, next)
    }catch(err){
        console.error(err)
    }
}