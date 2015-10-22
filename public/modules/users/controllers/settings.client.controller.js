'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function() {
			$scope.success = $scope.error = null;
			var user = new Users($scope.user);

			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
			}, function(response) {
				$scope.error = response.data.message;
			});
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};


		/**
		 * Create instance method for returning provider formated data
		 */
		$scope.formatProviderData = function(provider) {

			var formatedProvider = {};
			if (provider === 'facebook') {
				formatedProvider['Nombre'] = $scope.user.additionalProvidersData[provider].first_name;
				formatedProvider.Apellido = $scope.user.additionalProvidersData[provider].last_name;
				formatedProvider.Sexo = ($scope.user.additionalProvidersData[provider].gender==='male'?'Hombre':'Mujer');
				formatedProvider.Email = $scope.user.additionalProvidersData[provider].email;
				formatedProvider.FechaAutenticacion = '01/11/2015';
				formatedProvider.TipoIdentidad = 'Red Social';
				formatedProvider.ProveedorIdentidad = 'Facebook';
				formatedProvider.FacebookId = $scope.user.additionalProvidersData[provider].id;
			}
			$scope.formatedProvider1 = formatedProvider;
			return Object.keys(formatedProvider);
		};

	}
]);