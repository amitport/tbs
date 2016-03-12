import module from '../base';
import './bid';
import './bid-options.css!';

import template from './bid-options.html!text';
const bidOptions = [];
for (let trump = 0; trump <= 4; trump++){
  const trumpOptions = [];
  for (let tricks = 5; tricks <= 13; tricks++) {
    trumpOptions.push({trump: trump, tricks: tricks});
  }
  bidOptions.push(trumpOptions);
}

module.component('bidOptions', {
  template: template,
  bindings: {
    bid: '<'
  },
  require: {
    game: '^israeliWhist'
  },
  controller: class BidOptions {
    options = bidOptions;
    suit2sym = ['♣', '♦', '♥', '♠', 'NT'];
    suit2color = ['black', 'red', 'red', 'black', 'green'];

    isInvalidBidOption(tricks, trump) {
      return this.game.own.idx !== this.game.game.currentPlayerIdx ||
        (this.bid && (tricks < this.bid.tricks || (tricks === this.bid.tricks && trump <= this.bid.trump)));
    }
  }
});


