(function (app) {
	'use strict';

  app.module('jwtfrontendApp')
  	.directive('jwtPagination', Pagination);
    /*@ngInject*/
    function Pagination() {
      return {
        templateUrl: 'app/jwtPagination/jwtPagination.tpl.html',
        restrict: 'E',
        replace: true,
				scope:{
					jwtCount: '@',
					jwtCallback: '='
				},
				binToController: true,
        controller: 'JwtPaginationCtrl as ctrl',
        link: function (scope, element, attrs) {}
      };
    }
})(angular);
