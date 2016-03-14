import Room from '../../game/room';

export function create({gameTypeName, username}) {
  // todo verify creator

  const socket = this;
  return Room.create({gameTypeName,
    creator: {
      name: username,
      onRoomUpdate(room) {
        socket.emit('room:update', room.serialize());
      },
      _id: socket.id
    }
  });
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

export function join({roomId, username}) {
  const room = Room.get(roomId);

  const socket = this;
  const roomJoinResponse = room.join({
    name: username,
    onRoomUpdate(room) {
      socket.emit('room:update', room.serialize());
    },
    _id: socket.id}
  );

  socket.meta = {
    roomId,
    playerIdx: roomJoinResponse.ownIdx
  };

  return roomJoinResponse;
}

export function setIsReady({roomId, isReady}) {
  const room = Room.get(roomId);

  room.setIsReady({playerId: this.id, isReady});
}
