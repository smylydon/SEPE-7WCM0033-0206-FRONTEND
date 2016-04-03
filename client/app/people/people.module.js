'use strict';

angular.module('jwtfrontendApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('people', {
				url: '/people/:person_id',
				views: {
					'menuView': {
						templateUrl: 'components/navbar/navbar.tpl.html',
						controller: 'NavbarCtrl',
						controllerAs: 'navbarCtrl'
					},
					'mainView': {
						templateUrl: 'app/people/people.tpl.html',
						controller: 'PeopleCtrl',
						controllerAs: 'peopleCtrl'
					},
					'footerView': {
						templateUrl: 'components/footer/footer.tpl.html',
						controller: 'FooterCtrl',
						controllerAs: 'footerCtrl'
					}
				},
				resolve: {
					/*@ngInject*/
					'acl': function ($q, AclService) {
						if (AclService.can('people','get')) {
							return true;
						} else {
							return $q.reject('Unauthorized');
						}
					}
				}
			});
	});
