define([
	'src/app/secure/MainController',
	'src/app/secure/dashboard/DashboardModule'
], function(
	MainController,
	DashboardModule) {
	var module = angular.module('app.secure', ['app.secure.dashboard']);
	
	module.controller('SecureMainController', MainController);
	
	var authorizeResolve = {
		authorize : ['AuthService', function(AuthService) {
			return AuthService.authorize(['USER']);
		}]
	};
	
	module.config(['$stateProvider', function($stateProvider) {
		$stateProvider
		.state('app', {
			abstract : true,
			templateUrl : 'client/src/app/secure/app-secure.tpl.html',
			controller : 'SecureMainController',
			controllerAs : 'ctrlr',
			resolve : {
				authorize : authorizeResolve.authorize
			}
		});
	}]);
	
	return module;
});