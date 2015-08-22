import angular from 'angular';

import '../io/index';


import ticTacToe from '../../games/ticTacToe/index';
import fourInALine from '../../games/fourInALine/index';

const app = angular.module('tbs.games', ['tbs.io']);

ticTacToe(app);
fourInALine(app);

import SessionFactory from '../../games/sessionFactory';

app.constant('SessionFactory', SessionFactory);
