(function (app) {

	'use strict';

	app.module('jwtfrontendApp')
		.config(function ($stateProvider) {
			$stateProvider
				.state('comments', {
					url: '/comments/:comment_id',
					views: {
						'menuView': {
							templateUrl: 'components/navbar/navbar.tpl.html',
							controller: 'NavbarCtrl',
							controllerAs: 'navbarCtrl'
						},
						'mainView': {
							templateUrl: 'app/comments/comments.tpl.html',
							controller: 'CommentsCtrl',
							controllerAs: 'commentsCtrl'
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
							if (AclService.can('comments')) {
								return true;
							} else {
								return $q.reject('Unauthorized');
							}
						}
					}
				});
		});

})(angular);
