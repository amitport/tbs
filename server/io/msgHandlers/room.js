import SessionFactory from '../../game/sessionFactory';

import Room from '../../game/room';

import roomsRepo from '../../game/roomsRepo';



export default {
  create: function(gameId) {
    return roomsRepo.add(new Room({
      status: 'WAITING_FOR_SECOND_PLAYER',
      gameId: gameId,
      players: [{socket: this, ready: true}, {ready: true}]
    }));
  },
  join: function (roomId) {
    const room = roomsRepo.get(roomId);

    if (room.status === 'IN_PROGRESS' &&
      room.players[0].socket !== this &&
      room.players[1].socket !== this) {
      throw 'room full';
    }

    if (room.status === 'WAITING_FOR_SECOND_PLAYER' && room.players[0].socket !== this) {
      room.players[1].socket = this;
      room.status = 'IN_PROGRESS';

      room.session = SessionFactory.create(room.gameId, function(result) {
        if (result !== 'tie') {
          room.stat[room.session.currentPlayer.idx]++;
        }
        room.players[0].ready = false;
        room.players[1].ready = false;
      });

      room.players[0].socket.emit('room:update', room.serialize());
    }

    return {room: room.serialize(), ownIdx: (room.players[0].socket === this) ? 0 : 1};
  },
  ready: function (roomId) {
    const room = roomsRepo.get(roomId);

    if (this === room.players[0].socket) {
      room.players[0].ready = true;
    }
    if (this === room.players[1].socket) {
      room.players[1].ready = true;
    }

    if (room.players[0].ready && room.players[1].ready) {
      room.session.recycle();
    }

    room.players.forEach(function (player) {
      player.socket.emit('room:update', room.serialize());
    });
  }
};
