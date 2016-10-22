angular
	.module('app')
	.factory('TransferService', [
		'$resource',
		'$rootScope',
		'Upload',
		function($resource, $rootScope, Upload) {

			var self = function() {};

			var restUrl = $rootScope.$restUrl;

			var API = $resource('', {}, {
				transferText: {
					method: 'POST',
					url: restUrl + '/transfer/text'
				}
			});

			self.transferText = function(text, deviceId) {
				
				return new Promise(function(resolve, reject) {
					API.transferText({
						text: text,
						deviceId: deviceId
					}, resolve, reject);
				});		
			};



			self.transferFile = function(file, deviceId) {
				return new Promise(function(resolve, reject) {
	        Upload.upload({
            url: restUrl + '/transfer/file',
            file: file,
            data: {
            	file: file,
            	deviceId: deviceId
            },
            method: 'POST'
	        }).then(function (resp) {
	            resolve(resp);
	        }, null, function (evt) {
	            var progressPercentage = parseInt(100.0 *
	            		evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + 
	            	'% ' + evt.config.data.file.name + '\n');
	        });
				});
			};

			return self;
		}]);