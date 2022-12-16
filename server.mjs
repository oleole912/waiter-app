import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('build/db/app.json');
const middlewares = jsonServer.defaults({
  static: 'build',
  noCors: true
});
const port = process.env.PORT || 3131;
server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);
server.listen(port);