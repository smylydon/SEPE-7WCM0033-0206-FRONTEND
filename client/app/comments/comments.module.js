'use strict';

angular.module('jwtfrontendApp')
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
            console.log('can:',AclService.can('Comments'));
						if (AclService.can('Comments')) {
              console.log('resolved well');
							return true;
						} else {
              console.log('failed to resolve');
							return $q.reject('Unauthorized');
						}
					}
				}
			});
	});
