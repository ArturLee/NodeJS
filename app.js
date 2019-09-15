const http = require('http'); //could be any name

const routes = require('./routes');

const server = http.createServer(routes);

server.listen(3000); 