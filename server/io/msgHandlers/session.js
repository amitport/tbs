import roomsRepo from '../../game/roomsRepo';

export default {
  action: function (msg) {
    const room = roomsRepo.get(msg.roomId);
    room.session[msg.actionId](msg.payload);

    const serializedRoom = room.serialize();
    room.members[0].socket.emit('room:update', serializedRoom);
    room.members[1].socket.emit('room:update', serializedRoom);
  }
}
