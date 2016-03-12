import module from '../base';
import template from './bid.html!text';

module.component('bid', {
  template: template,
  bindings: {
    value: '<'
  },
  controller: class Bid {
    suit2sym = ['♣', '♦', '♥', '♠', 'NT'];
    suit2color = ['black', 'red', 'red', 'black', 'green'];
  }
});
