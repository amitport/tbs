import module from './base';
import template from './user-profile-route.html!text';

module.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/users/me', {
        template,
        controllerAs: '$ctrl',
        controller: ['ap.eventualUser', '$scope', '$location',
            function (eventualUser, $scope, $location) {
            eventualUser.get()
                .then((user) => {this.user = user;})
                .catch(() => {$location.url('/');});

            $scope.$on('auth.sign-out', () => {$location.url('/');});
        }]
    });
}]);