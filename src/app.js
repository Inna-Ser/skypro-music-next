const http = require("http");

const server = http.createServer((request, response) => {
  response.status = 200;
  response.statusMessage = "ok";
  response.header = "Content-type: text/plain";
  response.write = "hello, world";
  response.end;
});

server.listen(3000, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3000");
});
