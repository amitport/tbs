const config = require('config');
const wsMessageSets = require('./server/ws-message-sets/room');

const log = config.get('log');
const port = config.get('port');

const usersApiRouter = require('./server/api-routers/users-api');
const authApiRouter = require('./server/api-routers/auth-api');

module.exports = {
  log, port,
  apiRouters: [usersApiRouter, authApiRouter],
  runningBehindReverseProxy: true,
  spaRoutes: ['/', '/index.html', '/rooms/:roomId', '/play-local/:gameId', '/users/me'],
  dynamicTemplatesRoot: './client/server-views',
  wsMessageSets: {room: wsMessageSets}
}

