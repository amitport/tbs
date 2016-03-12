import './bid';

import module from '../base';
import template from './call.html!text';

module.component('call', {
  template: template,
  bindings: {
    value: '<'
  },
  controller: class Call {
  }
});
