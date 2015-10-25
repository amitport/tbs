import SessionFactory from '../../../client/jspm-src/games/sessionFactory';

import Room from '../../game/room';

import roomsRepo from '../../game/roomsRepo';



export default {
  create: function(gameId) {
    return roomsRepo.add(new Room({
      status: 'WAITING_FOR_SECOND_PLAYER',
      gameId: gameId,
      members: [{socket: this, ready: true}, {ready: true}]
    }));
  },
  join: function (roomId) {
    const room = roomsRepo.get(roomId);

    if (room.status === 'IN_PROGRESS' &&
      room.members[0].socket !== this &&
      room.members[1].socket !== this) {
      throw 'room full';
    }

    if (room.status === 'WAITING_FOR_SECOND_PLAYER' && room.members[0].socket !== this) {
      room.members[1].socket = this;
      room.status = 'IN_PROGRESS';

      room.session = SessionFactory.create(room.gameId, function(result) {
        if (result !== 'tie') {
          room.stat[room.session.currentPlayer.idx]++;
        }
        room.members[0].ready = false;
        room.members[1].ready = false;
      });

      room.members[0].socket.emit('room:update', room.serialize());
    }

    return {room: room.serialize(), ownIdx: (room.members[0].socket === this) ? 0 : 1};
  },
  ready: function (roomId) {
    const room = roomsRepo.get(roomId);

    if (this === room.members[0].socket) {
      room.members[0].ready = true;
    }
    if (this === room.members[1].socket) {
      room.members[1].ready = true;
    }

    if (room.members[0].ready && room.members[1].ready) {
      room.session.recycle();
    }

    room.members.forEach(function (player) {
      player.socket.emit('room:update', room.serialize());
    });
  }
};
