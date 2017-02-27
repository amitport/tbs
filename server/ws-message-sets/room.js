const Room = require('../game/room');
const crypto = require('crypto');
const base58 = require('bs58');

function create({gameTypeName, username}) {
  // todo verify creator
  const socket = this;
  if (!socket.hasOwnProperty('playerId')) {
    socket.playerId = base58.encode(crypto.randomBytes(16));
  }

  const roomCreateResponse = Room.create({gameTypeName,
    creator: {
      name: username,
      onRoomUpdate(room) {
        socket.emit('room:update', room.serialize());
      },
      _id: socket.playerId
    }
  });
  socket.broadcast.to('lobby').emit('room:lobbyUpdate', Room.list());
  return roomCreateResponse;
}

function subscribeToLobby() {
  this.join('lobby');
  this.isInLobby = true;

  return Room.list();
}

function gameAction({roomId, type, payload}) {
  const room = Room.get(roomId);
  room.gameAction({type, payload, meta: this.meta});
}

function joinAi({roomId}) {
  const room = Room.get(roomId);

  room.joinAi({joinAtIdx: 1, aiTypeId: 'basic'});
}

function setIsOpen({roomId, playerIdx, isOpen}) {
  const room = Room.get(roomId);
  room.setIsOpen({playerIdx, isOpen});
}

function join({roomId, username, playerId}) {
  const room = Room.get(roomId);

  const socket = this;
  if (!socket.hasOwnProperty('playerId')) {
    socket.playerId = playerId || base58.encode(crypto.randomBytes(16));
  }

  const roomJoinResponse = room.join({
    name: username,
    onRoomUpdate(room) {
      socket.emit('room:update', room.serialize());
    },
    _id: socket.playerId}
  );


  if (this.isInLobby) {
    this.leave('lobby');
    this.isInLobby = false;
  }

  socket.meta = {
    roomId,
    playerIdx: roomJoinResponse.ownIdx
  };

  roomJoinResponse.playerId = socket.playerId;

  return roomJoinResponse;
}

function setIsReady({roomId, isReady}) {
  const room = Room.get(roomId);

  room.setIsReady({playerId: this.playerId, isReady});
}

module.exports = {create, subscribeToLobby, gameAction, joinAi, setIsOpen, join, setIsReady};
