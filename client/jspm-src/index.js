// make sure angular material loads first
import 'angular-material/angular-material.css!';

import angular from 'angular';
import 'angular-material';
import 'angular-route';

import './modules/io/index';
import './modules/games/index';

import lobbyController from './routes/lobby/controller';
import roomController from './routes/room/controller';
import playLocalController from './routes/play-local/controller';

const app = angular.module('tbs', ['ngMaterial', 'ngRoute', 'tbs.io', 'tbs.games'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'routes/lobby/index.html',
        controllerAs: 'lobby',
        controller: lobbyController
      })
      .when('/rooms/:roomId', {
        templateUrl: 'routes/room/index.html',
        controller: roomController
      })
      .when('/play-local/:gameTypeId', {
        templateUrl: 'routes/room/index.html',
        controller: playLocalController
      });
  }])
  //.run(['$rootScope', 'io', function($rootScope, io){
  //  io.connect($rootScope);
  //}])
  .directive('draggable', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element.css('cursor', 'pointer');
        element.draggable();
      }
    }
  });

angular.element(document).ready(function () {
  angular.bootstrap(document, ['tbs'], {strictDi: true});
});
