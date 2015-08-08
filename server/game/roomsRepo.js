class RoomsRepo {
  constructor() {
    this.rooms = [];
  }

  get(id) {
    if (!this.rooms.hasOwnProperty(id)) {
      throw 'room not found';
    }

    return this.rooms[id];
  }

  add(room) {
    return this.rooms.push(room) - 1;
  }
}

const roomsRepo = new RoomsRepo();

export default roomsRepo;
