
class RoomsRepo {
  constructor() {
    this.rooms = [{
      status: 'WAITING_FOR_SECOND_PLAYER',
      gameId: 'ticTacToe',
      players: [{}, {}]
    }];
  }

  get(id) {
    if (!this.rooms.hasOwnProperty(id)) {
      throw 'room not found';
    }

    const room = this.rooms[id];
    return {
      status: room.status,
      gameId: room.gameId,
      players: [{}, {}]
    };
  }

  add(room) {
    return this.rooms.push(room) - 1;
  }
}

const roomsRepo = new RoomsRepo();

export default {
  join: function (roomId) {
    const room = roomsRepo.get(roomId);
    return {room: room, ownIdx: (room.players[0].socket === this) ? 0 : 1};
  },
  create: function(gameId) {
    return roomsRepo.add({
      status: 'WAITING_FOR_SECOND_PLAYER',
      gameId: gameId,
      players: [{socket: this}, {}]
    });
  }
};
