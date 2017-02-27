import usersUiModule from './base';
import templateUrl from './user-profile-route.html';

usersUiModule.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/users/me', {
        templateUrl,
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
