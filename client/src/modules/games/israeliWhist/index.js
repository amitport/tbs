import indexTpl from './index.html';

import gamesModule from '../base';
import Game from '../game';

gamesModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('IsraeliWhist', '<israeli-whist game="$ctrl.game" players="$ctrl.players" own="$ctrl.own"></israeli-whist>');
}]);

gamesModule.component('israeliWhist', {
  templateUrl: indexTpl,
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


import cardStackTpl from './card-stack.html';
gamesModule.component('cardStack', {
  templateUrl: cardStackTpl,
  bindings: {
    cards: '<'
  },
  controller: class CardStack {
  }
});

import './hand.css';
import handTpl from './hand.html';
gamesModule.component('hand', {
  templateUrl: handTpl,
  bindings: {
    cards: '<'
  },
  require: {
    game: '^israeliWhist'
  },
  controller: class Hand {
    isDisabled(card) {
      if (this.game.game.currentPlayerIdx !== this.game.own.idx
          || this.game.game.phase !== 'rounds'
          || !this.game.game.down) {
        return true;
      } else {
        if (this.game.game.down.length === 0) {
          return false
        }
        if (card.suit !== this.game.game.down[0].suit) {
          // disable only if we have card with matching suit
          console.log(this.cards)
          return this.cards.some((_card, idx) => {
            if (_card.suit === this.game.game.down[0].suit) {
              console.log(_card)
              console.log(idx)
              return true;
            }
          });
        }
      }
    }
  }
});

import './down.css';
import downTpl from './down.html';
gamesModule.component('down', {
  templateUrl: downTpl,
  bindings: {
    cards: '<'
  },
  require: {
    game: '^israeliWhist'
  },
  controller: class Down {
    static get $inject() {return ['$scope']}
    constructor($scope) {
      $scope.$watch('$ctrl.game.game.roundStarterIdx', (newVal) => {
        this.ownDownIdx = (newVal > this.game.own.idx)
          ?
          (4 - newVal) + this.game.own.idx
          :
          this.game.own.idx - newVal;
      });
    }
  }
});

import cardTpl from './card.html';
gamesModule.component('card', {
  templateUrl: cardTpl,
  bindings: {
    rank: '@',
    suit: '@'
  },
  controller: class Card {
    static get suit2sym() {return ['♣', '♦', '♥', '♠', 'NT']}
    static get suit2color() {return ['black', 'red', 'red', 'black', 'green']}
    static get rank2sym() {return ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']}

    $onInit() {
      this.suit = parseInt(this.suit, 10);
      this.rank = parseInt(this.rank, 10);

      this.suitSym = Card.suit2sym[this.suit];
      this.suitColor = Card.suit2color[this.suit];
      this.rankSym = Card.rank2sym[this.rank];
    }
  }
});

import contractOptionsTpl from './contract-options.html';
gamesModule.component('contractOptions', {
  templateUrl: contractOptionsTpl,
  require: {
    game: '^israeliWhist'
  },
  controller: class ContractOptions {
  }
});

gamesModule.component('suit', {
  template: '<span style="color: {{$ctrl.color}}">{{$ctrl.sym}}</span>',
  bindings: {
    value: '<'
  },
  controller: class Suit {
    static get suit2sym() {return ['♣', '♦', '♥', '♠', 'NT']}
    static get suit2color() {return ['black', 'red', 'red', 'black', 'green']}

    $onInit() {
      this.color = Suit.suit2color[this.value];
      this.sym = Suit.suit2sym[this.value];
    }
  }
});

import './bid';
import './bid-options';
import './call';
