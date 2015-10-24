import roomsRepo from '../../game/roomsRepo';

export default {
  action: function (msg) {
    const room = roomsRepo.get(msg.roomId);
    room.session[msg.actionId](msg.payload);

    const serializedRoom = room.serialize();
    room.players[0].socket.emit('room:update', serializedRoom);
    room.players[1].socket.emit('room:update', serializedRoom);
  }
}
