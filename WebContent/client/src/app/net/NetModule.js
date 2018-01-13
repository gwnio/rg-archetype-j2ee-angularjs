define([
	'src/app/net/AuthHttpService'
], function(
	AuthHttpService) {
	var module = angular.module('app.net', []);
	
	module.factory('AuthHttpService', AuthHttpService);
	
	return module;
});