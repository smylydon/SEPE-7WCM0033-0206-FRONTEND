(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('JwtPaginationCtrl', JwtPaginationCtrl);

	/*@ngInject*/
	function JwtPaginationCtrl($scope, $parse) {
		var pageSize = 5;
		var totalPages = 0;
		var lastPage = 0;
		var callback = $scope.jwtCallback || angular.noop;
		var totalLength = $scope.jwtCount || 0;
		var vm = this;

		vm.currentPage = 0;

		vm.pagerClicked = function ($event, index) {
			if (_.isString(index)) {
				switch (index.toLowerCase()) {
				case 'first':
					checkDisabled(0, vm.disableBegining);
					break;
				case 'previous':
					checkDisabled(vm.currentPage - 1, vm.disablePrevious);
					break;
				case 'next':
					checkDisabled(vm.currentPage + 1, vm.disableNext);
					break;
				case 'last':
					checkDisabled(lastPage, vm.disableEnding);
					break;
				}
			} else {
				pagination(vm.currentPage = index - 1, totalLength, pageSize);
				callback(vm.currentPage);
			}
		}

		function checkDisabled(page, isDisabled) {
			if (!isDisabled) {
				pagination(page, totalLength, pageSize);
				callback(vm.currentPage);
			}
		}

		function initialize() {
			vm.pages = [];
			vm.showNextPrevious = false;
			vm.disablePrevious = false;
			vm.disableNext = false;
			vm.showBeginingEnding = false;
			vm.disableBegining = false;
			vm.disableEnding = false;
			vm.currentPage = 0;
		}

		function pagination(currentPage, length, pageSize) {
			totalPages = Math.floor(length / pageSize);
			lastPage = totalPages - 1;
			currentPage = Math.min(lastPage, currentPage);
			currentPage = Math.max(0, currentPage);
			if (totalPages > 1) {
				vm.showNextPrevious = totalPages > 5;
				vm.disablePrevious = currentPage == 0;
				vm.disableNext = currentPage == lastPage;
				vm.showBeginingEnding = currentPage > 5;
				vm.disableBegining = currentPage == 0;
				vm.disableEnding = currentPage == lastPage;
				vm.pages = [];
				console.log('currentpage, lastpage:', currentPage, lastPage, totalPages, totalLength, pageSize);
				var offset = 0;
				if (currentPage > 4) {
					offset = currentPage - 2;
					var fix = lastPage - offset;
					if (fix < 4) {
						offset = lastPage - 4;
						vm.disableNext = true;
						vm.disableEnding = true;
					}
				} else {
					vm.disablePrevious = true;
					vm.disableBegining = true;
				}
				offset += 1;
				for (var i = 0; i < 5; i++) {
					vm.pages[i] = i + offset;
				}
				vm.currentPage = currentPage;
			} else {
				initialize();
			}
		}
		initialize();
		console.log('go again');
		pagination(vm.currentPage, totalLength, pageSize);
	}

})(angular);
