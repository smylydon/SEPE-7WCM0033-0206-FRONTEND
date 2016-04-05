(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('PeopleCtrl', PeopleCtrl);

	function PeopleCtrl($scope, $state, PeopleService) {
		var vm = this;

		vm.people = [];
		vm.showList = false;

		function getPeople() {
			PeopleService.getPeople()
				.then(function (people) {
					vm.people = people;
					vm.showList = false;
					if (vm.people.length > 0) {
						vm.showList = true;
					}
					console.log('people:', people);
				}, function (error) {
					vm.showList = false;
					console.log(error);
				});
		}

		vm.personPicked = function ($event, personId) {
			var person = _.find(vm.people, {
				id: personId
			});
			/*
			if (person) {
			  CommentsModalService.showModal(comment);
			}*/
		};

		getPeople();
	}

})(angular);
