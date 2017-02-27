const config = require('config');
const wsMessageSets = require('./ws-message-sets/room');

const log = config.get('log');
const port = config.get('port');

const usersApiRouter = require('./api-routers/users-api');
const authApiRouter = require('./api-routers/auth-api');

module.exports = {
  log, port,
  apiRouters: [usersApiRouter, authApiRouter],
  runningBehindReverseProxy: true,
  spaRoutes: ['/', '/index.html', '/rooms/:roomId', '/play-local/:gameId', '/users/me'],
  dynamicTemplatesRoot: '../client/server-views',
  serveStatic: ['../client/build'],
  wsMessageSets: {room: wsMessageSets}
}

