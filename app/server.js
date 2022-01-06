const jsonServer = require("./api/node_modules/json-server");
const server = jsonServer.create();
const router = jsonServer.router("./api/db.json");
const middlewares = jsonServer.defaults({ static: "./client/build" });
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);
