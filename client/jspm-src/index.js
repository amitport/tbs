import 'jquery-ui/themes/base/base.css!'
import 'jquery-ui';

import angular from 'angular';
import 'angular-material';
import 'angular-route';

import './modules/io/index';
import lobbyController from './routes/lobby/controller';
import roomController from './routes/room/controller';

const app = angular.module('tbs', ['ngMaterial', 'ngRoute', 'tbs.io'])
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
      });
  }])
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
