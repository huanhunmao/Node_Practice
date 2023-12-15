// 剖析 http 

// Here is a sample HTTP request:

// POST /posts/42/comments HTTP/1.1\r\n
// Host: www.my-api.com\r\n
// Accept: application/json\r\n
// Authorization: Bearer N2E5NTU2MzQ5MGQ4N2UzNjIxOTY2ZDU1M2YwNjA3OGFjYjgyMjU4NQ\r\n
// Accept-Encoding: gzip, deflate, br\r\n
// Content-Type: application/json\r\n
// Content-Length: 28\r\n
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0)\r\n
// \r\n
// {"text":"this is a comment"}      req.body



// this is a sample HTTP response:

// HTTP/1.1 200 OK\r\n                  status https://www.w3.org/Protocols/rfc2616/rfc2616-sec6.html#sec6
// Server: nginx/1.9.4\r\n
// Date: Fri, 20 Apr 2017 16:19:42 GMT\r\n
// Content-Type: application/json\r\n
// Content-Length: 141\r\n
// \r\n
// { resp body
//   "id": "8fh924b42o",
//   "text": "this is a comment",
//   "createdAt": "2017-04-20T16:19:42.840Z",
//   "updatedAt": "2017-04-20T16:19:42.840Z"
// }

