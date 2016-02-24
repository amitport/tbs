import module from './base';

module.provider('ap.tokens',
    ['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['ap.tokens', function (tokens) {
            return {
                request: function (config) {
                    if (!config.requireAuth) {
                        return config;
                    }

                    return tokens.refresh().then(() => {
                        config.headers['x-access-token'] = tokens.access;
                        return config;
                    });
                }
            };
        }]);

        return {
            $get: ['$injector', '$window', '$log', '$q',
                function ($injector, $window, $log, $q) {
                    let ongoingAuthentication;
                    let authenticateCanceler;
                    let tokens;
                    let accessExpiry;
                    function calcAccessExpiry() {
                        // * decoding assumes no base64 padding which assumes it is generated from byte number that is divisible by 3
                        const decodedAccessToken = JSON.parse($window.atob(tokens.access.split('.', 2)[1].replace(/-/g, '+').replace(/_/g, '/')));
                        accessExpiry = (decodedAccessToken.hasOwnProperty('exp')) ?
                            decodedAccessToken.exp : false;
                    }

                    // delay $http load in order to resolve circular dependency ($http uses tokens.refresh in our interceptor)
                    let _$http; function get$http() {return _$http || (_$http = $injector.get('$http'));}

                    return {
                        get access() {
                            if (tokens != null)
                                return tokens.access;
                        },
                        set(_tokens) {
                            if (!tokens) {
                                // we are not currently authenticated
                                tokens = _tokens;
                            } else {
                                // this is just an access refresh
                                tokens.access = _tokens.access;
                            }

                            calcAccessExpiry();
                        },
                        authenticate(credentials = {refresh: tokens.refresh}) {
                            return ongoingAuthentication = get$http().post('/auth/request', credentials,
                                {
                                    timeout: $q((resolve) => {
                                        authenticateCanceler = resolve;
                                    })
                                }
                            ).then(({data}) => {
                                $log.info('authentication succeeded');
                                this.set(data);
                            }).catch((rejection) => {
                                $log.warn('authentication failed');
                                return $q.reject(rejection);
                            }).finally(() => {
                                ongoingAuthentication = false;
                                authenticateCanceler = false;
                            });
                        },
                        clear() {
                            if (authenticateCanceler) authenticateCanceler();
                            if (tokens) {
                                if (tokens.hasOwnProperty('refresh')) {
                                    get$http().post('/auth/revoke', {refresh: tokens.refresh});
                                }
                                tokens = false;
                            }
                        },
                        refresh() {
                            if (ongoingAuthentication) {
                                return ongoingAuthentication;
                            } else if (!tokens) {
                                // we don't have tokens - fail
                                return $q.reject({status: 401});
                            } else if (!accessExpiry || accessExpiry > (Math.floor(Date.now() / 1000) + 1200)) {
                                // access token does not have an expiry or we still have more than 20 minutes before expiry
                                // -> this is fresh enough
                                return $q.resolve();
                            } else {
                                return this.authenticate();
                            }
                        }
                    };
                }]
        }
    }]);
