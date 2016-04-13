(function (app) {
	'use strict';

	app.module('services.upload', ['LocalStorageModule', 'restangular'])
		.service('UploadService', UploadService);

	/*@ngInject*/
	function UploadService($q, Restangular) {

		var external = {
			upload: upload,
		};

		function wrapFile(setter, file) {
      var formData = new FormData();

      formData.append('photo', file);
      formData.append(setter.idType, setter.idValue);

			return Restangular.one(setter.url)
				.withHttpConfig({
					transformRequest: angular.identity
				})
				.customPOST(formData, undefined, undefined, {
					'Content-Type': undefined
				});
		}

		function upload(setter) {
			var uploadPromise = $q.defer();
			var uploads = _.reduce(setter.files, function (collection, file) {
				collection.push(wrapFile(setter, file));
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
