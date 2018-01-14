define([
	'src/common/ValuesEqualRequiredDirective',
	'src/app/widget/PasswordValidCheckDirective',
	'src/app/public/MainController',
	'src/app/public/login/LoginController',
	'src/app/public/signup/SignupUniqueEmailCheckDirective',
	'src/app/public/signup/SignupModel',
	'src/app/public/qsignup/SignupController'
], function(
	ValuesEqualRequiredDirective,
	PasswordValidCheckDirective,
	MainController,
	LoginController,
	SignupUniqueEmailCheckDirective,
	SignupModel,
	SignupController) {
	var module = angular.module('app.login', ['ngMessages']);
	
	module.directive('valuesEqualRequired', ValuesEqualRequiredDirective);
	module.directive('passwordValidCheck', PasswordValidCheckDirective);
	module.directive('signupUniqueEmailCheck', SignupUniqueEmailCheckDirective);
	
	module.factory('SignupModel', SignupModel);
	
	module.controller('PublicMainController', MainController);
	module.controller('LoginController', LoginController);
	module.controller('SignupController', SignupController);
	
	module.config(['$stateProvider', function($stateProvider) {
		$stateProvider
		.state('app', {
			abstract : true,
			templateUrl : 'client/src/app/public/app-public.tpl.html',
			controller : 'PublicMainController',
			controllerAs : 'ctrlr'
		})
		.state('app.login', {
			url : '/login?go',
			templateUrl : 'client/src/app/public/login/login.tpl.html',
			controller : 'LoginController',
			controllerAs : 'ctrlr'
		})
		.state('app.signup', {
			url : '/signup',
			templateUrl : 'client/src/app/public/qsignup/signup.tpl.html',
			controller : 'SignupController',
			controllerAs : 'ctrlr'
		});
	}]);
	
	return module;
});