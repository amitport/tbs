import template from './board.html!text';
import './index.css!';

import module from '../base';

module.run(['$templateCache', function ($templateCache) {
  $templateCache.put('FourInALine', template);
}]);

