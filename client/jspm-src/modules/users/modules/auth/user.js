import module from './base';

const USER_FIELDS = ['username', 'role'];

module.provider('ap.user',
    ['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['$q', 'ap.user', function ($q, user) {
            return {
                request: function (config) {
                    if (user.override) {
                        config.headers['x-access-override'] = JSON.stringify(user.override);
                    }
                    return config;
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        // user is does not really have the correct credentials
                        // make sure the authentication is clear
                        user.signOut();
                    }
                    return $q.reject(rejection);
                }
            };
        }]);

        return {
            $get: ['$injector', '$log', '$q', '$rootScope', '$window', '$location', 'ap.tokens',
                function ($injector, $log, $q, $rootScope, $window, $location, tokens) {
                    // delay $http load in order to resolve circular dependency ($http uses user.signOut in our interceptor)
                    let _$http; function get$http() {return _$http || (_$http = $injector.get('$http'));}

                    let override = false;
                    const user = {
                        isSignedIn: false,
                        register(registrationToken, registration) {
                            return get$http()
                                .post('/api/users',
                                    registration,
                                    {headers: {'x-auth-token': registrationToken}})
                                .then(({data}) => {
                                    return this.signIn(data);
                                });
                        },
                        signIn(_tokens, skipAuthTokensStorage = false) {
                            if (_tokens != null) {
                                tokens.set(_tokens);
                            }

                            return this.signInPromise = get$http().get('/api/users/me', {requireAuth: true}).then(({data}) => {
                                this.isSignedIn = true;

                                USER_FIELDS.forEach((userField) => {
                                    this[userField] = data[userField];
                                });

                                if (!skipAuthTokensStorage) {
                                    $window.localStorage['authTokens'] = JSON.stringify(_tokens);
                                }

                                $rootScope.$broadcast('auth.sign-in', this.username);
                                $log.info('signed in as ' + this.username);

                                return this;
                            }).catch((rejection) => {
                                if (rejection.status === 404) {
                                    $log.info('could not find this user - signing out');
                                    this.signOut();
                                }

                                return $q.reject(rejection);
                            });
                        },
                        signOut(clearTokens = true) {
                            let previousLoc;
                            if (override) {
                                previousLoc = $location.url();
                                clearTokens = false;
                            }
                            const wasSignedIn = this.isSignedIn;

                            if (clearTokens) {
                                tokens.clear();
                                delete $window.localStorage.authTokens;
                            }

                            this.signInPromise = $q.reject();
                            this.isSignedIn = false;

                            USER_FIELDS.forEach((userField) => {
                                delete this[userField];
                            });

                            if (wasSignedIn) {
                                $rootScope.$broadcast('auth.sign-out');
                            }
                            $log.info('signed out');

                            if (override) {
                                override = false;
                                delete $window.sessionStorage.accessOverride;
                                this.signIn(undefined, true).then(() => {$location.url(previousLoc);});
                            }
                        },
                        attemptImmediateSignIn() {
                            // currently this only checks for valid authTokens are on localStorage
                            if ($window.localStorage.hasOwnProperty('authTokens')) {
                              if ($window.sessionStorage.hasOwnProperty('accessOverride')) {
                                tokens.set(JSON.parse($window.localStorage.authTokens));
                                this.override = JSON.parse($window.sessionStorage.accessOverride);
                              } else {
                                this.signIn(JSON.parse($window.localStorage.authTokens), true)
                              }
                            }
                        },
                        signInWithEmail(email) {
                            return get$http().post('/api/auth/signInWithEmail', {email, originalPath: $location.path()});
                        },
                        signInWithAuthProvider() {
                            const width = 452;
                            const height = 633;
                            $window.open(
`https://accounts.google.com/o/oauth2/v2/auth?\
client_id=162817514604-3flbnsg9cali5j0mrnqjmgi2h6keo7uk.apps.googleusercontent.com&\
response_type=code&\
scope=openid&\
redirect_uri=${$window.location.origin}/api/auth/google`,

'google_oauth2_login_popup',

`width=${width},\
height=${height},\
left=${($window.screenX + (($window.outerWidth - width) / 2))},\
top=${($window.screenY + (($window.outerHeight - height) / 2.5))}`);
                        }
                    };

                    Reflect.defineProperty(user, 'signInPromise', {
                        value: $q.reject(),
                        writable: true
                    });

                    Reflect.defineProperty(user, 'override', {
                        get: function () {return override;},
                        set: function(_override) {
                            const previousLoc = $location.url();
                            this.signOut(false);
                            $window.sessionStorage['accessOverride'] = JSON.stringify(_override);
                            override = _override;
                            this.signIn(undefined, true).then(() => {
                                // restore the location in case we got redirected after sign out
                                $location.url(previousLoc);
                            });
                        }
                    });

                    return user;
                }]
        }
    }]);

module.run(['ap.user', function (user) {
    // try and sign in immediately
    user.attemptImmediateSignIn();
}]);
