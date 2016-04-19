(function (app) {
	'use strict';
	app.module('services.authorization', ['ng-acl', 'LocalStorageModule'])
		.service('AuthorizationService', AuthorizationService);

	/*@ngInject*/
	function AuthorizationService(AclService, localStorageService) {
		var external = {
			authorize: authorize
		};

		function authorize() {
			AclService.addRole('guest');
			AclService.addRole('salesperson', 'guest');
			AclService.addRole('manager', 'salesperson');
			AclService.addRole('administrator', 'manager');

			AclService.addResource('car');
			AclService.addResource('cars');
			AclService.addResource('comments');
			AclService.addResource('makes');
			AclService.addResource('people');

			AclService.allow('guest', 'car', 'get');
			AclService.allow('guest', 'cars', 'get');
			AclService.allow('guest', 'makes', 'get');
			AclService.allow('guest', 'comments', 'post');

			AclService.allow('salesperson', 'car', 'sell');
			AclService.allow('salesperson', 'people', 'post');
			AclService.allow('salesperson', 'people', 'put');
			AclService.allow('salesperson', 'people', 'get');

			AclService.allow('salesperson', 'comments');
			AclService.allow('salesperson', 'car', 'post');
			AclService.allow('salesperson', 'car', 'put');

			AclService.allow('manager', 'car', 'delete');

			AclService.allow('administrator', 'car', 'uploadpix');
			AclService.allow('administrator', 'people', 'delete');

			var authorization = localStorageService.get('authorization');
			var userIdentity = {
				roles: ['guest'],
				getRoles: function () {
					return this.roles;
				}
			};
			if (!authorization) {
				authorization = ['guest'];
				localStorageService.set('user', authorization);
			}
			userIdentity.roles = authorization;
			AclService.setUserIdentity(userIdentity);
		}

    return external;
	}
})(angular);
