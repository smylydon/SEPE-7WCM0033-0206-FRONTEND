(function(app) {
  'use strict';
  app.module('jwtfrontendApp')
    .service('LoginService', LoginService);

  /*@ngInject*/
  function LoginService($q, localStorageService, Restangular) {
    var loggedIn = false;
    var isFetchingLogin = false;
    var loginPromise = false;

    var external = {
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout
    };

    function isLoggedIn() {
      return loggedIn;
    }

    function login(credentials) {
      if (isFetchingLogin) {
        return loginPromise.promise;
      }
      loginPromise = $q.defer();
      Restangular.one('login').customPOST(credentials).then(function(success) {
        loggedIn = true;
        localStorageService.set('token', success.token);
        loginPromise.resolve('login successful');
      }, function(error) {
        logout();
        loginPromise.reject('login failed');
      });
      return loginPromise.promise;;
    }

    function logout() {
      loggedIn = false;
      localStorageService.set('token', null);
    }

    return external;
  }
})(angular);
