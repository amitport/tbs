import angular from 'angular';

const gamesModule = angular.module('tbs.games', []);

gamesModule.constant('playerColors', [
  'rgb(102,127,203)', //'rgb(100, 100, 193)',
  'rgb(234, 123, 123)',
  'rgb(235,224,74)',
  'rgb(0,213,69)'
]);

export default gamesModule;
