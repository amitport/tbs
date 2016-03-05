import Room from '../../game/room';

export function create({gameTypeId, username}) {
  // todo verify creator

  return Room.create({gameTypeId,
    creator: {socket: this, username}
  });
}

export function setAiOpponent({roomId}) {
  const room = Room.get(roomId);

  if (room.members[0].socket !== this) {
    throw Error('must be a member of this room');
  }

  const gameType = room.gameType;
  room.session = new gameType([gameType.playerTypes.Human, gameType.playerTypes.AI], function (result) {
    if (result !== 'tie') {
      room.stat[room.session.currentPlayer.idx]++;
    }
    room.members[0].ready = false;
  });
  room.members[1].username = '{AI}';
  room.members[1].ready = true;

  room.members[0].socket.emit('room:update', room.serialize());
}

export function join({roomId, username}) {
  const room = Room.get(roomId);

  if (room.members[0].socket !== this &&
    room.members[1].hasOwnProperty('socket') && room.members[1].socket !== this) {
    throw Error('room full');
  }

  if (room.members[0].socket !== this && !room.members[1].hasOwnProperty('socket')) {
    room.members[1].socket = this;
    room.members[1].username = username;

    const gameType = room.gameType;
    room.session = new gameType([gameType.playerTypes.Human, gameType.playerTypes.Human], function (result) {
      if (result !== 'tie') {
        room.stat[room.session.currentPlayer.idx]++;
      }
      room.members[0].ready = false;
      room.members[1].ready = false;
    });

    room.members[0].socket.emit('room:update', room.serialize());
  }

  return {room: room.serialize(), ownIdx: (room.members[0].socket === this) ? 0 : 1};
}

export function ready({roomId, isReady}) {
  const room = Room.get(roomId);

  if (this === room.members[0].socket) {
    room.members[0].ready = (isReady != null) ? isReady : true;
  }
  if (this === room.members[1].socket) {
    room.members[1].ready = (isReady != null) ? isReady : true;
  }

  if (room.members[0].ready && room.members[1].ready) {
    room.session.recycle();
  }

  room.members.forEach(function (member) {
    if (member.hasOwnProperty('socket')) {
      member.socket.emit('room:update', room.serialize());
    }
  });
}
