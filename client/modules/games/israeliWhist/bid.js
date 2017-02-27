import base from '../base';
import templateUrl from './bid.html';

base.component('bid', {
  templateUrl,
  bindings: {
    value: '<'
  },
  controller: class Bid {
    constructor() {
      this.suit2sym = ['♣', '♦', '♥', '♠', 'NT']
      this.suit2color = ['black', 'red', 'red', 'black', 'green']
    }
  }
});
