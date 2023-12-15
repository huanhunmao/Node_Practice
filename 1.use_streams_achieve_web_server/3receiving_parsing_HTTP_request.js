// net 才是底层 NodeJS provides the built-in net module to create a streaming TCP server.

const net = require('net');
const server = net.createServer()
server.on('connection',handleConnection)
server.listen(3000)

function handleConnection(socket){
    socket.on('data',(chunk) => {
        console.log('Received chunk:\n', chunk.toString());
    })

    socket.write('HTTP/1.1 200 OK\r\nServer: my-web-server\r\nContent-Length: 0\r\n\r\n');
}   


//  node xxx 启动服务 
// curl -v localhost:3000/some/url 
// 得到get结果
// Received chunk:
//  GET /some/url HTTP/1.1
// Host: localhost:3000
// User-Agent: curl/8.1.1
// Accept: */*

// 再使用 curl -v -XPOST -d'hello=ppx' localhost:3000/some/url 获得 post 结果 
// Received chunk:
//  POST /some/url HTTP/1.1
// Host: localhost:3000
// User-Agent: curl/8.1.1
// Accept: */*
// Content-Length: 9
// Content-Type: application/x-www-form-urlencoded

// hello=ppx