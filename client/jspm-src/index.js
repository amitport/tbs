// make sure angular material loads first
import 'angular-material/angular-material.css!';

import angular from 'angular';
import 'angular-material';
import 'angular-route';

import 'angular-auto-focus';

import './modules/io/index';
import './modules/games/index';
import usersModule from './modules/users/index';

import lobbyController from './routes/lobby/controller';
import roomController from './routes/room/controller';
import playLocalController from './routes/play-local/controller';

const app = angular.module('tbs', ['ngMaterial', 'ngRoute', 'mp.autoFocus', 'tbs.io', 'tbs.games', usersModule])
  .config(['$routeProvider', '$locationProvider', '$mdThemingProvider',
    function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default');

    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: 'routes/lobby/index.html',
        controllerAs: '$ctrl',
        controller: lobbyController
      })
      .when('/rooms/:roomId', {
        templateUrl: 'routes/room/index.html',
        controller: roomController,
        controllerAs: 'room'
      })
      .when('/play-local/:gameTypeId', {
        templateUrl: 'routes/room/index.html',
        controller: playLocalController,
        controllerAs: 'room'
      });
  }]);

angular.element(document).ready(function () {
  angular.bootstrap(document, ['tbs'], {strictDi: true});
});
