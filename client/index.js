import './index.css'

import angular from 'angular';
import 'angular-material';
import 'angular-route';

import 'angular-auto-focus';

import {registerHelperModule} from 'useful-http/angular-helper-module/io';
registerHelperModule(angular);

import gamesModule from './modules/games';
import usersModule from './modules/users';

import lobbyController from './routes/lobby/controller';
//import roomController from './routes/room/controller';
//import playLocalController from './routes/play-local/controller';

import lobbyTemplateUrl from './routes/lobby/index.html'

const app = angular.module('tbs', ['ngMaterial', 'ngRoute', 'mp.autoFocus', 'tbs.io', gamesModule, usersModule])
  .config(['$routeProvider', '$locationProvider', '$mdThemingProvider',
    function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default');

    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
      .when('/', {
        templateUrl: lobbyTemplateUrl,
        controllerAs: '$ctrl',
        controller: lobbyController
      })
      .when('/rooms/:roomId', {
        template: '<room flex layout></room>'
      });
      //.when('/play-local/:gameTypeName', {
      //  templateUrl: 'routes/room/index.html',
      //  controller: playLocalController,
      //  controllerAs: '$ctrl'
      //});
  }]);

angular.element(document).ready(function () {
  angular.bootstrap(document, [app.name], {strictDi: true});
});
