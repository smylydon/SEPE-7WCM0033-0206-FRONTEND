(function (app) {

	'use strict';

	app.module('services.peopleModal', ['services.authorization'])
		.service('PeopleModalService', PeopleModalService);

	/*@ngInject*/
	function PeopleModalService($rootScope, $uibModal, $q, AclService) {
		var isBusy = false;
		var personPromise = false;

		var external = {
			showModal: showModal
		};

		function showModal(person) {
			var modalPromise = $q.defer();
			var modalScope = $rootScope.$new();
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'components/peopleModal/peopleModal.tpl.html',
				size: 'md',
				controllerAs: 'peopleModalCtrl',
				scope: modalScope,
				controller: function () {
					var vm = this;
					vm.can = AclService.can;
					vm.person = person.clone ? person.clone() : _.cloneDeep(person);
					vm.label = 'Update';

					function resolve(value) {
						modalPromise.resolve(value);
					}

					vm.cancel = function () {
						modalInstance.dismiss('cancel');
						resolve({
							save: false,
							newPerson: null
						});
					};

					vm.save = function () {
						modalInstance.dismiss('save');
						resolve({
							save: true,
							newPerson: vm.person
						});
					};
				}
			});

			return modalPromise.promise;
		}

		return external;
	}

})(angular);
