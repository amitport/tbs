import module from './base';
import template from './users-list.html!text';


module.component('usersList',
    {
        bindings: {user: '='},
        template,
        controller: ['$http', function($http) {
            $http.get('/api/users', {requireAuth: true}).then(({data}) => {
                this.users = data;
            });
        }]
    });