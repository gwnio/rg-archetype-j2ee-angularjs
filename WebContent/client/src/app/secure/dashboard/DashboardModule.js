define([
	'src/app/secure/dashboard/DashboardController'
], function(
	DashboardController) {
	var module = angular.module('app.secure.dashboard', ['ui.bootstrap']);
	
	module.controller('DashboardController', DashboardController);
	
	module.config(['$stateProvider', function($stateProvider) {
		$stateProvider
		.state('app.dashboard', {
			url : '/dashboard',
			templateUrl : 'client/src/app/secure/dashboard/dashboard.tpl.html',
			controller : 'DashboardController',
			controllerAs : 'ctrlr'
		});
	}]);
	
	return module;
});