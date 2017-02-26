import gamesModule from '../base';
import './bid';
import './bid-options.css';

import templateUrl from './bid-options.html';
const bidOptions = [];
for (let trump = 0; trump <= 4; trump++){
  const trumpOptions = [];
  for (let tricks = 5; tricks <= 13; tricks++) {
    trumpOptions.push({trump: trump, tricks: tricks});
  }
  bidOptions.push(trumpOptions);
}

gamesModule.component('bidOptions', {
  templateUrl,
  bindings: {
    bid: '<'
  },
  require: {
    game: '^israeliWhist'
  },
  controller: class BidOptions {
    constructor() {
      this.options = bidOptions;
      this.suit2sym = ['♣', '♦', '♥', '♠', 'NT'];
      this.suit2color = ['black', 'red', 'red', 'black', 'green'];
    }

    isInvalidBidOption(tricks, trump) {
      return this.game.own.idx !== this.game.game.currentPlayerIdx ||
        (this.bid && (tricks < this.bid.tricks || (tricks === this.bid.tricks && trump <= this.bid.trump)));
    }
  }
});


