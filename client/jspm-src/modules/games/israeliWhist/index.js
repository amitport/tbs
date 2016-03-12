import indexTpl from './index.html!text';

import module from '../base';
import Game from '../game';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('IsraeliWhist', '<israeli-whist game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></israeli-whist>');
}]);

module.component('israeliWhist', {
  template: indexTpl,
  bindings: {
    game: '<',
    players: '<',
    own: '<'
  },
  require: {
    room: '^room'
  },
  controller: class IsraeliWhist extends Game {
    test() {
      console.error('test');
    }
  }
});


import cardStackTpl from './card-stack.html!text';
module.component('cardStack', {
  template: cardStackTpl,
  bindings: {
    cards: '<'
  },
  controller: class CardStack {
  }
});

import './hand.css!';
import handTpl from './hand.html!text';
module.component('hand', {
  template: handTpl,
  bindings: {
    cards: '<'
  },
  require: {
    game: '^israeliWhist'
  },
  controller: class Hand {
  }
});

import cardTpl from './card.html!text';
module.component('card', {
  template: cardTpl,
  bindings: {
    rank: '@',
    suit: '@'
  },
  controller: class Card {
    static suit2sym = ['♣', '♦', '♥', '♠', 'NT'];
    static suit2color = ['black', 'red', 'red', 'black', 'green'];
    static rank2sym = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

    $onInit() {
      this.suit = parseInt(this.suit, 10);
      this.rank = parseInt(this.rank, 10);

      this.suitSym = Card.suit2sym[this.suit];
      this.suitColor = Card.suit2color[this.suit];
      this.rankSym = Card.rank2sym[this.rank];
    }
  }
});

import contractOptionsTpl from './contract-options.html!text';
module.component('contractOptions', {
  template: contractOptionsTpl,
  require: {
    game: '^israeliWhist'
  },
  controller: class ContractOptions {
  }
});

module.component('suit', {
  template: '<span style="color: {{$ctrl.color}}">{{$ctrl.sym}}</span>',
  bindings: {
    value: '<'
  },
  controller: class Suit {
    static suit2sym = ['♣', '♦', '♥', '♠', 'NT'];
    static suit2color = ['black', 'red', 'red', 'black', 'green'];

    $onInit() {
      this.color = Suit.suit2color[this.value];
      this.sym = Suit.suit2sym[this.value];
    }
  }
});

import './bid';
import './bid-options';
import './call';
