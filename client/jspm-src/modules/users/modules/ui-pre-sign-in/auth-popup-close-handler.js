import module from './base';

module.run(['$window', 'ap.eventualUser',
    function ($window, eventualUser) {
        // listen to response from auth provider pop-up
        $window.addEventListener('message', (event) => {
            if ((event.origin || event.originalEvent.origin) !== $window.location.origin) return;

            eventualUser.set(event.data.tokens);
        });
    }]);
