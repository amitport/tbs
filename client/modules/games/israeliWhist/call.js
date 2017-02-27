import './bid';

import gamesModule from '../base';
import templateUrl from './call.html';

gamesModule.component('call', {
  templateUrl,
  bindings: {
    value: '<'
  },
  controller: class Call {
  }
});
