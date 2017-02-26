import usersUiModule from './base';
import templateUrl from './users-list.html';

usersUiModule.component('usersList',
    {
        bindings: {user: '='},
        templateUrl,
        controller: ['$http', function($http) {
            $http.get('/api/users', {requireAuth: true}).then(({data}) => {
                this.users = data;
            });
        }]
    });
