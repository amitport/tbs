import Room from '../../game/room';
import crypto from 'crypto';
import base58 from 'bs58';

export function create({gameTypeName, username}) {
  // todo verify creator

  const socket = this;
  if (!socket.hasOwnProperty('playerId')) {
    socket.playerId = base58.encode(crypto.randomBytes(16));
  }

  const roomCreateResponse =  Room.create({gameTypeName,
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
export function subscribeToLobby() {
  this.join('lobby');
  this.isInLobby = true;

  return Room.list();
}

export function gameAction({roomId, type, payload}) {
  const room = Room.get(roomId);
  room.gameAction({type, payload, meta: this.meta});
}

export function joinAi({roomId}) {
  const room = Room.get(roomId);

  room.joinAi({joinAtIdx: 1, aiTypeId: 'basic'});
}

export function setIsOpen({roomId, playerIdx, isOpen}) {
  const room = Room.get(roomId);
  room.setIsOpen({playerIdx, isOpen});
}

export function join({roomId, username, playerId}) {
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


  socket.meta = {
    roomId,
    playerIdx: roomJoinResponse.ownIdx
  };

  roomJoinResponse.playerId = socket.playerId;

  return roomJoinResponse;
}

export function setIsReady({roomId, isReady}) {
  const room = Room.get(roomId);

  room.setIsReady({playerId: this.playerId, isReady});
}
