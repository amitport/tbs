import ioFactory from 'socket.io';

import msgHandlers from './msgHandlers';

export default function realtime(http) {
  ioFactory(http)
    .on('connection', function (socket) {
      msgHandlers.room(socket);
      msgHandlers.session(socket);
    });

  return http;
}
