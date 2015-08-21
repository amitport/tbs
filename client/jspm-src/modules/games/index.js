import angular from 'angular';

import '../io/index';


import ticTacToe from './ticTacToe/index';
import fourInALine from './fourInALine/index';

const app = angular.module('tbs.games', ['tbs.io']);

ticTacToe(app);
fourInALine(app);

import SessionFactory from './lib/sessionFactory';

app.constant('SessionFactory', SessionFactory);
