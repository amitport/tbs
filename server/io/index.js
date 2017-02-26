const ioFactory = require('socket.io');

const msgHandlers = require('./msgHandlers');

module.exports = function realtime(http) {
  ioFactory(http)
    .on('connection', function (socket) {
      msgHandlers.room(socket);
    });

  return http;
}
