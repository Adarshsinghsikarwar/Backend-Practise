var http = require("http");

var server = http.createServer((req, res) => {
  res.end("Hello from the Server"); // here I programmmed a server , if I was not programmed the server . then i did'nt get any result form the server
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
