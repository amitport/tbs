const gameTypes = require('../../client/src/games');

class Room {
  constructor({gameTypeName, creator, id}) {
    this.id = id;
    this.gameType = gameTypes[gameTypeName];

    this.gameType.initializeRoom(this);

    this.players[0].isOpen = true;

    this.join(creator);
  }

  onChange(isGameEnded = false) {
    if (isGameEnded) {
      this.players.forEach((player, idx) => {
        if (player.onGameEnd) {
          player.onGameEnd(this, idx)
        }
      });
    }

    if (this.players.every((player) => player.isReady)) {
      this.players.forEach((player) => {delete player.isReady;});

      this.gameType.startGame(this);
    }

    // notify player observers
    this.players.forEach((player, idx) => {
      if (player.onRoomUpdate) {
        player.onRoomUpdate(this, idx)
      }
    });
  }

  findPlayer(playerId) {
    return this.players.find((player) => player._id === playerId);
  }

  findPlayerIdx(playerId) {
    return this.players.findIndex((player) => player._id === playerId);
  }

  setIsReady({playerId, isReady}) {
    this.findPlayer(playerId).isReady = isReady;

    this.onChange();
  }

  join({joinAtIdx, onRoomUpdate, onGameEnd, name = '{anonymous}', _id, isReady = false, type = 'human'}) {
    if (_id != null) {
      for (let i = 0; i < this.players.length; i++) {
        const player = this.players[i];
        if (player._id === _id) {
          joinAtIdx = i;
        }
      }
    }
    if (joinAtIdx == null) {
      for (let i = 0; i < this.players.length; i++) {
        if (this.players[i].isOpen) {
          joinAtIdx = i;
          break;
        }
      }
    }
    let player;
    if (joinAtIdx != null &&
      (player = this.players[joinAtIdx]) && (player.isOpen || type === 'ai' || _id != null && player._id === _id)) {
      player.onRoomUpdate = onRoomUpdate;
      if (onGameEnd != null) player.onGameEnd = onGameEnd;
      player.type = type;
      if (_id != null) player._id = _id;
      player.name = name;
      player.isReady = isReady;

      player.isOpen = false;

      this.onChange();

      return Object.assign(this.serialize(), {ownIdx: joinAtIdx});
    } else {
      throw Error('all player slots are occupied')
    }
  }

  joinAi({joinAtIdx, aiTypeId}) {
    const aiType = this.gameType.ai[aiTypeId];
    this.join({joinAtIdx, onRoomUpdate: aiType.onRoomUpdate, onGameEnd: aiType.onGameEnd, name: `{ai}`, isReady: true, type: 'ai'})
  }

  setIsOpen({playerIdx, isOpen}) {
    const player = this.players[playerIdx];

    delete player.onRoomUpdate;
    delete player.onGameEnd;
    delete player.name;
    delete player.isReady;

    player.type = 'human';
    player.isOpen = isOpen;

    this.onChange();
  }

  gameAction(action) {
    if (this.game.isInProgress &&
        action.meta.playerIdx === this.game.currentPlayerIdx &&
        this.gameType.actions.hasOwnProperty(action.type)) {
      this.gameType.actions[action.type](Object.assign({action}, this));

      this.onChange(this.game.isEnded);
    } else {
      throw Error('illegal game action');
    }
  }

  serialize() {
    return {
      gameTypeName: this.gameType.name,
      game: this.game.hasOwnProperty('snapshot') ? this.game.snapshot() : this.game,
      statistics: this.statistics,
      players: this.players.map((player) => {
        const serializedPlayer = Object.assign({}, player);
        delete serializedPlayer.onRoomUpdate;
        delete serializedPlayer.onGameEnd;
        return serializedPlayer;
      })
    }
  }

  static list() {
    return this.rooms.filter((room) => room.players.some((player) => player.isOpen)).map((room) => {
      return {
        gameTypeName: room.gameType.name,
        id: room.id,
        players: room.players.map((player) => {return {isOpen: player.isOpen};})
      };
    })
  }

  static create({gameTypeName, creator}) {
    return this.rooms.push(new Room({gameTypeName, creator, id: this.rooms.length})) - 1;
  }

  static get(roomId) {
    if (!this.rooms.hasOwnProperty(roomId)) {
      throw 'room not found';
    }

    return this.rooms[roomId];
  }
}

Room.rooms = [];

module.exports = Room;
