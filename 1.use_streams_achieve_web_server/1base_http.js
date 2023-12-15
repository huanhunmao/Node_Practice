
const http = require('http');

const server = http.createServer()

const PORT = 3000;

server.on('request', (req, res) => {
    // req 下 还有更低的 socket
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello ppx')
})

server.listen(PORT)

// This data comes from the parameter req, which is the Request object created by Node. 
// This Request object also has a property called .socket, which is the lower-level TCP socket.

// In the code above, the fact that we have access to a nice object with req.method and req.url means that someone other than
//  us went through the trouble of parsing the text of the request and making it into a nice object.