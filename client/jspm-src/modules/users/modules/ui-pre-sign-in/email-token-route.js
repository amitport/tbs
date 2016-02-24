import module from './base';

module.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/et/:et', {
        template: '',
        controller: ['$rootScope', '$location', '$timeout', 'ap.flash', 'ap.eventualUser',
                    function ($rootScope, $location, $timeout, flash, eventualUser) {
            $location.url(flash.originalPath).replace();
            eventualUser.set(flash.tokens);
        }]
    });
}]);
