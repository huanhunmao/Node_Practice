var setPrototypeOf = require('setprototypeof'); // 设置对象的原型
var Route = require('./route');
var Layer = require('./Layer') 

// 接受一个包含配置选项的对象作为参数
var proto = module.exports = function(options){
    var opts = options || {};

    function router(req, res, next){
        router.handler(req, res, next);
    }

    // 将 router 的原型设置为 proto，为了继承一些共享的方法和属性
    setPrototypeOf(router, proto)

    router.params = {};
    router._params = [];
    router.caseSensitive = opts.caseSensitive;
    router.mergeParams = opts.mergeParams;
    router.strict = opts.strict;
    router.stack = [];

    return router;
}

// 创建新的路由实例，并将其添加到路由器的处理栈中
proto.route = function route(path){
    var route = new Route(path)

    var layer = new Layer(path, {}, route.dispatch.bind(route))

    layer.route = route

    this.stack.push(layer)

    return route
}

// 处理传入的请求，通过调用处理栈中的路由层来处理请求
proto.handle = function handle(req, res, out) {
    var self = this;
    var stack = self.stack;
    var layer = stack[0];
    var route = layer.route;
    route.stack[0].handle_request(req, res);
}