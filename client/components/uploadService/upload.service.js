(function (app) {
	'use strict';
	app.module('services.upload', ['LocalStorageModule', 'restangular'])
		.service('UploadService', UploadService);

	/*@ngInject*/
	function UploadService($q, Restangular) {

		var external = {
			upload: upload,
		};

		function wrapFile(url, file) {
      var formData = new FormData();
      //formData.setAttribute('enctype', 'multipart/form-data');
      formData.append('photo', file);
      formData.append('car_id', 1);

			return Restangular.one(url)
				.withHttpConfig({
					transformRequest: angular.identity
				})
				.customPOST(formData, undefined, undefined, {
					'Content-Type': undefined
				});
		}

		function upload(url, files) {
			var uploadPromise = $q.defer();
			var uploads = _.reduce(files, function (collection, file) {
				console.log('file :', file);
				collection.push(wrapFile(url, file));
				return collection;
			}, []);

			if (_.isArray(uploads) && uploads.length > 0) {
				uploadPromise = $q.all(uploads);
			} else {
				uploadPromise.reject('no files uploaded');
				uploadPromise = uploadPromise.promise;
			}
			return uploadPromise;
		}


		return external;
	}
})(angular);
