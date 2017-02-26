const config = require('config');
const io = require('./io');

const log = config.get('log');
const port = config.get('port');

const usersApiRoutes = require('./api-routes/users-api');
const authApiRoutes = require('./api-routes/auth-api');

module.exports = {
  log, port, io,
  apiRoutes: [usersApiRoutes, authApiRoutes],
  runningBehindReverseProxy: true,
  spaRoutes: ['/', '/index.html', '/rooms/:roomId', '/play-local/:gameId', '/users/me'],
  dynamicTemplatesRoot: '../client/server-views',
  serveStatic: ['../client/jspm-src']
}

if (process.env.NODE_ENV === 'production') {
  module.exports.serveStatic.push('../client/jspm-sfx')
}
