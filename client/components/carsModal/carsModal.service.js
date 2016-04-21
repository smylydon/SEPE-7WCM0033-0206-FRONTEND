(function (app) {

	'use strict';

	app.module('services.carsModal', ['jwt.uploader', 'services.upload', 'services.authorization'])
		.service('CarsModalService', CarsModalService);

	/*@ngInject*/
	function CarsModalService($rootScope, $uibModal, $q, AclService, UploadService) {
		var isBusy = false;
		var carsPromise = false;

		var external = {
			showModal: showModal
		};

		function showModal(car) {
			var modalPromise = $q.defer();
			var modalScope = $rootScope.$new();
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'components/carsModal/carsModal.tpl.html',
				size: 'md',
				controllerAs: 'carsModalCtrl',
				scope: modalScope,
				controller: function () {
					var vm = this;
					vm.can = AclService.can;
					vm.car = car.clone ? car.clone() : _.cloneDeep(car);
					vm.label = 'Update';

					vm.tinymceOptions = {
						onChange: function ($event) {
							// put logic here for keypress and cut/paste changes
						},
						inline: false,
						plugins: 'advlist autolink lists charmap print preview',
						skin: 'lightgray',
						theme: 'modern',
						menu: [],
						resize: false,
						height: 154,
					};

					vm.uploadFiles = function (files) {
						var setter = {
							url: 'cars/uploadpix',
							files: files,
							idType: 'car_id',
							idValue: vm.car.id
						};
						UploadService.upload(setter)
							.then(function (success) {
								console.log('upload done:', success.success);
							})
							.catch(function (error) {
								console.log('failed to upload:', error);
							});
					};

					function resolve(value) {
						modalPromise.resolve(value);
					}

					vm.cancel = function () {
						modalInstance.dismiss('cancel');
						resolve({
							save: false,
							newCar: null
						});
					};

					vm.save = function () {
						modalInstance.dismiss('save');
						resolve({
							save: true,
							newCar: vm.car
						});
					};
				}
			});

			return modalPromise.promise;
		}

		return external;
	}

})(angular);
