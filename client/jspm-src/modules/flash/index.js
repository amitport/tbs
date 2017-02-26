import angular from 'angular';

const flashModule = angular.module('amitport.flash', []);

flashModule.factory('ap.flash', ['$window', function ($window) {
    return ($window.hasOwnProperty('__flash')) ? $window.__flash : {};
}]);

export default flashModule.name;
