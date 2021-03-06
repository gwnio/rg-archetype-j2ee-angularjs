define([
	'src/app/public/AppPublicTemplates',
	'src/app/core/CoreModule',
	'src/app/public/MainModule'
], function(
	Templates,
	CoreModule,
	MainModule) {
	var moduleName = 'app';
	
	var module = angular.module(moduleName, ['app.public.templates', 'app.core', 'app.login']);
	
	module.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}]);
	
	module.factory('$exceptionHandler', ['$log', 'spinnerService', function($log, spinnerService) {
		return function(err, cause) {
			spinnerService.hideAll();
			$log.error.apply($log, arguments);
		};
	}]);
	
	module.run(['$templateCache', '$compile', '$rootScope', '$location', '$state', function($templateCache, $compile, $rootScope, $location, $state) {
		var templatesHTML = $templateCache.get('app.public.templates');
		$compile(templatesHTML)($rootScope);
	}])
	
	angular.bootstrap(document.getElementsByTagName("body")[0], [moduleName]);
	
	return module;
});