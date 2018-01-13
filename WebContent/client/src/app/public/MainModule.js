define([
	'src/common/ValuesEqualRequiredDirective',
	'src/app/widget/PasswordValidCheckDirective',
	'src/app/public/MainController',
	'src/app/public/login/LoginController',
	'src/app/public/qsignup/SignupModule'
], function(
	ValuesEqualRequiredDirective,
	PasswordValidCheckDirective,
	MainController,
	LoginController,
	SignupModule) {
	var module = angular.module('app.login', ['ngMessages', 'app.signup']);
	
	module.directive('valuesEqualRequired', ValuesEqualRequiredDirective);
	module.directive('passwordValidCheck', PasswordValidCheckDirective);
	
	module.controller('PublicMainController', MainController);
	module.controller('LoginController', LoginController);
	
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
		});
	}]);
	
	return module;
});