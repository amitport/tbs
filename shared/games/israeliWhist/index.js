const Game = require('../game');

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function suitThenRankComparator(a, b) {
  if (a.suit === b.suit) {
    return a.rank - b.rank;
  } else {
    return a.suit - b.suit;
  }
}

function end({statistics, game, players}) {
  game.isInProgress = false;
  game.isEnded = true;

  players.forEach((player, idx) => {
    statistics.score[idx] += (player.contract === player.tricks)
      ? // player made the contract
      (player.contract !== 0)
        ? // non-zero contract
        player.contract * player.contract + 10
        : // zero contract
        (game.totalContract > 13)
          ? 25// over game
          : 50 // under game
      : // player did not made the contract
      (player.contract !== 0)
        ? // non-zero contract
        -Math.abs(player.contract - player.tricks) * 10
        : // zero contract
        -50 + (player.tricks - 1) * 10
  });

  statistics.totalGames++;
}

class IsraeliWhist extends Game {
  //static disabled = true;

  static initializeRoom(room) {
    super.initializeRoom(room, 4);

    room.game.deck = [];
    for (var s = 0; s < 4; s++) {
      for (var r = 0; r < 13; r++) {
        room.game.deck.push({
          rank: r,
          suit: s
        });
      }
    }
  }

  static startGame(room) {
    super.startGame(room, 4);

    const {game, players} = room;

    delete game.bid;
    shuffle(game.deck);

    players[0].hand = game.deck.slice(0, 13).sort(suitThenRankComparator);
    players[1].hand = game.deck.slice(13, 26).sort(suitThenRankComparator);
    players[2].hand = game.deck.slice(26, 39).sort(suitThenRankComparator);
    players[3].hand = game.deck.slice(39, 52).sort(suitThenRankComparator);
    players.forEach((player) => {
      player.tricks = 0;
    });

    game.phase = 'bidding';
  }
}

IsraeliWhist.color = '#e09292';
IsraeliWhist.actions = {
  bid({players, game, action}) {
    //todo check legality
    players[game.currentPlayerIdx].call = game.bid = action.payload;
    game.bid.bidderIdx = game.currentPlayerIdx; //(highest bidder)

    game.currentPlayerIdx = (game.currentPlayerIdx + 1) % 4;
  },
  pass({players, game}) {
    //todo check legality
    players[game.currentPlayerIdx].call = 'pass';

    game.currentPlayerIdx = (game.currentPlayerIdx + 1) % 4;

    if (game.bid && game.bid.bidderIdx === game.currentPlayerIdx) {
      game.phase = 'contract';
      game.totalContract = 0;
    }
  },
  declare({players, game, action}) {
    game.totalContract += players[game.currentPlayerIdx].contract = action.payload;

    game.currentPlayerIdx = (game.currentPlayerIdx + 1) % 4;

    if (players[game.currentPlayerIdx].contract) {
      game.down = [];
      game.roundStarterIdx = game.currentPlayerIdx;
      game.phase = 'rounds';
    }
  },
  putDown({statistics, players, game, action}) {

    const hand = players[game.currentPlayerIdx].hand;
    const cardIdx = hand.findIndex((card) => action.payload.suit === card.suit && action.payload.rank === card.rank);
    hand.splice(cardIdx, 1);

    game.down.push(action.payload);

    if (game.down.length === 4) {
      let roundWinnerIdx = (game.currentPlayerIdx + 1) % 4;
      for (let i = 1,
             highestCard = game.down[0],
             leadingSuit = highestCard.suit;
           i < 4; i++) {
        const currentCard = game.down[i];
        if (currentCard.suit === leadingSuit) {
          if (currentCard.rank > highestCard.rank) {
            highestCard = currentCard;
            roundWinnerIdx = (game.currentPlayerIdx + 1 + i) % 4;
          }
        } else if (currentCard.suit === game.bid.trump) {
          // we know this is the first time we're seeing a trump -> otherwise the other clause would apply
          leadingSuit = game.bid.trump;
          highestCard = currentCard;
          roundWinnerIdx = (game.currentPlayerIdx + 1 + i) % 4;
        }
      }

      players[roundWinnerIdx].tricks++;
      game.currentPlayerIdx = game.roundStarterIdx = roundWinnerIdx;
      game.down = [];

      if (players[0].hand.length === 0) {
        // finished rounds -> end game
        end({statistics, game, players});
      }
    } else {
      game.currentPlayerIdx = (game.currentPlayerIdx + 1) % 4;
    }
  }
};

module.exports = IsraeliWhist;
