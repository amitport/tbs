import angular from 'angular';

import '../io/index';

import GameClientRepo from '../../games/gameClientRepo';

const app = angular.module('tbs.games', ['tbs.io']);

app.constant('gameClientRepo', new GameClientRepo(app));
