define([
	'src/app/public/signup/SignupUniqueEmailCheckDirective',
	'src/app/public/signup/SignupModel',
	'src/app/public/qsignup/SignupController'
], function(
	SignupUniqueEmailCheckDirective,
	SignupModel,
	SignupController
) {
	var module = angular.module('app.signup', []);
	
	module.directive('signupUniqueEmailCheck', SignupUniqueEmailCheckDirective);
	
	module.factory('SignupModel', SignupModel);
	
	module.controller('SignupController', SignupController);
	
	module.config(['$stateProvider', function($stateProvider) {
		$stateProvider
		.state('app.signup', {
			url : '/signup',
			templateUrl : 'client/src/app/public/qsignup/signup.tpl.html',
			controller : 'SignupController',
			controllerAs : 'ctrlr'
		})
	}]);
	
	return module;
});