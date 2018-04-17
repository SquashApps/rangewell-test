const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use(jsonServer.rewriter({
  "/ideas/new": "/ideas",
  "/idea/update/:id": "/ideas/:id",
  "/idea/delete/:id": "/ideas/:id"
}));

server.use(router)
server.listen(3004, () => {
  console.log('JSON Server is running')
})