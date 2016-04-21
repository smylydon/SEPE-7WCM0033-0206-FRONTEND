(function (app) {
	'use strict';

	app.module('jwtfrontendApp')
		.controller('PeopleCtrl', PeopleCtrl);

	function PeopleCtrl($scope, $state, PeopleModalService, PeopleService) {
		var vm = this;

		vm.people = [];
		vm.showList = false;
		vm.maxSize = 10;
		vm.currentPage = 1;
		vm.totalPeople = 0;

		function getPeople() {
			PeopleService.getPeople()
				.then(function (people) {
					vm.people = people;
					vm.showList = false;
					if (people && people.rows.length > 0) {
						vm.people = people.rows;
						vm.totalPeople = people.count;
						vm.showList = true;
					}
				}, function (error) {
					vm.showList = false;
				});
		}

		vm.personPicked = function ($event, personId) {
			var person = _.find(vm.people, {
				id: personId
			});

			if (person) {
			  PeopleModalService.showModal(person);
			}
		};

		getPeople();
	}

})(angular);
