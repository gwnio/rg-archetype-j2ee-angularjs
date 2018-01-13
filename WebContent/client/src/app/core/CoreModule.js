define([
	'src/app/security/auth/AuthService',
	'src/app/security/auth/Principal',
	'src/app/net/NetModule',
	'src/app/core/LogoutService',
	'src/app/widget/modal/YesNoModalController',
	'src/app/res/AppUrisService'
], function(
	AuthService,
	Principal,
	NetModule,
	LogoutService,
	YesNoModalController,
	AppUrisService) {
	var module = angular.module('app.core', ['ui.router', 'angularSpinners', 'ngSanitize', 'app.net']);
	
	module.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);
	
	module.factory('principal', Principal);
	module.factory('AuthService', AuthService);
	
	module.service('logoutService', LogoutService);
	module.service('appUrisService', AppUrisService);
	
	module.controller('YesNoModalController', YesNoModalController);
	
	return module;
});