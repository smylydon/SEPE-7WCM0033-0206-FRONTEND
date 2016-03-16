(function (app) {
	'use strict';
	app.module('services.login', ['LocalStorageModule', 'restangular'])
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

		function setUserAuthorization(authorization, token) {
			var user = {
				roles: authorization,
				getRoles: function () {
					return this.roles;
				}
			};
			localStorageService.set('authorization', authorization);
			localStorageService.set('token', token);
			AclService.setUserIdentity(user);
			setBearerToken(token);
		}

		function login(credentials) {
			if (isFetchingLogin) {
				return loginPromise.promise;
			}
			loginPromise = $q.defer();
			Restangular.one('login')
				.customPOST(credentials)
				.then(function (success) {
					setUserAuthorization(['salesperson'], success.token);
					loginPromise.resolve('login successful');
				})
				.catch(function (error) {
					logout();
					loginPromise.reject('login failed');
				});
			return loginPromise.promise;
		}

		function logout() {
			setUserAuthorization(['guest'], null);
		}

		function setBearerToken(token) {
			token = token || localStorageService.get('token');
			Restangular.setDefaultHeaders({
				Authorization: 'Bearer ' + token
			});
		}

		return external;
	}
})(angular);
