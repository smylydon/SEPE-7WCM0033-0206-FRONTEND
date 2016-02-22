'use strict';

angular.module('jwtfrontendApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('about', {
      	url: '/about',
      	views: {
      		'menuView':{
		        templateUrl: 'components/navbar/navbar.tpl.html',
		        controller: 'NavbarCtrl',
            controllerAs: 'navbarCtrl'
      		},
	      	'mainView': {
		        templateUrl: 'app/about/about.tpl.html',
		        controller: 'AboutCtrl',
            controllerAs: 'aboutCtrl'
	    	  },
          'footerView':{
            templateUrl: 'components/footer/footer.tpl.html',
            controller: 'FooterCtrl',
            controllerAs: 'footerCtrl'
          },
    	 }
      });
  });
