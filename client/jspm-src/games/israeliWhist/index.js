import Game from '../game';


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

export default class IsraeliWhist extends Game {
  static color = '#e09292';
  static actions = {
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
        game.phase = 'rounds';
        game.down = [];
      }
    },
    putDown({players, game, action}) {

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
        game.currentPlayerIdx = roundWinnerIdx;
        game.down = [];
      } else {
        game.currentPlayerIdx = (game.currentPlayerIdx + 1) % 4;
      }
    }
  };
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

    shuffle(game.deck);

    players[0].hand = game.deck.slice(0, 13).sort(suitThenRankComparator);
    players[1].hand = game.deck.slice(13, 26).sort(suitThenRankComparator);
    players[2].hand = game.deck.slice(26, 39).sort(suitThenRankComparator);
    players[3].hand = game.deck.slice(39, 52).sort(suitThenRankComparator);
    players.forEach((player) => {player.tricks = 0;});
    game.deck = [];

    game.phase = 'bidding';
  }


}
