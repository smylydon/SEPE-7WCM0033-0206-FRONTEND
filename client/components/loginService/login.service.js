(function (app) {
	'use strict';
	app.module('services.login', ['ng-acl','LocalStorageModule', 'restangular'])
		.service('LoginService', LoginService);

	/*@ngInject*/
	function LoginService($q, AclService, localStorageService, Restangular) {
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
			Restangular.one('login')
				.customPOST(credentials)
				.then(function (success) {
					logout();
					var authorization = ['salesperson'];
					var user = {
						roles: authorization,
						getRoles: function () {
							return this.roles;
						}
					};
					localStorageService.set('authorization', authorization);
					localStorageService.set('token', success.token);
					AclService.clearUserIdentity();
					AclService.setUserIdentity(user);
					setBearerToken();
					loginPromise.resolve('login successful');
				})
				.catch(function (error) {
					logout();
					loginPromise.reject('login failed');
				});
			return loginPromise.promise;
		}

		function logout() {
			localStorageService.set('authorization', null);
			AclService.clearUserIdentity();
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
