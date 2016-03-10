(function(app) {
    'use strict';
    app.module('services.login',['LocalStorageModule', 'restangular'])
      .service('LoginService', LoginService);

    /*@ngInject*/
    function LoginService($q, localStorageService, Restangular) {
        var isFetchingLogin = false;
        var loginPromise = false;

        var external = {
            isLoggedIn: isLoggedIn,
            login: login,
            logout: logout
        };

        function isLoggedIn() {
            return !!localStorageService.get('token');
        }

        function login(credentials) {
            if (isFetchingLogin) {
                return loginPromise.promise;
            }
            loginPromise = $q.defer();
            Restangular.one('login').customPOST(credentials).then(function(success) {
                localStorageService.set('token', success.token);
                setBearerToken();
                loginPromise.resolve('login successful');
            }, function(error) {
                logout();
                loginPromise.reject('login failed');
            });
            return loginPromise.promise;
        }

        function logout() {
            localStorageService.set('token', null);
            setBearerToken();
        }

        function setBearerToken() {
            Restangular.setDefaultHeaders({
                Authorization: 'Bearer ' + localStorageService.get('token')
            });
        }
        
        return external;
    }
})(angular);
