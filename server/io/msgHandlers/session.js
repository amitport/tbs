import roomsRepo from '../../game/roomsRepo';

export function action(msg) {
  const room = roomsRepo.get(msg.roomId);
  room.session[msg.actionId](msg.payload);

  const serializedRoom = room.serialize();
  room.members[0].socket.emit('room:update', serializedRoom);
  if (room.members[1].hasOwnProperty('socket')) {
    room.members[1].socket.emit('room:update', serializedRoom);
  }
}
